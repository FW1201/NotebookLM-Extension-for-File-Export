// Google Apps Script for NotebookLM Exporter (v7.0)
// 已移除 Sheets 功能，保留 Docs, Slides, Forms 匯出

function doPost(e) {
  try {
    // 輸入驗證
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ status: 'error', message: '無效的請求數據' });
    }
    
    let params;
    try {
      params = JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('JSON 解析錯誤:', parseError);
      return createJsonResponse({ status: 'error', message: 'JSON 解析失敗' });
    }
    
    const { title, content, exportTo, apiKey } = params;

    if (!title || !exportTo) {
      return createJsonResponse({ status: 'error', message: '缺少必要參數' });
    }

    let processedContent = content;
    
    // AI 內容優化
    if (apiKey && content) {
      try {
        processedContent = optimizeContentWithAI(content, exportTo, apiKey);
      } catch (error) {
        processedContent = content;
      }
    }

    let fileUrl;
    switch (exportTo) {
      case 'docs':
        if (!processedContent) return createJsonResponse({ status: 'error', message: '缺少文字內容' });
        fileUrl = createGoogleDoc(title, processedContent);
        break;
      case 'slides':
        if (!processedContent) return createJsonResponse({ status: 'error', message: '缺少文字內容' });
        fileUrl = createGoogleSlides(title, processedContent);
        break;
      case 'forms':
        if (!processedContent) return createJsonResponse({ status: 'error', message: '缺少文字內容' });
        fileUrl = createGoogleForm(title, processedContent);
        break;
      default:
        return createJsonResponse({ status: 'error', message: '無效的匯出類型' });
    }

    return createJsonResponse({ status: 'success', url: fileUrl });

  } catch (error) {
    console.error('處理錯誤:', error);
    return createJsonResponse({ status: 'error', message: '處理失敗: ' + error.message });
  }
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function optimizeContentWithAI(content, exportType, apiKey) {
  if (!apiKey || !content) {
    throw new Error('缺少 API Key 或內容');
  }
  
  const prompts = {
    docs: `請將以下內容整理為適合Google Docs的文件格式。如果是來源資料，請按照以下格式整理：\n[H1]主標題\n[H2]各來源標題\n然後是該來源的內容段落，保持清晰的階層結構。如果是對話內容，請移除對話標記，組織成清晰段落。請使用以下標記：\n[H1]主標題\n[H2]次標題\n[H3]小標題\n然後是正文段落。不要使用其他程式碼符號：\n\n`,
    slides: `請將以下內容整理為適合Google Slides的簡報格式，每頁5個要點內，用"--- 新投影片 ---"分隔，不使用程式碼符號：\n\n`,
    forms: `請根據以下內容生成適合Google Forms的選擇題問卷。每題格式如下：\n\n題目內容\nA) 選項1\nB) 選項2\nC) 選項3\nD) 選項4\n\n請生成5-10題選擇題，題目要基於內容的重要概念和知識點。每題提供4個選項，其中1個正確答案和3個合理的錯誤選項。不要使用程式碼符號或特殊格式：\n\n`
  };

  const prompt = prompts[exportType] + content;
  
  try {
    const response = UrlFetchApp.fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      payload: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    
    if (response.getResponseCode() !== 200) {
      throw new Error('API 請求失敗: ' + response.getResponseCode());
    }
  
    const result = JSON.parse(response.getContentText());
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    if (!result.candidates || result.candidates.length === 0) {
      throw new Error('無法獲取回應');
    }
    
    return result.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('AI 優化錯誤:', error);
    throw error;
  }
}

