// NotebookLM Exporter v7.0

function getWebAppUrl() {
    return localStorage.getItem('nlm-exporter-web-app-url') || '';
}

const ICONS = {
    DOCS: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill="#1565C0" d="M42,37c0,2.762-2.238,5-5,5H11c-2.762,0-5-2.238-5-5V11c0-2.762,2.238-5,5-5h26c2.762,0,5,2.238,5,5V37z"/><path fill="#FFF" d="M34,24H14v-2h20V24z M34,20H14v-2h20V20z M34,28H14v-2h20V28z M34,32H14v-2h20V32z"/></svg>`,
    SLIDES: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill="#FF8A65" d="M41,10H7c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h34c2.2,0,4-1.8,4-4V14C45,11.8,43.2,10,41,10z"/><path fill="#FFCC02" d="M41,8H7c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h34c2.2,0,4-1.8,4-4V12C45,9.8,43.2,8,41,8z"/><path fill="#FFF" d="M38,31H10c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h28c1.1,0,2,0.9,2,2v16C40,30.1,39.1,31,38,31z"/><path fill="#90CAF9" d="M36,29H12c-1.1,0-2-0.9-2-2V15c0-1.1,0.9-2,2-2h24c1.1,0,2,0.9,2,2v12C38,28.1,37.1,29,36,29z"/></svg>`,
    FORMS: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill="#673AB7" d="M42,37c0,2.762-2.238,5-5,5H11c-2.762,0-5-2.238-5-5V11c0-2.762,2.238-5,5-5h26c2.762,0,5,2.238,5,5V37z"/><path fill="#FFF" d="M33,24H15v-2h18V24z M33,19H15v-2h18V19z M33,29H15v-2h18V29z M33,34H15v-2h18V34z"/><circle fill="#FFF" cx="12" cy="18" r="1"/><circle fill="#FFF" cx="12" cy="23" r="1"/><circle fill="#FFF" cx="12" cy="28" r="1"/><circle fill="#FFF" cx="12" cy="33" r="1"/></svg>`,
    LOADING: `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><style>.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}</style><g class="spinner_V8m1"><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"/></g></svg>`,
    PROMPT: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#34a853"><path d="M4,2A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H8V21A1,1 0 0,0 9,22A1,1 0 0,0 9.5,22L13.08,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2H4Z"/></svg>`,
    FILE: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#5f6368"><path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2H6M6,4H18V20H6V4M8,6V8H16V6H8M8,10V12H16V10H8M8,14V16H16V14H8Z"/></svg>`,
    REFERENCE: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#5f6368"><path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V9H7V7M7,11H17V13H7V11M7,15H17V17H7V15Z"/></svg>`,
    SETTINGS: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#5f6368"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/></svg>`
};

function showLoadingState(button) { 
    button.disabled = true; 
    button.dataset.originalHtml = button.innerHTML; 
    button.innerHTML = ICONS.LOADING; 
}

function showSuccessMessage(button, url) { 
    button.innerHTML = '✅'; 
    setTimeout(() => { 
        button.disabled = false; 
        button.innerHTML = button.dataset.originalHtml; 
        if (url) window.open(url, '_blank'); 
    }, url ? 2500 : 1000); 
}

function showErrorMessage(button, message) { 
    button.innerHTML = '❌'; 
    console.error("匯出錯誤:", message); 
    alert(`匯出失敗：${message}`); 
    setTimeout(() => { 
        button.disabled = false; 
        button.innerHTML = button.dataset.originalHtml; 
    }, 4000); 
}

function isMainPage() {
    return window === window.top;
}

function isNoteIframe() {
    return window !== window.top && (
        document.querySelector('textarea') || 
        document.querySelector('[contenteditable]') ||
        document.querySelector('.panel-content') ||
        document.body.innerText.length > 100
    );
}