function createGoogleDoc(title, content) {
  const cleanTitle = sanitizeFileName(title);
  const doc = DocumentApp.create(cleanTitle);
  const body = doc.getBody();
  
  body.appendParagraph(title).setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph('');
  
  if (content) {
    const lines = content.split('\n');
    let currentParagraph = '';
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('[H1]')) {
        if (currentParagraph) {
          body.appendParagraph(currentParagraph.trim());
          currentParagraph = '';
        }
        const headingText = trimmedLine.replace('[H1]', '').trim();
        if (headingText) {
          body.appendParagraph(headingText).setHeading(DocumentApp.ParagraphHeading.HEADING1);
        }
      } else if (trimmedLine.startsWith('[H2]')) {
        if (currentParagraph) {
          body.appendParagraph(currentParagraph.trim());
          currentParagraph = '';
        }
        const headingText = trimmedLine.replace('[H2]', '').trim();
        if (headingText) {
          body.appendParagraph(headingText).setHeading(DocumentApp.ParagraphHeading.HEADING2);
        }
      } else if (trimmedLine.startsWith('[H3]')) {
        if (currentParagraph) {
          body.appendParagraph(currentParagraph.trim());
          currentParagraph = '';
        }
        const headingText = trimmedLine.replace('[H3]', '').trim();
        if (headingText) {
          body.appendParagraph(headingText).setHeading(DocumentApp.ParagraphHeading.HEADING3);
        }
      } else if (trimmedLine === '') {
        if (currentParagraph) {
          body.appendParagraph(currentParagraph.trim());
          currentParagraph = '';
        }
      } else {
        if (currentParagraph) {
          currentParagraph += ' ' + trimmedLine;
        } else {
          currentParagraph = trimmedLine;
        }
      }
    });
    
    if (currentParagraph) {
      body.appendParagraph(currentParagraph.trim());
    }
  }
  
  return doc.getUrl();
}

function createGoogleSlides(title, content) {
  const cleanTitle = sanitizeFileName(title);
  const presentation = SlidesApp.create(cleanTitle);
  const slides = presentation.getSlides();
  
  slides[0].getShapes().forEach(shape => {
    try { shape.remove(); } catch(e) {}
  });
  
  if (content && content.includes('--- 新投影片 ---')) {
    const slideContents = content.split('--- 新投影片 ---');
    
    slideContents.forEach((slideContent, index) => {
      const currentSlide = index === 0 ? slides[0] : presentation.appendSlide();
      const lines = slideContent.trim().split('\n').filter(line => line.trim());
      
      if (lines.length > 0) {
        const slideTitle = lines[0] || `${title} (${index + 1})`;
        const titleBox = currentSlide.insertTextBox(slideTitle, 50, 30, 600, 60);
        titleBox.getText().getTextStyle().setFontSize(20).setBold(true);
        
        if (lines.length > 1) {
          const contentText = lines.slice(1).join('\n');
          const contentBox = currentSlide.insertTextBox(contentText, 50, 100, 600, 350);
          contentBox.getText().getTextStyle().setFontSize(14);
        }
      }
    });
  } else {
    const titleBox = slides[0].insertTextBox(title, 50, 50, 600, 80);
    titleBox.getText().getTextStyle().setFontSize(24).setBold(true);
    
    if (content) {
      const contentBox = slides[0].insertTextBox(content, 50, 150, 600, 350);
      contentBox.getText().getTextStyle().setFontSize(14);
    }
  }
  
  return presentation.getUrl();
}

function createGoogleForm(title, content) {
  const cleanTitle = sanitizeFileName(title);
  const form = FormApp.create(cleanTitle).setDescription("從 NotebookLM 匯出的內容");
  
  if (content) {
    // 分割內容為個別題目
    const questions = content.split('\n\n').filter(q => q && q.trim());
    
    questions.forEach(questionBlock => {
      const lines = questionBlock.split('\n').filter(line => line && line.trim());
      
      if (lines.length >= 5) { // 題目 + 4個選項
        const questionTitle = lines[0].replace(/^\d+\.\s*/, ''); // 移除題號
        const options = [];
        
        // 提取選項（A) B) C) D) 格式）
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.match(/^[A-D]\)\s*/)) {
            options.push(line.replace(/^[A-D]\)\s*/, ''));
          }
        }
        
        if (options.length >= 2) {
          form.addMultipleChoiceItem()
            .setTitle(questionTitle)
            .setChoiceValues(options)
            .setRequired(false);
        }
      } else if (lines.length === 1) {
        // 單行內容作為簡答題
        form.addTextItem()
          .setTitle(lines[0])
          .setRequired(false);
      }
    });
  }
  
  if (form.getItems().length === 0) {
    form.addParagraphTextItem()
      .setTitle("NotebookLM 內容")
      .setHelpText(content || '無內容')
      .setRequired(false);
  }
  
  return form.getPublishedUrl();
}

function sanitizeFileName(fileName) {
  return fileName.replace(/[\\/:*?"<>|]/g, '_').substring(0, 100);
}