function mainPageScript() {
    console.log('[NLM Exporter] 主頁面腳本啟動');
    let currentButton = null;
    let promptSidebarVisible = false;
    
    // 提示詞資料結構
    const promptCategories = {
        'teaching': { name: '教學 Teaching', prompts: getTeachingPrompts() },
        'homeroom': { name: '導師 Homeroom', prompts: getHomeroomPrompts() },
        'administration': { name: '行政 Administration', prompts: getAdministrationPrompts() },
        'library': { name: '自定義 Library', prompts: getCustomPrompts() }
    };
    
    function getTeachingPrompts() {
        return [
            { id: 1, text: '請整合所有來源的資料，生成一份關於『麥地奇家族的政治影響力如何體現在當時的藝術贊助與作品主題上』的課程大綱。接著，創建一個心智圖，視覺化呈現當時主要的政治人物、藝術家、代表作品以及它們之間的關聯性。', notebook: '跨學科課程單元開發' },
            { id: 2, text: '請根據上傳的『細胞呼吸』章節，執行以下三項任務：1. 為學習困難的學生生成一份800字以內的簡易摘要，並使用國中生能理解的比喻來解釋關鍵概念（如ATP與能量貨幣）。2. 為中等程度學生創建一份標準學習指南，包含關鍵詞彙定義與三個申論題。3. 為程度較佳的學生設計五個開放式的進階探究問題，引導他們思考細胞呼吸與新陳代謝、生態系統能量流動的關聯。', notebook: '差異化學習材料生成' },
            { id: 3, text: '請根據所有上傳的來源，自動生成一份『近代台灣史』期末考學習指南。指南應包含：一份按時間排序的關鍵事件列表、一份重要人物及其貢獻的詞彙表、以及一份包含10個常見問題與其答案的FAQ清單。', notebook: '互動式學習指南與FAQ創建' },
            { id: 4, text: '請分析這部YouTube影片。首先，提供一份500字的內容摘要。接著，列出影片中提到的五個核心概念。最後，設計三個課堂討論題綱，引導學生反思審議式民主在台灣校園實踐的可能性與挑戰。', notebook: '翻轉課堂的多媒體內容分析' },
            { id: 5, text: '請根據所有來源，自動生成一份從1919年到1939年的詳細事件時間軸。同時，創建一個心智圖，以『二戰爆發』為中心節點，分析並連結其背後的政治（如：法西斯主義崛起）、經濟（如：經濟大蕭條）、社會（如：民族主義）與外交（如：綏靖政策）因素。', notebook: '歷史事件時間軸與心智圖視覺化' },
            { id: 6, text: '請分析〈一桿稱仔〉這篇小說。1. 辨識並總結小說中關於『殖民統治下的壓迫』與『庶民的無奈反抗』兩大主題，並從文本中引用段落作為佐證。2. 追蹤主角秦得參的情緒轉變歷程，並整理成一個簡要的時間線。3. 創建一份小說中較難理解的台語詞彙或時代用語的註解表。', notebook: '文學作品分析與主題探討' },
            { id: 7, text: '請將這篇學術論文轉化為一份適合高中資優班學生的教學材料。內容需包含：1. 一段摘要的白話文解釋。2. 以條列式步驟簡化說明其研究方法。3. 一份關鍵專業術語（如Cas9、gRNA）的定義詞彙表。4. 清楚闡述該研究的主要發現與結論。', notebook: '科學研究論文的拆解與教學轉化' },
            { id: 8, text: '請根據上傳的物理課本章節，生成一份包含20題選擇題的隨堂測驗，並附上正確答案。', notebook: '形成性評量工具的快速生成' },
            { id: 9, text: '請以上傳的中文地理課文為基礎，執行以下任務：1. 創建一份中英對照的關鍵地理名詞詞彙表（例如：中央山脈 - Central Mountain Range）。2. 將課文的每一段落生成一段簡潔的英文摘要。3. 設計三題能以簡單英文回答的地理概念問答題。', notebook: '教學資源的編譯與整合' },
            { id: 10, text: '請整合所有來源，生成一份『台灣再生能源專題研究簡報文件』。此文件應概述當前台灣能源問題的核心挑戰，列出主要的利害關係人（如：政府、台電、環保團體、居民），並提出五個可供學生深入探究的子議題方向。', notebook: '專題式學習（PBL）的鷹架搭建' }
        ];
    }
    
    function getHomeroomPrompts() {
        return [
            { id: 11, text: '根據目前所有來源，請總結這位學生在學業上的主要優勢、待加強的科目，以及他在課外活動中展現出的興趣與特質。', notebook: '建立個人化學生學習檔案' },
            { id: 12, text: '請將本次期中考的表現與筆記本中過往的成績來源進行比較。識別出哪些科目的成績出現了顯著下滑的趨勢，並從所有來源中提取與『學習態度』或『課堂參與度』相關的教師評語。', notebook: '追蹤學生進展與識別預警模式' },
            { id: 13, text: '請創建一份學習指南，將所有試題按照『數論』、『幾何』、『代數』和『組合』進行分類。針對『數論』這個主題，請解釋其核心概念，並提供第五號試題的逐步解題思路。利用『學習指南』功能，引導我一步步解決這個問題。', notebook: '輔導學科競賽與奧林匹亞培訓' },
            { id: 14, text: '請分析學生的所有作品與經歷，辨識出其中展現的關鍵能力與特質（例如：解決問題能力、團隊合作、領導力）。接著，草擬一份個人陳述的大綱，將這些能力與目標科系所強調的『邏輯思維』與『創新精神』進行連結。', notebook: '支援大學申請與「學習歷程檔案」' },
            { id: 15, text: '基於這篇關於羅馬建築的報告中所展現的興趣，請從提供的圖書館清單中推薦三本書，並從博物館活動列表中推薦兩項活動。為每一項推薦附上一句說明，解釋為何這可能吸引該學生。', notebook: '開發個人化閱讀清單與增能活動' },
            { id: 16, text: '請分析這系列小說作品。作品中反覆出現的主題是什麼？寫作風格（例如：對話、場景描寫）有何演變？請指出一個顯著的優點和一個可持續改進的方面，並從文本中引用具體例子來支持你的觀點。', notebook: '分析學生作品集以評估優劣勢' },
            { id: 17, text: '請將這份雜亂的腦力激盪會議紀錄，整理成一份提交給學務處的正式活動企劃書。企劃書應包含活動主題、預計時間表、所需資源清單，以及一份草擬的活動宣傳文案。', notebook: '協助學生社團與活動規劃' },
            { id: 18, text: '請根據這些文章，為學生創建一份關於『如何應對考試壓力』的FAQ常見問題集，語氣應具支持性與實用性。另外，生成一段『辯論』模式的音訊摘要，探討社群媒體對青少年心理健康的正面與負面影響。', notebook: '創建社會情緒學習（SEL）資源' },
            { id: 19, text: '請根據IEP文件中列出的學習輔助策略（例如：『將指令條列化』、『提供詞彙表』），改寫這份作業的說明文字，使其符合IEP的要求。同時，請總結IEP中最重要的三項教學策略，以便我能轉達給該生的其他科任老師。', notebook: '支援特殊教育需求（SEN）學生' },
            { id: 20, text: '請回顧這份過去一學年的親師溝通日誌。創建一個主要溝通議題的時間軸，並總結家長最關切的核心問題，以及歷次溝通中達成的行動共識。', notebook: '整合親師溝通紀錄以進行全面評估' }
        ];
    }
    
    function getAdministrationPrompts() {
        return [
            { id: 21, text: '請先總結教育部新版規範中的主要變更點。接著，請審閱我們學校的現行規定，標示出所有與新規範不符或需要更新的條文。最後，請草擬一份符合新規範的修訂版校規草案。', notebook: '學校規章制度的草擬與審核' },
            { id: 22, text: '請使用這些活動要點，草擬一封給家長的月度校訊，語氣應親切溫暖。另外，再根據相同的要點，撰寫一則發布在學校官網上的正式公告，語氣應較為官方。兩份文稿都需包含所有重要的日期與時間。', notebook: '內外部溝通文稿（校訊、公告）撰寫' },
            { id: 23, text: '請提供這場會議的精簡摘要。接著，以條列式清單列出會議中做出的所有決議。最後，提取所有被指派的行動項目，並標明負責人與預計完成日期。', notebook: '會議紀錄摘要與行動項目提取' },
            { id: 24, text: '請整合這些關於PBL的學術文章與書籍章節，為一場三小時的教師專業發展工作坊設計一份詳細大綱。大綱應包含核心概念介紹、建議的實作活動、以及可供分組討論的引導問題。', notebook: '教師專業發展（PD）工作坊材料整合' },
            { id: 25, text: '請問自然科的科主席是誰？申請代課老師的標準流程是什麼？學校對於學生作業遲交的統一政策為何？', notebook: '新進教師入職培訓資源中心' },
            { id: 26, text: '請將本校的『高一歷史課程計畫』與『108課綱歷史科學習表現與內容』進行比對。識別出課綱中要求，但在本校課程計畫中未被明確提及的學習表現或內容要點。並建議可以將這些遺漏的元素整合到哪些現有單元中。', notebook: '課程審查與課綱標準對齊分析' },
            { id: 27, text: '請利用上傳的本校學生學習表現數據與問卷調查結果，撰寫此項補助款計畫書中的『需求評估』章節。接著，根據專案構想文件，創建一份詳細的專案執行時間表，並確保所有里程碑都符合補助款申請指南中的報告繳交期限。', notebook: '補助款計畫書與校務專案規劃' },
            { id: 28, text: '請綜合分析這幾份教育趨勢報告，識別出與台灣中等教育最相關的五大新興趨勢。針對每一個趨勢，提供簡要的摘要，並列出其對本校可能產生的策略性影響。', notebook: '教育研究趨勢分析以支持策略規劃' },
            { id: 29, text: '請為這三家供應商的互動式電子白板創建一份功能與價格的比較表。另外，請總結各家廠商提供的保固期限與售後服務條款。', notebook: '供應商與採購資訊的整合管理' },
            { id: 30, text: '請在所有可用來源中，尋找能夠證明本校符合評鑑指標4.2：『學校提供完善的學生支持系統』的證據。將所有相關證據以條列式清單彙整，並為每一項證據附上其原始文件的引用來源。', notebook: '學校評鑑報告的資料彙編' }
        ];
    }
    
    function getCustomPrompts() {
        const saved = localStorage.getItem('nlm-custom-prompts');
        return saved ? JSON.parse(saved) : [];
    }
    
    function saveCustomPrompts(prompts) {
        localStorage.setItem('nlm-custom-prompts', JSON.stringify(prompts));
        promptCategories.library.prompts = prompts;
    }
    
    function addCustomPrompt(promptText, notebookName) {
        const customPrompts = getCustomPrompts();
        const newPrompt = {
            id: Date.now(),
            text: promptText,
            notebook: notebookName || '未分類',
            createdAt: new Date().toISOString()
        };
        customPrompts.push(newPrompt);
        saveCustomPrompts(customPrompts);
        updatePromptSidebar();
    }
    
    function deleteCustomPrompt(index) {
        const customPrompts = getCustomPrompts();
        customPrompts.splice(index, 1);
        saveCustomPrompts(customPrompts);
        updatePromptSidebar();
    }
    
    function insertPromptToInput(promptText) {
        const queryBox = document.querySelector('div.query-box');
        
        if (queryBox) {
            // 尋找 query-box 內的文字輸入區域
            const textInput = queryBox.querySelector('div[contenteditable="true"]') ||
                            queryBox.querySelector('textarea') ||
                            queryBox.querySelector('input[type="text"]') ||
                            queryBox;
            
            if (textInput) {
                // 清除原有內容
                if (textInput.tagName === 'TEXTAREA' || textInput.tagName === 'INPUT') {
                    textInput.value = promptText;
                } else {
                    textInput.textContent = promptText;
                    textInput.innerText = promptText;
                }
                
                // 觸發事件以確保 NotebookLM 識別內容變更
                const events = ['input', 'change', 'keyup', 'paste'];
                events.forEach(eventType => {
                    textInput.dispatchEvent(new Event(eventType, { bubbles: true, cancelable: true }));
                });
                
                // 設定焦點並確保可編輯
                textInput.focus();
                
                // 將游標移到文字末尾
                if (textInput.setSelectionRange && textInput.tagName !== 'DIV') {
                    textInput.setSelectionRange(promptText.length, promptText.length);
                } else if (window.getSelection && textInput.tagName === 'DIV') {
                    const range = document.createRange();
                    const sel = window.getSelection();
                    if (textInput.childNodes.length > 0) {
                        range.setStart(textInput.childNodes[textInput.childNodes.length - 1], textInput.textContent.length);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
                
                console.log('提示詞已成功注入到 query-box');
            }
            
            if (promptSidebarVisible) {
                togglePromptSidebar();
            }
        } else {
            console.warn('找不到 div.query-box 元素');
        }
    }
    
    function getCurrentNotebookName() {
        const titleElement = document.querySelector('div.title-container') ||
                           document.querySelector('h1') ||
                           document.querySelector('[class*="title"]');
        return titleElement ? titleElement.textContent?.trim() || '未命名筆記本' : '未命名筆記本';
    }
    
    function createPromptSidebar() {
        const sidebar = document.createElement('div');
        sidebar.id = 'prompt-sidebar';
        sidebar.className = 'prompt-sidebar';
        
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <h3>Prompt Library of NBLM</h3>
                <div class="header-controls">
                    <button class="theme-toggle-btn" title="切換主題">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"/></svg>
                    </button>
                    <button class="close-btn" title="關閉">&times;</button>
                </div>
            </div>
            <div class="sidebar-content">
                <div class="category-tabs">
                    <button class="tab-btn active" data-category="teaching">教學</button>
                    <button class="tab-btn" data-category="homeroom">導師</button>
                    <button class="tab-btn" data-category="administration">行政</button>
                    <button class="tab-btn" data-category="library">自定義</button>
                </div>
                <div class="prompts-container" id="prompts-container">
                    <!-- 提示詞將在這裡動態生成 -->
                </div>
            </div>
            <div class="sidebar-footer">
                <div class="credit">數位敘事力期刊 by 吳奇</div>
            </div>
        `;
        
        document.body.appendChild(sidebar);
        
        sidebar.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                sidebar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                updatePromptContainer(e.target.dataset.category);
            });
        });
        
        // 添加主題切換事件
        const themeToggle = sidebar.querySelector('.theme-toggle-btn');
        themeToggle.addEventListener('click', () => {
            sidebar.classList.toggle('dark-theme');
            localStorage.setItem('nlm-sidebar-theme', sidebar.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // 恢復主題設定
        const savedTheme = localStorage.getItem('nlm-sidebar-theme');
        if (savedTheme === 'dark') {
            sidebar.classList.add('dark-theme');
        }
        
        // 修復關閉按鈕
        const closeBtn = sidebar.querySelector('.close-btn');
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            togglePromptSidebar();
        });
        
        updatePromptContainer('teaching');
        return sidebar;
    }
    
    function updatePromptContainer(category) {
        const container = document.getElementById('prompts-container');
        const prompts = promptCategories[category].prompts;
        
        if (prompts.length === 0) {
            container.innerHTML = '<div class="empty-state">暫無提示詞</div>';
            return;
        }
        
        if (category === 'library') {
            container.innerHTML = prompts.map((prompt, index) => `
                <div class="prompt-card custom-card" data-prompt-index="${index}" data-category="${category}">
                    <div class="prompt-text">${prompt.text}</div>
                    ${prompt.notebook ? `<div class="prompt-notebook">${prompt.notebook}</div>` : ''}
                    <button class="delete-prompt-btn" data-index="${index}" title="刪除提示詞">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#dc3545"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>
                    </button>
                </div>
            `).join('');
            
            container.querySelectorAll('.delete-prompt-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const index = parseInt(btn.dataset.index);
                    deleteCustomPrompt(index);
                });
            });
        } else {
            container.innerHTML = prompts.map((prompt, index) => `
                <button class="prompt-button" data-prompt-index="${index}" data-category="${category}">
                    ${prompt.notebook}
                </button>
            `).join('');
        }
        
        container.querySelectorAll('.prompt-card, .prompt-button').forEach(element => {
            element.addEventListener('click', () => {
                const category = element.dataset.category;
                const index = parseInt(element.dataset.promptIndex);
                const prompt = promptCategories[category].prompts[index];
                if (prompt) {
                    insertPromptToInput(prompt.text);
                }
            });
        });
    }
    
    function updatePromptSidebar() {
        const sidebar = document.getElementById('prompt-sidebar');
        if (sidebar) {
            const activeTab = sidebar.querySelector('.tab-btn.active');
            if (activeTab) {
                updatePromptContainer(activeTab.dataset.category);
            }
        }
    }
    
    function togglePromptSidebar() {
        let sidebar = document.getElementById('prompt-sidebar');
        
        if (!sidebar) {
            sidebar = createPromptSidebar();
        }
        
        promptSidebarVisible = !promptSidebarVisible;
        if (promptSidebarVisible) {
            sidebar.style.display = 'flex';
            sidebar.style.flexDirection = 'column';
        } else {
            sidebar.style.display = 'none';
        }
    }
    
    function addSaveButtonToUserMessages() {
        const userContainers = document.querySelectorAll('div.from-user-container:not([data-save-btn-added])');
        
        userContainers.forEach(container => {
            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-prompt-btn';
            saveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#5f6368"><path d="M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12Z"/></svg>`;
            saveBtn.title = '儲存提示詞到自定義庫';
            
            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                
                const matCardContent = container.querySelector('mat-card-content');
                if (matCardContent) {
                    const promptText = matCardContent.textContent?.trim() || matCardContent.innerText?.trim();
                    if (promptText) {
                        const notebookName = getCurrentNotebookName();
                        addCustomPrompt(promptText, notebookName);
                        
                        saveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#34a853"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/></svg>`;
                        setTimeout(() => {
                            saveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#5f6368"><path d="M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3M19,19H5V5H16.17L19,7.83V19M12,12C10.34,12 9,13.34 9,15C9,16.66 10.34,18 12,18C13.66,18 15,16.66 15,15C15,13.34 13.66,12 12,12Z"/></svg>`;
                        }, 1500);
                    }
                }
            });
            
            container.style.position = 'relative';
            container.appendChild(saveBtn);
            container.setAttribute('data-save-btn-added', 'true');
        });
    }

    function copyAppsScriptToClipboard() {
        const scriptContent = `// Google Apps Script for NotebookLM Exporter (v7.0)
// 產生於 NotebookLM 匯出工具 Chrome 擴充功能
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
    docs: \`請將以下內容整理為適合Google Docs的文件格式。如果是來源資料，請按照以下格式整理：\\n[H1]主標題\\n[H2]各來源標題\\n然後是該來源的內容段落，保持清晰的階層結構。如果是對話內容，請移除對話標記，組織成清晰段落。請使用以下標記：\\n[H1]主標題\\n[H2]次標題\\n[H3]小標題\\n然後是正文段落。不要使用其他程式碼符號：\\n\\n\`,
    slides: \`請將以下內容整理為適合Google Slides的簡報格式，每頁5個要點內，用"--- 新投影片 ---"分隔，不使用程式碼符號：\\n\\n\`,
    forms: \`請根據以下內容生成適合Google Forms的選擇題問卷。每題格式如下：\\n\\n題目內容\\nA) 選項1\\nB) 選項2\\nC) 選項3\\nD) 選項4\\n\\n請生成5-10題選擇題，題目要基於內容的重要概念和知識點。每題提供4個選項，其中1個正確答案和3個合理的錯誤選項。不要使用程式碼符號或特殊格式：\\n\\n\`
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
    const lines = content.split('\\n');
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
      const lines = slideContent.trim().split('\\n').filter(line => line.trim());
      
      if (lines.length > 0) {
        const slideTitle = lines[0] || \`\${title} (\${index + 1})\`;
        const titleBox = currentSlide.insertTextBox(slideTitle, 50, 30, 600, 60);
        titleBox.getText().getTextStyle().setFontSize(20).setBold(true);
        
        if (lines.length > 1) {
          const contentText = lines.slice(1).join('\\n');
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
    const questions = content.split('\\n\\n').filter(q => q && q.trim());
    
    questions.forEach(questionBlock => {
      const lines = questionBlock.split('\\n').filter(line => line && line.trim());
      
      if (lines.length >= 5) { // 題目 + 4個選項
        const questionTitle = lines[0].replace(/^\\d+\\.\\s*/, ''); // 移除題號
        const options = [];
        
        // 提取選項（A) B) C) D) 格式）
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.match(/^[A-D]\\)\\s*/)) {
            options.push(line.replace(/^[A-D]\\)\\s*/, ''));
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
  return fileName.replace(/[\\\\/:*?"<>|]/g, '_').substring(0, 100);
}`;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(scriptContent).then(() => {
                console.log('Apps Script 已複製到剪貼簿');
            }).catch(err => {
                console.error('複製失敗:', err);
                fallbackCopy(scriptContent);
            });
        } else {
            fallbackCopy(scriptContent);
        }
        
        function fallbackCopy(text) {
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            } catch (error) {
                console.error('備用複製方案也失敗:', error);
            }
        }
    }

    async function sendToAppsScript(payload) {
        const webAppUrl = getWebAppUrl();
        if (!webAppUrl) {
            showErrorMessage(currentButton, '請先設定 Web App URL');
            return;
        }
        
        try {
            const response = await fetch(webAppUrl, {
                method: 'POST',
                redirect: 'follow',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(payload)
            });
            
            const responseText = await response.text();
            const result = JSON.parse(responseText);
            
            if (result.status === 'success') {
                showSuccessMessage(currentButton, result.url);
            } else {
                throw new Error(result.message || '未知錯誤');
            }
        } catch (error) {
            showErrorMessage(currentButton, `匯出失敗: ${error.message}`);
        }
    }

    function extractMainPageChatContent() {
        const chatContent = document.querySelector('div.chat-panel-content') ||
                           document.querySelector('div[class*="chat-panel-content"]');
        
        if (chatContent) {
            const content = chatContent.innerText?.trim();
            if (content && content.length > 10) {
                return content;
            }
        }
        return null;
    }
    
    function extractSourcesForAPA() {
        const sources = [];
        
        // 查找來源列表中的標題
        const sourceItems = document.querySelectorAll('div[class*="source"], li[class*="source"], [class*="source-item"]');
        
        sourceItems.forEach(item => {
            const titleElement = item.querySelector('[class*="title"], h3, h4, strong');
            if (titleElement) {
                const title = titleElement.textContent?.trim();
                if (title && title.length > 3) {
                    sources.push(title);
                }
            }
        });
        
        // 如果沒找到，嘗試從左側來源面板提取
        if (sources.length === 0) {
            const sourcePanel = document.querySelector('div[class*="source-panel"], div[class*="sources"]');
            if (sourcePanel) {
                const items = sourcePanel.querySelectorAll('div[class*="item"], li, [role="listitem"]');
                items.forEach(item => {
                    const text = item.textContent?.trim();
                    if (text && text.length > 3 && text.length < 200) {
                        sources.push(text);
                    }
                });
            }
        }
        
        return sources;
    }
    
    function generateAPAReferences(sources) {
        if (sources.length === 0) {
            return 'APA 7 參考文獻格式\n\n未找到來源資料。請確認已上傳文件到 NotebookLM。';
        }
        
        let apaText = 'APA 7 參考文獻格式\n\n';
        apaText += '以下是根據來源標題生成的 APA 格式參考文獻，請補充缺漏資訊：\n\n';
        
        sources.forEach((source, index) => {
            const number = index + 1;
            // 基本 APA 格式模板，用戶需要填入詳細資訊
            apaText += `${number}. (作者姓名). (出版年份). ${source}. (出版社或期刊名稱).\n\n`;
            apaText += `   → 請補充：作者姓名、出版年份、出版社/期刊資訊\n\n`;
        });
        
        apaText += '\n注意事項：\n';
        apaText += '• 作者姓名格式：姓, 名字縮寫.\n';
        apaText += '• 書籍：作者. (年份). 書名 (版本). 出版社.\n';
        apaText += '• 期刊：作者. (年份). 文章標題. 期刊名稱, 卷(期), 頁碼.\n';
        apaText += '• 網頁：作者. (年份). 標題. 網站名稱. URL\n';
        
        return apaText;
    }

    window.addEventListener('message', (event) => {
        const { type, status, payload, title, message } = event.data;
        
        if (type === 'NLM_EXPORT_CONTENT_RESPONSE') {
            if (status === 'success') {
                showApiDialog(payload.exportTo, payload.content, payload.title);
            } else {
                showErrorMessage(currentButton, message || '無法獲取對話內容');
            }
        }
    });
    
    function showApiDialog(exportType, content, title) {
        const cachedApiKey = localStorage.getItem('nlm-exporter-api-key');
        const cachedWebAppUrl = getWebAppUrl();
        
        if (cachedApiKey && cachedWebAppUrl) {
            proceedWithExport(exportType, content, title, cachedApiKey);
            return;
        }
        
        const dialog = document.createElement('div');
        dialog.className = 'api-dialog-overlay';
        dialog.innerHTML = `
            <div class="api-dialog">
                <h3>設定 API 與 Web App</h3>
                ${!cachedWebAppUrl ? `
                <div class="setup-section">
                    <h4>1. 部署 Google Apps Script</h4>
                    <p>請先複製以下腳本並部署為 Web App：</p>
                    <div class="script-container">
                        <button id="copy-script" class="copy-btn">📋 複製腳本</button>
                    </div>
                    <p class="setup-instruction">部署完成後，請將 Web App URL 貼到下方：</p>
                    <input type="url" id="web-app-url" placeholder="請輸入 Google Apps Script Web App URL" class="api-input">
                </div>
                ` : ''}
                <div class="setup-section">
                    <h4>${cachedWebAppUrl ? '' : '2. '}設定 AI API Key（可選）</h4>
                    <p>輸入 Google AI Studio API Key 以啟用 AI 內容優化：</p>
                    <input type="password" id="api-key" placeholder="請輸入 Google AI Studio API Key（可選）" class="api-input" value="${cachedApiKey || ''}">
                    <label class="checkbox-label">
                        <input type="checkbox" id="save-settings" checked> 記住設定（儲存在本機）
                    </label>
                </div>
                <div class="dialog-buttons">
                    <button id="skip-ai" class="dialog-btn secondary">跳過 AI 處理</button>
                    <button id="use-ai" class="dialog-btn primary">確認設定</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // 複製腳本按鈕
        const copyScriptBtn = document.getElementById('copy-script');
        if (copyScriptBtn) {
            copyScriptBtn.onclick = () => {
                copyAppsScriptToClipboard();
                copyScriptBtn.innerHTML = '✅ 已複製';
                setTimeout(() => {
                    copyScriptBtn.innerHTML = '📋 複製腳本';
                }, 2000);
            };
        }
        
        document.getElementById('skip-ai').onclick = () => {
            const webAppUrl = document.getElementById('web-app-url')?.value.trim();
            if (!cachedWebAppUrl && !webAppUrl) {
                alert('請先設定 Web App URL');
                return;
            }
            if (webAppUrl) {
                localStorage.setItem('nlm-exporter-web-app-url', webAppUrl);
            }
            document.body.removeChild(dialog);
            proceedWithExport(exportType, content, title, null);
        };
        
        document.getElementById('use-ai').onclick = () => {
            const apiKey = document.getElementById('api-key').value.trim();
            const webAppUrl = document.getElementById('web-app-url')?.value.trim();
            const saveSettings = document.getElementById('save-settings').checked;
            
            if (!cachedWebAppUrl && !webAppUrl) {
                alert('請先設定 Web App URL');
                return;
            }
            
            if (saveSettings) {
                if (apiKey) localStorage.setItem('nlm-exporter-api-key', apiKey);
                if (webAppUrl) localStorage.setItem('nlm-exporter-web-app-url', webAppUrl);
            }
            
            document.body.removeChild(dialog);
            proceedWithExport(exportType, content, title, apiKey);
        };
    }
    
    function proceedWithExport(exportType, content, title, apiKey) {
        const payload = {
            title: title,
            content: content,
            exportTo: exportType,
            apiKey: apiKey
        };
        sendToAppsScript(payload);
    }

    function showFileMenu(button) {
        const existingMenu = document.getElementById('file-export-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.id = 'file-export-menu';
        menu.className = 'file-export-menu';
        menu.innerHTML = `
            <div class="menu-item" data-export="docs">
                ${ICONS.DOCS}
                <span>Google Docs</span>
            </div>
            <div class="menu-item" data-export="slides">
                ${ICONS.SLIDES}
                <span>Google Slides</span>
            </div>
            <div class="menu-item" data-export="forms">
                ${ICONS.FORMS}
                <span>Google Forms</span>
            </div>
        `;
        
        const rect = button.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = (rect.bottom + 5) + 'px';
        menu.style.left = rect.left + 'px';
        
        document.body.appendChild(menu);
        
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const exportType = item.dataset.export;
                menu.remove();
                handleExport(button, exportType);
            });
        });
        
        // 點擊外部關閉選單
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            });
        }, 100);
    }

    function handleExport(button, exportType) {
        showLoadingState(button);
        currentButton = button;

        if (exportType === 'prompt-sidebar') {
            togglePromptSidebar();
            showSuccessMessage(button);
            return;
        }
        
        if (exportType === 'settings') {
            showSettingsDialog();
            showSuccessMessage(button);
            return;
        }
        
        if (exportType === 'references') {
            const sources = extractSourcesForAPA();
            const apaText = generateAPAReferences(sources);
            showApiDialog('docs', apaText, 'APA 參考文獻');
            return;
        }

        const iframes = document.querySelectorAll('iframe');
        
        if (iframes.length === 0) {
            const chatContent = extractMainPageChatContent();
            if (chatContent && chatContent.length > 10) {
                showApiDialog(exportType, chatContent, '對話記錄匯出');
                return;
            }
            return showErrorMessage(button, '找不到對話內容');
        }
        
        iframes.forEach((iframe, index) => {
            try {
                iframe.contentWindow.postMessage({ type: 'NLM_GET_FULL_NOTE', exportType }, '*');
            } catch (e) {
                console.warn(`iframe ${index} 通信失敗:`, e);
            }
        });
        
        setTimeout(() => {
            if (currentButton && currentButton.disabled) {
                const fallbackContent = extractMainPageChatContent();
                if (fallbackContent && fallbackContent.length > 10) {
                    showApiDialog(exportType, fallbackContent, '對話記錄匯出');
                } else {
                    showErrorMessage(currentButton, 'iframe 超時且無法獲取對話內容');
                }
            }
        }, 5000);
    }
    
    function showSettingsDialog() {
        const cachedApiKey = localStorage.getItem('nlm-exporter-api-key');
        const cachedWebAppUrl = getWebAppUrl();
        
        const dialog = document.createElement('div');
        dialog.className = 'api-dialog-overlay';
        dialog.innerHTML = `
            <div class="api-dialog">
                <h3>設定 API 與 Web App</h3>
                ${!cachedWebAppUrl ? `
                <div class="setup-section">
                    <h4>1. 部署 Google Apps Script</h4>
                    <p>請先複製以下腳本並部署為 Web App：</p>
                    <div class="script-container">
                        <button id="copy-script" class="copy-btn">📋 複製腳本</button>
                    </div>
                    <p class="setup-instruction">部署完成後，請將 Web App URL 貼到下方：</p>
                    <input type="url" id="web-app-url" placeholder="請輸入 Google Apps Script Web App URL" class="api-input">
                </div>
                ` : ''}
                <div class="setup-section">
                    <h4>${cachedWebAppUrl ? '' : '2. '}設定 AI API Key（可選）</h4>
                    <p>輸入 Google AI Studio API Key 以啟用 AI 內容優化：</p>
                    <input type="password" id="api-key" placeholder="請輸入 Google AI Studio API Key（可選）" class="api-input" value="${cachedApiKey || ''}">
                    <label class="checkbox-label">
                        <input type="checkbox" id="save-settings" checked> 記住設定（儲存在本機）
                    </label>
                </div>
                <div class="dialog-buttons">
                    <button id="clear-settings" class="dialog-btn secondary">清除所有設定</button>
                    <button id="save-settings-btn" class="dialog-btn primary">儲存設定</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // 複製腳本按鈕
        const copyScriptBtn = document.getElementById('copy-script');
        if (copyScriptBtn) {
            copyScriptBtn.onclick = () => {
                copyAppsScriptToClipboard();
                copyScriptBtn.innerHTML = '✅ 已複製';
                setTimeout(() => {
                    copyScriptBtn.innerHTML = '📋 複製腳本';
                }, 2000);
            };
        }
        
        document.getElementById('clear-settings').onclick = () => {
            localStorage.removeItem('nlm-exporter-api-key');
            localStorage.removeItem('nlm-exporter-web-app-url');
            alert('所有設定已清除');
            document.body.removeChild(dialog);
            location.reload();
        };
        
        document.getElementById('save-settings-btn').onclick = () => {
            const apiKey = document.getElementById('api-key').value.trim();
            const webAppUrl = document.getElementById('web-app-url')?.value.trim();
            const saveSettings = document.getElementById('save-settings').checked;
            
            if (!cachedWebAppUrl && !webAppUrl) {
                alert('請先設定 Web App URL');
                return;
            }
            
            if (saveSettings) {
                if (apiKey) localStorage.setItem('nlm-exporter-api-key', apiKey);
                if (webAppUrl) localStorage.setItem('nlm-exporter-web-app-url', webAppUrl);
            }
            
            alert('設定已儲存');
            document.body.removeChild(dialog);
        };
    }

    function createExportButton(id, title, icon, exportType) {
        const button = document.createElement('button');
        button.id = id; 
        button.className = 'export-button'; 
        button.title = title; 
        
        const labels = {
            'file': 'File',
            'prompt-sidebar': 'Prompt',
            'settings': 'Settings'
        };
        
        const label = labels[exportType] || title;
        button.innerHTML = `${icon}<span>${label}</span>`;
        
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (exportType === 'file') {
                showFileMenu(button);
            } else {
                handleExport(button, exportType);
            }
        });
        return button;
    }

    function addButtonsToActionbar(toolbar) {
        if (document.querySelector('.export-button-container')) return;
        
        const container = document.createElement('div');
        container.className = 'export-button-container';
        
        const buttons = [
            ['file-btn', '匯出檔案', ICONS.FILE, 'file'],
            ['prompt-sidebar-btn', '提示詞', ICONS.PROMPT, 'prompt-sidebar'],
            ['settings-btn', '設定', ICONS.SETTINGS, 'settings']
        ];
        
        buttons.forEach(([id, title, icon, type]) => {
            container.appendChild(createExportButton(id, title, icon, type));
        });
        
        toolbar.appendChild(container);
    }

    function addSourceExportButton() {
        // 查找來源面板的標題區域
        const sourcePanelHeader = document.querySelector('div[class*="panel-header"]') ||
                                 document.querySelector('h2') ||
                                 document.querySelector('[class*="source"][class*="header"]');
        
        if (sourcePanelHeader && !sourcePanelHeader.querySelector('.source-export-btn')) {
            const exportBtn = document.createElement('button');
            exportBtn.className = 'source-export-btn export-button';
            exportBtn.title = '生成 APA 參考文獻';
            exportBtn.innerHTML = `${ICONS.REFERENCE}<span>APA</span>`;
            exportBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                handleExport(exportBtn, 'references');
            });
            
            sourcePanelHeader.style.display = 'flex';
            sourcePanelHeader.style.justifyContent = 'space-between';
            sourcePanelHeader.style.alignItems = 'center';
            sourcePanelHeader.appendChild(exportBtn);
        }
    }
    
    function findAndInject() {
        const chatHeaderButtons = document.querySelector('span[class*="chat-header-buttons"]') ||
                                 document.querySelector('div[class*="panel-header"] span') ||
                                 document.querySelector('div[class*="chat-panel"] span[class*="buttons"]');
        
        if (chatHeaderButtons && !chatHeaderButtons.querySelector('.export-button-container')) {
            addButtonsToActionbar(chatHeaderButtons);
        }
        
        const copyButton = Array.from(document.querySelectorAll('button')).find(btn => 
            btn.textContent.includes('Copy') || btn.textContent.includes('Export')
        );
        
        if (copyButton) {
            const buttonContainer = copyButton.parentElement;
            if (buttonContainer && !buttonContainer.querySelector('.export-button-container')) {
                addButtonsToActionbar(buttonContainer);
            }
        }
        
        // 添加來源匯出按鈕
        addSourceExportButton();
    }

    // 添加樣式
    if (!document.getElementById('nlm-exporter-styles')) {
        const style = document.createElement('style');
        style.id = 'nlm-exporter-styles';
        style.textContent = `
        .export-button-container { 
            display: inline-flex; 
            align-items: center; 
            gap: 8px; 
            margin-left: 8px;
        }
        .export-button { 
            display: inline-flex; 
            align-items: center; 
            justify-content: center; 
            background: transparent;
            border: 1px solid #dadce0; 
            border-radius: 20px; 
            height: 36px;
            min-width: 36px;
            padding: 0 12px;
            cursor: pointer; 
            font-size: 14px;
            font-weight: 500;
            color: #5f6368;
            transition: all 0.2s ease;
            white-space: nowrap;
        }
        .export-button:hover { 
            background: rgba(95, 99, 104, 0.08); 
            border-color: #5f6368;
            color: #202124;
        }
        .export-button:disabled { 
            opacity: 0.6; 
            cursor: not-allowed; 
        }
        .export-button svg {
            margin-right: 4px;
        }
        
        /* 檔案匯出選單樣式 */
        .file-export-menu {
            position: fixed;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(218, 220, 224, 0.8);
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
            z-index: 9998;
            backdrop-filter: blur(10px);
            min-width: 150px;
        }
        
        .menu-item {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            border-bottom: 1px solid rgba(218, 220, 224, 0.4);
        }
        
        .menu-item:last-child {
            border-bottom: none;
        }
        
        .menu-item:hover {
            background: rgba(95, 99, 104, 0.08);
        }
        
        .menu-item svg {
            margin-right: 8px;
        }
        
        .menu-item span {
            font-size: 14px;
            color: #202124;
            font-weight: 500;
        }
        
        /* 提示詞側邊欄樣式 */
        .prompt-sidebar {
            position: fixed;
            top: 0;
            right: 0;
            width: 350px;
            height: 100vh;
            background: rgba(255, 255, 255, 0.95);
            border-left: 1px solid rgba(218, 220, 224, 0.6);
            box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            display: none;
            backdrop-filter: blur(20px);
        }
        
        .sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid rgba(218, 220, 224, 0.6);
            background: rgba(248, 249, 250, 0.8);
        }
        
        .header-controls {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .theme-toggle-btn {
            background: none;
            border: 1px solid rgba(218, 220, 224, 0.6);
            border-radius: 6px;
            width: 28px;
            height: 28px;
            cursor: pointer;
            color: #5f6368;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .theme-toggle-btn:hover {
            background: rgba(232, 234, 237, 0.8);
            border-color: #5f6368;
        }
        
        .sidebar-header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
            color: #202124;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #5f6368;
            padding: 4px;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .close-btn:hover {
            background: rgba(232, 234, 237, 0.8);
        }
        
        .sidebar-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        .category-tabs {
            display: flex;
            border-bottom: 1px solid rgba(218, 220, 224, 0.6);
            background: rgba(248, 249, 250, 0.8);
        }
        
        .tab-btn {
            flex: 1;
            padding: 12px 8px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            color: #5f6368;
            border-bottom: 2px solid transparent;
            transition: all 0.2s ease;
        }
        
        .tab-btn:hover {
            background: rgba(232, 234, 237, 0.6);
        }
        
        .tab-btn.active {
            color: #1a73e8;
            border-bottom-color: #1a73e8;
            background: rgba(255, 255, 255, 0.9);
        }
        
        .prompts-container {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
        }
        
        .prompt-button {
            width: 100%;
            background: transparent;
            color: #5f6368;
            border: 1px solid #dadce0;
            border-radius: 20px;
            padding: 12px 16px;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
        }
        
        .prompt-button:hover {
            background: rgba(95, 99, 104, 0.08);
            border-color: #5f6368;
            color: #202124;
        }
        
        .prompt-card {
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(218, 220, 224, 0.6);
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            backdrop-filter: blur(10px);
        }
        
        .prompt-card:hover {
            border-color: rgba(26, 115, 232, 0.8);
            box-shadow: 0 4px 16px rgba(26, 115, 232, 0.15);
            transform: translateY(-2px);
        }
        
        .prompt-text {
            font-size: 14px;
            line-height: 1.4;
            color: #202124;
            margin-bottom: 8px;
            padding-right: 30px;
        }
        
        .prompt-notebook {
            font-size: 12px;
            color: #5f6368;
            background: rgba(241, 243, 244, 0.8);
            padding: 4px 8px;
            border-radius: 12px;
            display: inline-block;
        }
        
        .delete-prompt-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            border: none;
            background: none;
            cursor: pointer;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .delete-prompt-btn:hover {
            background: rgba(254, 238, 238, 0.8);
        }
        
        .sidebar-footer {
            padding: 16px 20px;
            border-top: 1px solid rgba(218, 220, 224, 0.6);
            background: rgba(248, 249, 250, 0.8);
        }
        
        .credit {
            font-size: 12px;
            color: #5f6368;
            text-align: center;
        }
        
        .empty-state {
            text-align: center;
            color: #5f6368;
            font-size: 14px;
            padding: 40px 20px;
        }
        
        /* 儲存提示詞按鈕 */
        .save-prompt-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.9);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            z-index: 10;
            backdrop-filter: blur(10px);
        }
        
        /* 來源匯出按鈕 */
        .source-export-btn {
            margin-left: auto !important;
            font-size: 12px !important;
            height: 32px !important;
            min-width: 32px !important;
            padding: 0 10px !important;
        }
        
        .source-export-btn svg {
            margin-right: 2px !important;
        }
        
        .save-prompt-btn:hover {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: scale(1.1);
        }
        
        .save-prompt-btn svg {
            transition: all 0.2s ease;
        }
        
        .save-prompt-btn:hover svg {
            fill: #1a73e8;
        }
        
        div.from-user-container {
            position: relative !important;
        }
        
        /* API 對話框樣式 */
        .api-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        }
        
        .api-dialog {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 24px;
            width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(20px);
        }
        
        .api-dialog h3 {
            margin: 0 0 16px 0;
            font-size: 18px;
            font-weight: 600;
        }
        
        .api-dialog h4 {
            margin: 16px 0 8px 0;
            font-size: 16px;
            font-weight: 600;
            color: #1a73e8;
        }
        
        .api-dialog p {
            margin: 0 0 12px 0;
            color: #666;
            line-height: 1.4;
            font-size: 14px;
        }
        
        .setup-section {
            margin-bottom: 20px;
            padding: 16px;
            background: rgba(248, 249, 250, 0.5);
            border-radius: 8px;
            border: 1px solid rgba(218, 220, 224, 0.6);
        }
        
        .setup-instruction {
            font-size: 13px;
            color: #5f6368;
            margin: 8px 0 12px 0;
        }
        
        .script-container {
            margin: 12px 0;
        }
        
        .copy-btn {
            background: #34a853;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        
        .copy-btn:hover {
            background: #2d8f47;
        }
        
        .api-input {
            width: 100%;
            padding: 12px;
            border: 1px solid rgba(218, 220, 224, 0.8);
            border-radius: 8px;
            font-size: 14px;
            margin-bottom: 12px;
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.9);
        }
        
        .dialog-buttons {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
            margin-top: 20px;
        }
        
        .dialog-btn {
            padding: 10px 20px;
            border-radius: 8px;
            border: none;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .dialog-btn.primary {
            background: #1a73e8;
            color: white;
        }
        
        .dialog-btn.primary:hover {
            background: #1557b0;
        }
        
        .dialog-btn.secondary {
            background: rgba(248, 249, 250, 0.9);
            color: #5f6368;
            border: 1px solid rgba(218, 220, 224, 0.8);
        }
        
        .dialog-btn.secondary:hover {
            background: rgba(232, 234, 237, 0.9);
        }
        
        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 12px 0;
            font-size: 14px;
            color: #5f6368;
        }
        
        .checkbox-label input[type="checkbox"] {
            margin: 0;
        }
        
        /* 深色主題 */
        .prompt-sidebar.dark-theme {
            background: rgba(32, 33, 36, 0.95);
            color: #e8eaed;
        }
        
        .prompt-sidebar.dark-theme .sidebar-header {
            background: rgba(41, 42, 45, 0.8);
            border-bottom-color: rgba(95, 99, 104, 0.6);
        }
        
        .prompt-sidebar.dark-theme .sidebar-header h3 {
            color: #e8eaed;
        }
        
        .prompt-sidebar.dark-theme .close-btn,
        .prompt-sidebar.dark-theme .theme-toggle-btn {
            color: #9aa0a6;
            border-color: rgba(95, 99, 104, 0.6);
        }
        
        .prompt-sidebar.dark-theme .close-btn:hover,
        .prompt-sidebar.dark-theme .theme-toggle-btn:hover {
            background: rgba(95, 99, 104, 0.3);
        }
        
        .prompt-sidebar.dark-theme .category-tabs {
            background: rgba(41, 42, 45, 0.8);
            border-bottom-color: rgba(95, 99, 104, 0.6);
        }
        
        .prompt-sidebar.dark-theme .tab-btn {
            color: #9aa0a6;
        }
        
        .prompt-sidebar.dark-theme .tab-btn:hover {
            background: rgba(95, 99, 104, 0.3);
        }
        
        .prompt-sidebar.dark-theme .tab-btn.active {
            color: #8ab4f8;
            background: rgba(32, 33, 36, 0.9);
            border-bottom-color: #8ab4f8;
        }
        
        .prompt-sidebar.dark-theme .prompt-button {
            background: transparent;
            color: #9aa0a6;
            border-color: rgba(95, 99, 104, 0.6);
        }
        
        .prompt-sidebar.dark-theme .prompt-button:hover {
            background: rgba(95, 99, 104, 0.3);
            border-color: #9aa0a6;
            color: #e8eaed;
        }
        
        .prompt-sidebar.dark-theme .prompt-card {
            background: rgba(41, 42, 45, 0.9);
            border-color: rgba(95, 99, 104, 0.6);
            color: #e8eaed;
        }
        
        .prompt-sidebar.dark-theme .prompt-card:hover {
            border-color: rgba(138, 180, 248, 0.8);
        }
        
        .prompt-sidebar.dark-theme .prompt-text {
            color: #e8eaed;
        }
        
        .prompt-sidebar.dark-theme .prompt-notebook {
            background: rgba(95, 99, 104, 0.3);
            color: #9aa0a6;
        }
        
        .prompt-sidebar.dark-theme .sidebar-footer {
            background: rgba(41, 42, 45, 0.8);
            border-top-color: rgba(95, 99, 104, 0.6);
        }
        
        .prompt-sidebar.dark-theme .credit {
            color: #9aa0a6;
        }
        
        .prompt-sidebar.dark-theme .empty-state {
            color: #9aa0a6;
        }
        `;
        document.head.appendChild(style);
    }

    // 防抖動函數
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    const debouncedInit = debounce(() => {
        try {
            findAndInject();
            addSaveButtonToUserMessages();
            addSourceExportButton();
        } catch (error) {
            console.warn('[NLM Exporter] 初始化錯誤:', error);
        }
    }, 300);
    
    // 監聽頁面變化
    let observer;
    try {
        observer = new MutationObserver(debouncedInit);
        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: false,
            characterData: false
        });
    } catch (error) {
        console.warn('[NLM Exporter] Observer 設定失敗:', error);
    }
    
    // 清理函數
    window.addEventListener('beforeunload', () => {
        if (observer) observer.disconnect();
    });
    
    // 初始化
    setTimeout(debouncedInit, 500);
    setTimeout(debouncedInit, 2000);
}

function iframeScript() {
    console.log('[NLM Exporter] iframe 腳本啟動');

    window.addEventListener('message', (event) => {
        const { type, exportType } = event.data;
        
        if (type === 'NLM_GET_FULL_NOTE') {
            const chatData = extractNoteContent(exportType);
            if (chatData) {
                window.parent.postMessage({
                    type: 'NLM_EXPORT_CONTENT_RESPONSE',
                    status: 'success',
                    payload: chatData
                }, '*');
            } else {
                window.parent.postMessage({
                    type: 'NLM_EXPORT_CONTENT_RESPONSE',
                    status: 'error',
                    message: '無法提取對話內容'
                }, '*');
            }
        }
    });

    function extractNoteContent(exportType) {
        const title = extractTitle();
        
        const chatContent = document.querySelector('div.chat-panel-content') ||
                           document.querySelector('div[class*="chat-panel-content"]');
        
        if (chatContent) {
            const content = chatContent.innerText?.trim();
            if (content && content.length > 10) {
                return {
                    title: title + ' - 對話記錄',
                    content: content,
                    exportTo: exportType
                };
            }
        }
        
        return null;
    }

    function extractTitle() {
        const selectors = ['textarea', 'h1', '[contenteditable="true"]', 'input[type="text"]'];
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                const title = element.value || element.textContent || element.innerText;
                if (title && title.trim()) return title.trim();
            }
        }
        return '未命名筆記';
    }
}

// 主執行邏輯
if (isMainPage()) {
    mainPageScript();
} else if (isNoteIframe()) {
    iframeScript();
}