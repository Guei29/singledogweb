/* index.html  */
/* 最新消息彈窗功能 */
document.addEventListener("DOMContentLoaded", function() {
    const newsItems = document.querySelectorAll(".news-item");

    if (newsItems.length === 0) return;

    newsItems.forEach(item => {
        item.addEventListener("click", function() {
            const title = this.dataset.title;
            const content = this.dataset.content;
            showNewsModal(title, content);
        });
    });

    // 動態產生彈窗 (重複利用 style.css 裡的 modal 樣式)
    function showNewsModal(title, content) {
        // 1. 建立遮罩
        const overlay = document.createElement("div");
        overlay.classList.add("modal-overlay"); // 用之前寫好的 CSS class

        // 2. 建立彈窗內容
        const modal = document.createElement("div");
        modal.classList.add("modal-box"); // 用之前寫好的 CSS class
        // 稍微覆寫一下寬度，讓閱讀比較舒服
        modal.style.maxWidth = "500px"; 
        modal.style.width = "90%";

        modal.innerHTML = `
            <h3>📢 公告詳情</h3>
            <h4 style="color: #e6d6ff; margin-bottom: 15px; border-bottom: 1px dashed #555; padding-bottom: 10px;">${title}</h4>
            <div style="line-height: 1.8; color: #ccc; margin-bottom: 25px;">
                ${content}
            </div>
            <div style="text-align: right;">
                <button id="close-news-btn" class="modal-btn-confirm" style="width: auto;">收到 (Close)</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // 3. 綁定關閉事件
        // 點擊按鈕關閉
        document.getElementById("close-news-btn").onclick = function() {
            document.body.removeChild(overlay);
        };

        // 點擊遮罩背景也能關閉 (提升體驗)
        overlay.addEventListener("click", function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
});
/* 節日倒數計時器 */
(function () {
    const c = document.getElementById("countdown");
    if (!c) return; // 如果不在 index.html 就跳出

    // 決定下一個節日
    function getNextHoliday() {
        const holidays = [
            { name: "情人節", month: 2, day: 14 },
            { name: "七夕", month: 8, day: 10 },
            { name: "聖誕節", month: 12, day: 25 }
        ];

        const now = new Date();
        for (let h of holidays) {
            const target = new Date(now.getFullYear(), h.month - 1, h.day);

            if (target > now) return { name: h.name, date: target };
        }

        // 今年過完了，選明年第一個
        let next = holidays[0];
        return { name: next.name, date: new Date(now.getFullYear() + 1, next.month - 1, next.day) };
    }

    const next = getNextHoliday();

    function updateCountdown() {
        const now = new Date();
        const diff = next.date - now;

        if (diff <= 0) {
            c.textContent = "大劫日已經到來，願你平安！";
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        c.innerHTML =`
              <h3>距離${next.name}還有</h3>
              <div class="timer-boxes">
                  <div class="timer-item">
                    <div class="num">${d}</div>
                      <div class="label">日</div>
                  </div>

                  <div class="timer-item">
                      <div class="num">${h.toString().padStart(2,'0')}</div>
                      <div class="label">時</div>
                  </div>

                  <div class="timer-item">
                      <div class="num">${m.toString().padStart(2,'0')}</div>
                      <div class="label">分</div>
                  </div>

                  <div class="timer-item">
                      <div class="num">${s.toString().padStart(2,'0')}</div>
                      <div class="label">秒</div>
                  </div>
              </div>`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();


/* join_us.html */
/* 入團表單 */
document.addEventListener("DOMContentLoaded", function() {
    // 取得表單元素
    const joinForm = document.getElementById("joinForm");
    const resultDiv = document.getElementById("result-message");

    // 確保此頁面有表單才執行 (避免在其他頁面報錯)
    if (joinForm) {
        joinForm.addEventListener("submit", function(event) {
            // 1. 阻止表單預設的送出行為 (不會刷新頁面)
            event.preventDefault();

            // 2. 取得欄位值
            const name = document.getElementById("name").value.trim();
            const code = document.getElementById("code").value.trim();
            const email = document.getElementById("email").value.trim();
            const years = document.getElementById("years").value;
            const oath = document.getElementById("oath").checked;
            const reason = document.getElementById("reason").value.trim();

            // 取得被選中的 Radio 值
            const genderEl = document.querySelector('input[name="gender"]:checked');
            const gender = genderEl ? genderEl.value : "未填寫";

            if (years === "0") {
                alert("😡 大膽！非單身者請勿來亂！這裡不歡迎現充！");
                return;
            }

            if (!oath) {
                alert("⚠️ 請先宣誓忠誠！我們不收沒有覺悟的人！");
                return;
            }

            alert("🎉 歡迎歸隊，你的怨念我們收到了！");

            // 在頁面上顯示「模擬信件」
            // 我們把原本的文字改成了「Email 介面風格」，讓使用者感覺真的收到了信
            resultDiv.style.display = "block";

            // 設定寄件者信箱
            const senderEmail = "singledog@gmail.com";
            const currentDate = new Date().toLocaleString(); // 取得現在時間

            resultDiv.innerHTML = `
                <div style="border: 2px solid #333; padding: 20px; background-color: #fff; color: #000; border-radius: 8px; font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 15px;">
                        <h3 style="margin: 0 0 10px 0; color: #d32f2f;">✉️ 入會通知信 (模擬預覽)</h3>
                        <p style="margin: 5px 0;"><strong>寄件者 (From)：</strong> <span style="color: blue;">${senderEmail}</span> (單身狗保護協會)</p>
                        <p style="margin: 5px 0;"><strong>收件者 (To)：</strong> ${email}</p>
                        <p style="margin: 5px 0;"><strong>時間 (Date)：</strong> ${currentDate}</p>
                        <p style="margin: 5px 0;"><strong>主旨 (Subject)：</strong> [單身狗保護協會] 入團通知 - ${name}</p>
                    </div>

                    <div style="line-height: 1.6; font-size: 15px;">
                        <p>親愛的 <strong>${name}</strong> (代號：${code})：</p>
                        <p>恭喜你通過審核！你的資料已登錄至協會資料庫。</p>
                        <ul style="background-color: #f9f9f9; padding: 15px 20px; border-radius: 5px;">
                            <li><strong>性別：</strong> ${gender}</li>
                            <li><strong>單身資歷：</strong> ${years} 年</li>
                            <li><strong>入會怨念：</strong> ${reason || "（無言的憤怒）"}</li>
                        </ul>

                        <p>請謹記你的誓言：<strong>不在節日出門放閃，守護單身的榮耀。</strong></p>
                        <p>若有任何疑問，請直接回信至本信箱。</p>

                        <br>

                        <p style="text-align: right;">
                            <strong>單身狗保護協會 會長 敬上</strong><br>
                            <span style="font-size: 0.8em; color: #666;">(Magic Guild of Single Dogs)</span>
                        </p>
                    </div>
                </div>

                <p style="text-align: center; margin-top: 15px; color: #ffeb3b; font-weight: bold;">
                    ✅ 系統已模擬發信流程，請截圖保存此契約。
                </p>`;
        });
    }
});


/* danger_zone.html */
/* 禁區地圖 */
const nameList = [
    { name: '成大圖書館' }, 
    { name: '太子學舍大廳' }, 
    { name: '成大未來館(聖誕樹)' },
    { name: '漁光島' },
    { name: '勝後放閃區' },
    { name: '成大光復操場' },
    { name: '南紡威秀影城' }
];
function filterTables() {
    const selectedValue = document.getElementById('zone-selector').value; // 獲取當前選中的值 (all, chengda, city)
    const tables = document.querySelectorAll('.danger-table'); // 獲取所有表格

    tables.forEach(table => {
        table.style.display = 'none'; // 預設將所有表格隱藏
        const tableId = table.id; // 獲取表格的 ID (e.g., table-chengda)

        if (selectedValue === 'all') {
            // 如果選擇 'all'，則顯示所有表格 (或僅顯示 table-all)
            document.getElementById('table-all').style.display = 'table';
        } 

        // 如果選中的值是表格 ID 的一部分，則顯示該表格
        // 例如：選中 chengda，則顯示 table-chengda
        else if (tableId.includes(selectedValue)) {
            table.style.display = 'table';
        }
    });

    // 可選：當選擇特定區域時，隱藏 table-all
    if (selectedValue !== 'all' && document.getElementById('table-all')) {
         document.getElementById('table-all').style.display = 'none';
    }
}

// 確保頁面載入時執行一次，以顯示初始狀態 (通常是 'all' 或 'none')
document.addEventListener('DOMContentLoaded', filterTables);

// 動態生成地點按鈕
window.initMapButtons = function() {
    const stageList = document.getElementById('map-stage-list');
    let buttonsHTML = '';

    nameList.forEach(item => {
        buttonsHTML += `<button class="map-stage-item btn btn-danger-zone" onclick="loadMapIframe('${item.name}')">${item.name}</button>`;});
    
    stageList.innerHTML = buttonsHTML;
}

// 載入地圖 iframe 
window.loadMapIframe = function(name) {
    const mapDiv = document.getElementById('map');
    const baseLocation = (name.includes('成大') || name.includes('太子學舍')) ? '國立成功大學' : '台南';
    const searchQuery = encodeURIComponent(`${name}, ${baseLocation}`);

    // 將 iframe 插入到容器中
    mapDiv.innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border:0;" 
    src="http://www.google.com/maps?q=$$$?q=${searchQuery}&output=embed"></iframe>`;

    // 顯示警告訊息
    console.log(`⚡️ [鎖定] 目標：${name}。地圖已載入，請提高警覺！`);
}

document.addEventListener('DOMContentLoaded', initMapButtons);

// 禁區地圖背景音樂控制
document.addEventListener("DOMContentLoaded", function() {
    // 1. 抓取音樂元素
    const audio = document.getElementById("bgm");

    // 2. 如果頁面上有 bgm 才執行
    if (audio) {
        
        audio.volume = 0.4; 

        // 3. 嘗試直接播放
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // (以下省略，維持原樣)
                console.log("自動播放被阻擋，等待使用者互動...");
                const playOnInteraction = function() {
                    audio.play();
                    document.removeEventListener('click', playOnInteraction);
                };
                document.addEventListener('click', playOnInteraction);
            });
        }
    }
});


/* equipment.html */
/* 防禦裝備商店邏輯 */
document.addEventListener("DOMContentLoaded", function () {
    // 1. 定義變數
    let cart = {}; 
    let totalPrice = 0;
    let myWealth = 1000; 

    const walletBalanceEl = document.getElementById("wallet-balance");
    const totalPriceEl = document.getElementById("total-price");
    const totalEquipmentEl = document.getElementById("total-equipment");
    
    const checkoutBtn = document.getElementById("checkout-btn");
    const clearBtn = document.getElementById("clear-cart-btn");
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

    // 2. 初始化
    if(walletBalanceEl) walletBalanceEl.innerText = `${myWealth} G`;

    // 3. 綁定「加入購物車」
    if (addToCartBtns.length > 0) {
        addToCartBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                const itemContainer = btn.closest(".item");
                const name = itemContainer.dataset.name || itemContainer.querySelector("h3").innerText;
                const price = parseInt(itemContainer.dataset.price);

                addToCart(name, price);
            });
        });
    }

    // 4. 綁定「確認購買」
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            if (myWealth < totalPrice) {
                if (myWealth === 0) {
                    alert("🛑 交易失敗！你的存款是 0 G，你的存款跟你的戀愛學分一樣。");
                } else {
                    alert(`🛑 資金不足！\n需：${totalPrice} G / 餘：${myWealth} G\n\n建議：請按「清空購物車」重新選擇。`);
                }
                return; 
            }

            // 扣款成功
            myWealth -= totalPrice;
            const purchasedList = Object.keys(cart).map(n => `✨ ${n} x ${cart[n]}`).join("\n");

            alert(`✅ 交易完成！\n\n【採購清單】\n${purchasedList}\n\n💰 剩餘財產：${myWealth} G`);

            resetCart();
            
            // 更新錢包顯示
            walletBalanceEl.innerText = `${myWealth} G`;
            walletBalanceEl.style.color = "#00ff00"; // 這行還是可以保留，作為視覺特效
            setTimeout(() => walletBalanceEl.style.color = "", 500);
        });
    }

    // 5. 綁定「清空購物車」
    if (clearBtn) {
        clearBtn.addEventListener("click", function() {
            if(confirm("🗑️ 確定要清空目前選擇的所有裝備嗎？")) {
                resetCart();
            }
        });
    }

    // --- 邏輯函式 ---

    function addToCart(name, price) {
        if (cart[name]) {
            cart[name] += 1;
        } else {
            cart[name] = 1;
        }
        totalPrice += price;
        updateCartDisplay();
    }

    function resetCart() {
        cart = {};
        totalPrice = 0;
        updateCartDisplay();
    }

    // 核心更新函式 
    function updateCartDisplay() {
        // 更新總價
        if(totalPriceEl) {
            totalPriceEl.innerText = `${totalPrice} G`;
            if (totalPrice > myWealth) {
                totalPriceEl.style.color = "#ff4d4d"; // 紅字警告
                totalPriceEl.innerText += " (預算超支!)";
            } else {
                totalPriceEl.style.color = ""; 
            }
        }

        // 更新按鈕狀態
        const itemNames = Object.keys(cart);
        const isEmpty = itemNames.length === 0;

        if (isEmpty) {
            // --- 購物車是空的 ---
            if(totalEquipmentEl) totalEquipmentEl.innerText = "無";
            
            // 透過 disabled 屬性控制，CSS 會自動處理外觀
            if(checkoutBtn) {
                checkoutBtn.disabled = true;
                checkoutBtn.innerText = "確認購買並部署";
                checkoutBtn.classList.remove("btn-error"); // 移除錯誤樣式
            }
            if(clearBtn) {
                clearBtn.disabled = true;
            }

        } else {
            // --- 購物車有東西 ---
            const listString = itemNames.map(name => `${name} (x${cart[name]})`).join(", ");
            if(totalEquipmentEl) totalEquipmentEl.innerText = listString;

            // 啟用清空按鈕
            if(clearBtn) {
                clearBtn.disabled = false;
            }

            // 判斷結帳按鈕
            if(checkoutBtn) {
                if (totalPrice > myWealth) {
                    // 錢不夠：雖然 technically 可以按(為了跳出嘲諷視窗)，但我們可以用 class 改變外觀
                    checkoutBtn.disabled = false; // 讓它可點擊以觸發 alert
                    checkoutBtn.innerText = "餘額不足 (點此查看建議)";
                    checkoutBtn.classList.add("btn-error"); // 加紅底 class
                } else {
                    // 錢夠
                    checkoutBtn.disabled = false;
                    checkoutBtn.innerText = `確認支付 ${totalPrice} G`;
                    checkoutBtn.classList.remove("btn-error");
                }
            }
        }
    }
});


/* ranks.html */
/* 單身年資計算機 - 自定義彈窗版 (CSS 分離版) */
(function () {
    const ageInput = document.getElementById("age");
    const calcBtn = document.getElementById("calcBtn");
    const result = document.getElementById("result");
    const ranksTable = document.querySelector("table tbody"); 

    if (!calcBtn) return;

    // --- 動態設定最大年份 ---
    const currentYear = new Date().getFullYear(); 
    
    // 設定 input 的 max 屬性
    ageInput.max = currentYear; 
    ageInput.placeholder = `輸入年份 (1000 ~ ${currentYear})`;

    calcBtn.addEventListener("click", function () {
        const inputVal = Number(ageInput.value);

        // 基本驗證
        if (!inputVal || inputVal < 1000 || inputVal > currentYear) {
            alert(`請輸入正確的「年份」！\n(介於 1000 ~ ${currentYear} 之間)`);
            return; 
        }

        // 初始計算年資
        let years = currentYear - inputVal;

        // 呼叫自定義彈窗
        createCustomConfirm(
            "【靈魂拷問】", 
            "你是否曾經對情侶的閃光感到一絲絲羨慕？", 
            "是，我承認", 
            "否，絕無此事", 
            function(isEnvy) {
                calculateFinalResult(years, isEnvy);
            }
        );
    });

    // --- 核心邏輯：計算並顯示最終結果 (使用 CSS Class) ---
    function calculateFinalResult(years, isEnvy) {
        let warningMsg = "";

        // 怨念懲罰邏輯
        if (isEnvy) {
            years = Math.round(years / 2); 
            // 改用 class
            warningMsg = `<span class="calc-warning-red">⚠️ [警告] 怨念值扣除 50%！內心尚存光芒！</span>`;
        } else {
            // 改用 class
            warningMsg = `<span class="calc-warning-green">✅ 純種怨念認證通過！</span>`;
        }

        let title = "";
        let rowIndex = -1; 
        let extraComment = "";
        let finalHtml = "";

        // 狀況 A: 超過 150 歲 -> 成仙
        if (years > 150) {
            title = "仙 (Immortal)";
            rowIndex = -1; 
            
            // 使用 class 控制樣式
            finalHtml = `${warningMsg}
                         你已修煉了 <strong>${years}</strong> 年...<br>
                         <span class="calc-text-immortal">
                            你不是人，你已經成『仙』了！
                         </span>
                         <span class="calc-text-sub">(協會已無法定義你的存在，請受我們一拜)</span>`;

        } else {
            // 狀況 B: 人類範圍 (<= 150)
            
            // 檢查是否破世界紀錄
            if (years > 122) {
                // 使用 class 控制樣式
                extraComment = `<div class="calc-record-box">
                                🏆 恭喜！你打破了單身狗金氏世界紀錄 (122歲)！請儘速聯繫單身狗保護協會生物學家。
                                </div>`;
            }

            if (years >= 30) {
                title = "傳奇賢者";
                rowIndex = 3;
            } else if (years >= 16) {
                title = "孤高大法師";
                rowIndex = 2;
            } else if (years >= 6) {
                title = "高階魔法使";
                rowIndex = 1;
            } else {
                title = "魔法學徒";
                rowIndex = 0;
            }

            // 0 年特殊文案
            let practiceText = "";
            if (years === 0) {
                practiceText = `你正開始修練單身魔法，`;
            } else {
                practiceText = `你已修煉了 <strong>${years}</strong> 年的單身魔法，<br>`;
            }

            // 使用 class 控制稱號顏色
            finalHtml = `${warningMsg}
                         ${practiceText}
                         是個 <span class="calc-rank-title">【${title}】</span>
                         ${extraComment}`;
        }

        // 表格高亮邏輯
        if (ranksTable) {
            const rows = ranksTable.querySelectorAll("tr");
            rows.forEach(row => row.classList.remove("highlight-row"));

            if (rowIndex !== -1 && rows[rowIndex]) {
                rows[rowIndex].classList.add("highlight-row");
                rows[rowIndex].scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }

        result.innerHTML = finalHtml;
    }

    // --- DOM Scripting：動態建立彈出視窗 (使用 CSS Class) ---
    function createCustomConfirm(titleText, msgText, yesText, noText, callback) {
        // 建立遮罩
        const overlay = document.createElement("div");
        overlay.classList.add("custom-confirm-overlay");

        // 建立彈窗
        const modal = document.createElement("div");
        modal.classList.add("custom-confirm-modal");

        // 標題
        const title = document.createElement("h3");
        title.innerText = titleText;

        // 訊息
        const msg = document.createElement("p");
        msg.innerText = msgText;

        // 按鈕群組
        const btnGroup = document.createElement("div");
        btnGroup.classList.add("confirm-btn-group");

        const btnYes = document.createElement("button");
        btnYes.innerText = yesText;
        btnYes.classList.add("confirm-btn-yes");

        const btnNo = document.createElement("button");
        btnNo.innerText = noText;
        btnNo.classList.add("confirm-btn-no");

        // 組裝 DOM
        btnGroup.appendChild(btnYes);
        btnGroup.appendChild(btnNo);
        modal.appendChild(title);
        modal.appendChild(msg);
        modal.appendChild(btnGroup);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // 事件綁定
        btnYes.onclick = function() {
            document.body.removeChild(overlay);
            callback(true);
        };

        btnNo.onclick = function() {
            document.body.removeChild(overlay);
            callback(false);
        };
    }
})();


/* survival_guide.html */
/* 生存魔導書  */
document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".book-page");
    const prevBtn = document.getElementById("prevPageBtn");
    const nextBtn = document.getElementById("nextPageBtn");
    const indicator = document.getElementById("pageIndicator");
    
    // 1. 抓取翻頁音效元素
    const flipSound = document.getElementById("page-flip-sound");

    // 如果這頁沒有書本元素 (例如在首頁)，就不執行
    if (pages.length === 0) return;

    let currentPageIndex = 0; // 目前在第幾頁 (從 0 開始)

    function updateBookDisplay() {
        // 隱藏所有頁面，只顯示當前頁
        pages.forEach((page, index) => {
            if (index === currentPageIndex) {
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }
        });

        // 更新按鈕狀態
        prevBtn.disabled = (currentPageIndex === 0);
        nextBtn.disabled = (currentPageIndex === pages.length - 1);

        // 更新頁碼文字
        indicator.innerText = `第 ${currentPageIndex + 1} 章 / 共 ${pages.length} 章`;

        // 自動滾動到書本頂部
        document.getElementById("magic-book").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // --- 輔助函式：播放音效 ---
    function playFlip() {
        if (flipSound) {
            flipSound.volume = 1;
            flipSound.currentTime = 0; // 每次播放前歸零，確保連點時也能順暢播放
            flipSound.play().catch(e => console.log("音效播放被瀏覽器阻擋 (需互動後才能播放)", e));
        }
    }

    // 綁定按鈕事件 (加入音效播放)
    prevBtn.addEventListener("click", () => {
        if (currentPageIndex > 0) {
            playFlip(); // 播放音效
            currentPageIndex--;
            updateBookDisplay();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentPageIndex < pages.length - 1) {
            playFlip(); // 播放音效
            currentPageIndex++;
            updateBookDisplay();
        }
    });

    // 初始化狀態
    updateBookDisplay();
});


/* goodcard.html */
/* 好人卡展示牆 (Flexbox 排版版) */
document.addEventListener("DOMContentLoaded", function () {
    const WALL_ID = "cardWall";
    const BTN_ID = "addCard";
    const INPUT_TEXT_ID = "cardText";
    const INPUT_MEANING_ID = "cardMeaning";
    
    // 修改 key 名稱，強制使用者載入新版面，避免舊的座標資料干擾
    const STORAGE_KEY = "goodGuyCardData_v5_Flex"; 

    const ATTRIBUTE_IS_MEANING = 'data-is-meaning';
    const wallContainer = document.getElementById(WALL_ID);
    const addBtn = document.getElementById(BTN_ID);

    if (!wallContainer || !addBtn) return;

    loadAndRenderCards();

    addBtn.addEventListener("click", handleAddCard);

    function loadAndRenderCards() {
        wallContainer.innerHTML = ""; 
        let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        if (cards.length === 0) {
            cards = getDefaultCards();
            saveCards(cards);
        }

        cards.forEach(card => {
            renderCard(card);
        });
    }

    function renderCard(cardData) {
        const safeTextId = cardData.text.replace(/[^a-zA-Z0-9_\u4e00-\u9fa5]/g, '').substring(0, 20);
        const cardId = `note-${safeTextId}`;
        
        // 檢查是否重複 (雖然後端資料有防重複，但 DOM 操作還是檢查一下)
        if (document.getElementById(cardId)) return;

        let note = document.createElement("div");
        note.className = "card-note"; 
        note.id = cardId;
        
        // 綁定資料
        note.setAttribute('data-original-text', cardData.text); 
        note.setAttribute('data-meaning', cardData.meaning); 
        note.setAttribute('data-bg-color', cardData.bgColor); 
        note.setAttribute(ATTRIBUTE_IS_MEANING, 'false');

        // 設定內容
        note.innerText = cardData.text;

        // 設定樣式
        // 1. 背景顏色 (便利貼顏色)
        if (!cardData.bgColor) cardData.bgColor = getRandomNoteColor();
        note.style.backgroundColor = cardData.bgColor;

        // 2. 隨機旋轉 (保留一點凌亂感，但位置由 Flexbox 控制)
        // 角度限制在 -5度 到 5度 之間，才不會太歪影響閱讀
        note.style.transform = `rotate(${cardData.angle}deg)`;

        // 3. 字體大小 (根據被怨念的次數稍微變大，但設上限)
        const fontSize = Math.min(1.3 + (cardData.count * 0.1), 2);
        note.style.fontSize = `${fontSize}rem`;

        // 點擊翻面
        note.addEventListener("click", toggleMeaning);

        wallContainer.appendChild(note);
    }

    function toggleMeaning(event) {
        const note = event.currentTarget;
        const isMeaning = note.getAttribute(ATTRIBUTE_IS_MEANING) === 'true';
        const originalText = note.getAttribute('data-original-text');
        const meaningText = note.getAttribute('data-meaning');

        if (isMeaning) {
            // 切換回語錄
            note.innerText = originalText;
            note.style.color = "#2c3e50"; // 深色字
            note.style.fontStyle = "normal";
            note.setAttribute(ATTRIBUTE_IS_MEANING, 'false');
        } else {
            // 切換到含義
            note.innerText = `真相：\n${meaningText}`;
            note.style.color = "#d63031"; // 紅色字強調真相
            note.style.fontStyle = "italic"; // 斜體
            note.setAttribute(ATTRIBUTE_IS_MEANING, 'true');
        }
    }

    function handleAddCard() {
        const textInput = document.getElementById(INPUT_TEXT_ID);
        const meaningInput = document.getElementById(INPUT_MEANING_ID);
        const text = textInput.value.trim();
        const meaning = meaningInput.value.trim();

        if (!text) {
            alert("請輸入你收過的好人卡！");
            return;
        }

        let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const existingIndex = cards.findIndex(c => c.text === text);

        if (existingIndex !== -1) {
            // 已存在：增加權重 (字變大)
            cards[existingIndex].count += 1;
            cards[existingIndex].meaning = meaning || cards[existingIndex].meaning;
            saveCards(cards);
            
            // 重新渲染全部 (簡單暴力，確保排序或樣式更新)
            loadAndRenderCards(); 
            alert("這句話太經典，怨念值 +1！");

        } else {
            // 新增卡片
            const newCard = {
                text: text,
                meaning: meaning || '（還要真相?就是你不夠帥/美）',
                count: 1,
                // 不再需要 left/top
                angle: getRandomPercent(-5, 5), // 輕微旋轉
                bgColor: getRandomNoteColor()   // 隨機便利貼顏色
            };

            cards.push(newCard); // 加到陣列
            saveCards(cards);
            renderCard(newCard); // 直接渲染這張
        }

        // 清空輸入框
        textInput.value = "";
        meaningInput.value = "";
    }

    function getDefaultCards() {
        return [
            { text: "你是個好人", meaning: "但我不喜歡醜的", count: 5, angle: -2, bgColor: "#fff8c8" },
            { text: "我把你當哥哥", meaning: "免費司機+修電腦", count: 2, angle: 3, bgColor: "#ffc8c8" },
            { text: "現階段不想談戀愛", meaning: "是不想跟你談", count: 1, angle: 1, bgColor: "#c8f7c8" },
            { text: "我們不適合", meaning: "你太窮了", count: 0, angle: -4, bgColor: "#c8e6ff" },
            { text: "是我不夠好", meaning: "你的條件完全不行", count: 3, angle: 2, bgColor: "#f2c8ff" }
        ];
    }

    /* 工具函式 */
    // 產生淡色系的便利貼背景色 (黃、粉、綠、藍、紫)
    function getRandomNoteColor() {
        const colors = [
            "#fff8c8", // 經典黃
            "#ffc8c8", // 櫻花粉
            "#c8f7c8", // 薄荷綠
            "#c8e6ff", // 天空藍
            "#f2c8ff", // 夢幻紫
            "#e8e8e8"  // 質感灰
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function saveCards(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function getRandomPercent(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});

/* oracle.html */
/* 每日神諭（抽籤） */
(function () {
    const ball = document.getElementById("crystal-ball");
    const resultText = document.getElementById("oracle-result");
    const oracles = [
        // --- 運勢篇 (Luck) ---
        "大吉：今日財運亨通，因為你不需要存錢買情人節禮物。",
        "大吉：去吃火鍋吧！店員看你一個人，會多送你一盤肉以示同情。",
        "大吉：今日宜課金。你對紙片人的愛，永遠不會被背叛。",
        "中吉：路邊的情侶看起來快吵架了，建議買包爆米花在旁觀戰。",
        "中吉：超商第二件六折，恭喜你可以一個人吃兩份，雙倍快樂。",
        "小吉：雖然沒人道早安，但至少也沒有人會查你的勤。",
        "小吉：今日適合加班。反正早點回家也沒有人在等你。",
        "凶：忌打開 Instagram，你的朋友們都在集體發情，輻射量超標。",
        "凶：今日桃花運為負值。連巷口的野狗都不想理你。",
        "凶：別再滑交友軟體了，上面的詐騙集團都覺得你很難聊。",
        "大凶：警報！出門左轉高機率遇到前任牽著新歡，建議整天躲被窩。",
        "大凶：今日不宜穿白衣，因為路邊的情侶會把飲料潑到你身上。",

        // --- 任務篇 (Missions) ---
        "任務：去電影院把單數座位的票都買光，讓情侶被迫分開坐。",
        "任務：點一份全家餐炸雞，然後一個人全部吃光，不准分給別人。",
        "任務：看到情侶接吻時，大聲假裝講電話說：「媽！哥他在這裡偷吃！」",
        "任務：在路上看到有人拿花，請用憐憫的眼神看著他的錢包。",
        "任務：把手機開飛航模式一整天，假裝自己忙到沒空回訊息（其實根本沒人傳）。",
        "任務：對著鏡子練習「我就爛」的手勢，提升心靈防禦力。",
        "任務：去公園站在情侶面前觀賞刺激畫面。"
    ];
    
    if (!ball) return;

    const drawSound = document.getElementById("drawing-sound");
    const revealSound = document.getElementById("reveal-sound");
    const DRAWING_TIME_MS = 3500;

    
    ball.addEventListener("click", startOracle); 
    function startOracle(){
        ball.style.pointerEvents = 'none'; 
        resultText.textContent = "✨ 魔法正在運算中，請稍候... ✨";
        ball.style.transform = "scale(1.15)";

        if (drawSound) {
            drawSound.currentTime = 0;
            drawSound.play().catch(e => console.error("無法播放抽卡音效:", e));
        }

        setTimeout(() => {
            // 停止抽卡音效 (如果還在播放)
            if (drawSound) drawSound.pause();

            // 播放結果音效
            if (revealSound) {
                revealSound.currentTime = 0;
                revealSound.play().catch(e => console.error("無法播放結果音效:", e));
            }

            // 隨機抽取並顯示結果
            const random = Math.floor(Math.random() * oracles.length);
            resultText.textContent = oracles[random];

            // 啟用點擊，結束儀式
            ball.style.transform = "scale(1)";
            ball.style.pointerEvents = 'auto';

        }, DRAWING_TIME_MS);
        
        /* 播放音效邏輯 
        const audio = document.getElementById("mario-sound");
        if (audio) {
            audio.currentTime = 0; // 關鍵：每次點擊都把時間歸零，才能連點連播
            audio.play();
        }
        */
        
        // const random = Math.floor(Math.random() * oracles.length);
        // resultText.textContent = oracles[random];

        // ball.style.transform = "scale(1.15)";
        // setTimeout(() => (ball.style.transform = "scale(1)"), 200);
    }
    
})();

/* 怨念值累加器 */
document.addEventListener("DOMContentLoaded", function() {
    const resentBtn = document.getElementById("resentBtn");
    const resentCountSpan = document.getElementById("resentCount");
    const frogImage = document.getElementById("logo"); 

    // 若找不到按鈕（可能在別頁），則不執行
    if (!resentBtn || !resentCountSpan) return;

    let count = 0;

    // 3. 定義里程碑資料 (Milestones)
    const milestones = {
        10: {
            title: "初級覺醒",
            msg: "10點怨念達成！你剛剛消耗的卡路里，比你這輩子約會走的路還要多。"
        },
        50: {
            title: "哲學萌芽",
            msg: "50點！單身多久，你的手速就有多快。"
        },
        100: {
            title: "技能覺醒",
            msg: "破百！你肯定一個人很無聊吧，真可憐。"
        },
        250: {
            title: "情感麻痺",
            msg: "250點。你的單身怨念已轉化為『時間增幅』。每當你看到情侶時，程式碼編寫速度將自動提升 30%，專案永遠領先進度。"
        },
        500: {
            title: "大魔法師",
            msg: "五百大關！你的單身魔力已滿溢，現在你可以用心靈感應，讓你回家時精準避開情侶密集區！"
        },
        750: {
            title: "錢包守護",
            msg: "750點。請查收你的銀行賬戶。你剛省下來的錢，夠買一輩子的雞排和珍珠奶茶，且不需分享。"
        },
        1000: {
            title: "傳奇賢者",
            msg: "恭喜達到傳奇！最終的真理是：你不需要任何人的陪伴，你只需要 Code 跟 Coke。"
        }
    };

    // 4. 動態建立「訊息顯示區」 (因為不能改 HTML)
    // 我們用 JS 自己造一個 div 插在按鈕下面
    const msgBox = document.createElement("div");
    msgBox.id = "resent-milestone-box";
    msgBox.style.marginTop = "20px";
    msgBox.style.padding = "15px";
    msgBox.style.borderRadius = "8px";
    msgBox.style.display = "none"; // 一開始隱藏
    msgBox.style.transition = "all 0.3s ease";

    // 將訊息框插入到 <section> 的最後面
    resentBtn.parentElement.appendChild(msgBox);

    // 5. 點擊事件處理
    resentBtn.addEventListener("click", function() {
        // --- 新增開始：播放音效邏輯 ---
        const audio = document.getElementById("coin-sound");
        if (audio) {
            audio.currentTime = 0; // 關鍵：每次點擊都把時間歸零，才能連點連播
            audio.play();
        }
        // --- 新增結束 ---

        // A. 數值增加
        count++;
        resentCountSpan.innerText = count;

        // B. 視覺特效：點擊時按鈕震動或放大
        resentBtn.style.transform = "scale(0.95)";
        setTimeout(() => resentBtn.style.transform = "scale(1)", 100);

        // C. 怨念特效：讓青蛙(Logo)變紅
        // 隨著點擊次數越高，紅色越深 (利用 CSS filter)
        if (frogImage) {
            // 計算紅色程度：每 100 下達到最紅
            let intensity = Math.min(count / 100, 1); 
            // drop-shadow 產生紅色發光暈，hue-rotate 調整色相
            frogImage.style.filter = `drop-shadow(0 0 ${intensity * 20}px red) sepia(${intensity}) hue-rotate(-50deg) saturate(${1 + intensity * 5})`;

            // 點擊瞬間抖動青蛙
            frogImage.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
            setTimeout(() => frogImage.style.transform = "none", 50);
        }

        // D. 檢查里程碑
        if (milestones[count]) {
            const data = milestones[count];
            showMilestone(data.title, data.msg);
        }
    });

    // 6. 顯示訊息的函式
    function showMilestone(title, msg) {
        msgBox.style.display = "block";
        msgBox.style.backgroundColor = "rgba(255, 0, 0, 0.2)"; // 淡紅色背景
        msgBox.style.border = "2px solid #ff4d4d";
        msgBox.innerHTML = `
            <h3 style="color: #ff4d4d; margin: 0 0 10px 0;">🎉 ${title}</h3>
            <p style="margin: 0; color: #fff;">${msg}</p>
        `;

        // 觸發一個簡單的動畫
        msgBox.animate([
            { transform: 'scale(0.8)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ], {
            duration: 300,
            fill: 'forwards'
        });
    }
});


/* simulator.html */
/* 互動模擬室 */
document.addEventListener("DOMContentLoaded", function () {
    /* =========================================
       GAME 1: 憑實力單身 (直男/直女模擬器)
       ========================================= */
    const straightGame = {
        score: 0,
        currentQIndex: 0,
        questions: [
            {
                q: "情境題：寒流來襲，對方發抖著說「好冷喔～」。手上剛好有一件外套的你，會怎麼做？",
                options: [
                    { text: "三小？你出門不會看氣象喔？", score: 10, type: "correct" }, // 憑實力單身
                    { text: "這件外套借你穿吧。", score: 0, type: "neutral" },       // 普通人
                    { text: "來，我抱著你就不冷了❤️", score: -10, type: "wrong" }      // 現充去死
                ]
            },
            {
                q: "情境題：對方深情地看著你說：「我想看你一眼，如果可以的話，再多看幾萬眼。」",
                options: [
                    { text: "嘔嘔嘔 WTF！你眼睛有病喔？", score: 10, type: "correct" },
                    { text: "好喔，給你看。", score: 0, type: "neutral" },
                    { text: "我也想一直看著你❤️", score: -10, type: "wrong" }
                ]
            },
            {
                q: "冷笑話題：你知道什麼東西紅紅的吃了對口腔不好嗎？是磚頭。",
                options: [
                    { text: "55555 真的假的啦 (敷衍)", score: 10, type: "correct" },
                    { text: "笑死，這什麼爛梗。", score: 0, type: "neutral" },
                    { text: "哈哈你好幽默喔～愛了❤️", score: -10, type: "wrong" }
                ]
            },
            {
                q: "陷阱題：對方傳訊息說「我去洗澡囉」，你會回？",
                options: [
                    { text: "喔 (已讀不回)", score: 10, type: "correct" },
                    { text: "好，去吧。", score: 0, type: "neutral" },
                    { text: "不想讓你去，想跟你繼續聊...", score: -10, type: "wrong" }
                ]
            },
            {
                q: "送命題：對方問「你看我今天有什麼不一樣？」",
                options: [
                    { text: "變胖了？", score: 10, type: "correct" },
                    { text: "剪頭髮了嗎？", score: 0, type: "neutral" },
                    { text: "不管怎樣都好看❤️", score: -10, type: "wrong" }
                ]
            }
        ],

        init: function() {
            this.cacheDOM();
            this.bindEvents();
            this.restartGame();
        },

        cacheDOM: function() {
            this.scoreEl = document.getElementById("score-display");
            this.questionText = document.getElementById("question-text");
            this.optionsContainer = document.getElementById("options-container");
            this.feedbackEl = document.getElementById("feedback-msg");
            this.nextBtn = document.getElementById("next-btn");
            this.quizArea = document.getElementById("quiz-area");
            this.resultArea = document.getElementById("result-area");
            this.finalTitle = document.getElementById("final-title");
            this.finalDesc = document.getElementById("final-desc");
            this.restartBtn = document.getElementById("restart-btn");
        },

        bindEvents: function() {
            this.nextBtn.addEventListener("click", () => this.nextQuestion());
            this.restartBtn.addEventListener("click", () => this.restartGame());
        },

        restartGame: function() {
            this.score = 0;
            this.currentQIndex = 0;
            this.updateScore();
            this.quizArea.classList.remove("hidden");
            this.resultArea.classList.add("hidden");
            this.loadQuestion();
        },

        loadQuestion: function() {
            const currentQ = this.questions[this.currentQIndex];
            this.questionText.innerText = `Q${this.currentQIndex + 1}. ${currentQ.q}`;
            this.feedbackEl.innerText = "";
            this.nextBtn.classList.add("hidden");
            this.optionsContainer.innerHTML = "";

            // 隨機打亂選項順序
            const shuffledOptions = [...currentQ.options].sort(() => Math.random() - 0.5);

            shuffledOptions.forEach(opt => {
                const btn = document.createElement("button");
                btn.className = "option-btn";
                btn.innerText = opt.text;
                btn.onclick = () => this.checkAnswer(opt, btn);
                this.optionsContainer.appendChild(btn);
            });
        },

        checkAnswer: function(selectedOpt, btnElement) {
            // 1. 鎖定所有按鈕
            const allBtns = this.optionsContainer.querySelectorAll(".option-btn");
            allBtns.forEach(btn => btn.disabled = true);

            // 2. 更新分數
            this.score += selectedOpt.score;
            this.updateScore();

            // 3. 顯示按鈕顏色狀態
            if (selectedOpt.score > 0) {
                btnElement.classList.add("correct");
                this.feedbackEl.innerHTML = "<span style='color:#28a745'>漂亮！這就是鋼鐵直男/女的風範！(+10)</span>";
            } else if (selectedOpt.score < 0) {
                btnElement.classList.add("wrong");
                this.feedbackEl.innerHTML = "<span style='color:#dc3545'>噁心！協會對你感到失望！(-10)</span>";
            } else {
                btnElement.classList.add("neutral");
                this.feedbackEl.innerHTML = "<span style='color:#aaa'>平平無奇的回答。(+0)</span>";
            }

            // 4. 顯示下一題按鈕
            this.nextBtn.classList.remove("hidden");
        },

        nextQuestion: function() {
            this.currentQIndex++;
            if (this.currentQIndex < this.questions.length) {
                this.loadQuestion();
            } else {
                this.showResult();
            }
        },

        updateScore: function() {
            this.scoreEl.innerText = this.score;
        },

        showResult: function() {
            this.quizArea.classList.add("hidden");
            this.resultArea.classList.remove("hidden");

            let title, desc, soundId; // 新增 soundId 變數
            
            if (this.score >= 40) {
                title = "🏆 稱號：萬年神木";
                desc = "太強了！你就像一根神木，任何曖昧的微風都吹不動你。註定孤獨一生，協會為你感到驕傲！";
                soundId = "sound-high-score"; // 設定對應音效 ID
            } else if (this.score >= 10) {
                title = "😐 稱號：絕緣體見習生";
                desc = "你有單身的潛力，但偶爾還是會不小心展現出禮貌。請繼續保持冷漠。";
                soundId = "sound-mid-score";
            } else {
                title = "🚨 稱號：協會叛徒";
                desc = "警報！你的言行充滿了戀愛的酸臭味！請立刻去「禁區地圖」自我反省，不要帶壞其他會員！";
                soundId = "sound-low-score";
            }

            this.finalTitle.innerText = title;
            this.finalDesc.innerText = desc;

            // --- 新增開始：播放對應音效 ---
            const audio = document.getElementById(soundId);
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
            // --- 新增結束：播放對應音效 ---
        }
    };

    // 啟動直男模擬器
    if(document.getElementById("straight-simulator")) {
        straightGame.init();
    }


    /* =========================================
       GAME 2: 邪門 CP 猜猜樂
       ========================================= */
    const cpGame = {
        currentCP: null,
        cpList: [
            {
                a: { name: "蜘蛛人", keywords: ["蜘蛛人", "彼得帕克", "Spider-Man"], hint: "你的好鄰居，會吐絲的超級英雄" },
                b: { name: "佩佩豬", keywords: ["佩佩豬", "粉紅豬小妹", "Peppa"], hint: "粉紅色的豬，長得像吹風機" },
                desc: "一個是蜘蛛，一個有四個眼睛，都有特異功能，非常合理。"
            },
            {
                a: { name: "佛地魔", keywords: ["佛地魔"], hint: "沒有鼻子的黑魔王" },
                b: { name: "林黛玉", keywords: ["林黛玉", "黛玉", "林妹妹"], hint: "紅樓夢裡的柔弱女子" },
                desc: "兩個看起來都像病了十年。"
            },
            {
                a: { name: "星野愛", keywords: ["星野愛", "小愛"], hint: "眼睛有星星的傳奇偶像" },
                b: { name: "五條悟", keywords: ["五條悟", "五條老師"], hint: "戴眼罩的 2.5" },
                desc: "擅長領便當的兩人。"
            },
            {
                a: { name: "芙莉蓮", keywords: ["芙莉蓮", "葬送的芙莉蓮"], hint: "活了千年的精靈魔法使，喜歡收集魔導書" },
                b: { name: "史瑞克", keywords: ["史瑞克", "怪物"], hint: "綠色的怪物，住在沼澤裡" },
                desc: "一個是精靈，一個是怪物，感覺是會被芙莉蓮討伐的對象..."
            },
            {
                a: { name: "大木博士", keywords: ["大木博士", "大木"], hint: "小智的真爸爸(X" },
                b: { name: "水島太太", keywords: ["水島太太", "水島"], hint: "花媽的好朋友" },
                desc: "博士喜歡人妻，肯定會喜歡水島太太的。"
            },
            {
                a: { name: "水伊布", keywords: ["水伊布", "水精靈"], hint: "濕濕的寶可夢，特別好用" },
                b: { name: "巨石強森", keywords: ["巨石強森", "The Rock"], hint: "辣個光頭肌肉男" },
                desc: "網路上流傳著關於水伊布的相容性科普...再加上地表最硬的男人。這是「最水」與「最硬」的矛盾對決。"
            },
            {
                a: { name: "兩面宿儺", keywords: ["宿儺", "兩面宿儺"], hint: "詛咒之王，住在虎杖體內" },
                b: { name: "仙杜瑞拉", keywords: ["仙杜瑞拉", "灰姑娘"], hint: "掉了玻璃鞋的公主" },
                desc: "領域展開「伏魔御廚子」遇上「南瓜馬車」。午夜十二點前，是用斬擊切碎舞會，還是趕回家打掃？"
            },
            {
                a: { name: "海綿寶寶", keywords: ["海綿寶寶", "方褲褲"], hint: "住在深海鳳梨裡的黃色方塊" },
                b: { name: "神力女超人", keywords: ["神力女超人", "戴安娜"], hint: "DC 的亞馬遜女戰士" },
                desc: "正義聯盟女超人 vs 比奇堡最強廚師。一個拯救世界，一個拯救美味蟹堡。"
            },
            {
                a: { name: "薩諾斯", keywords: ["薩諾斯", "滅霸"], hint: "紫色皮膚，喜歡彈手指消滅人口" },
                b: { name: "拇指姑娘", keywords: ["拇指姑娘","小不點", "拇指公主"], hint: "小到看不太到的女孩" },
                desc: "一個會彈指，一個跟手指一樣大，肯定很般配。"
            },
            {
                a: { name: "哆啦A夢", keywords: ["哆啦A夢", "小叮噹"], hint: "藍色機器貓，有百寶袋" },
                b: { name: "貞子", keywords: ["貞子"], hint: "從電視爬出來的長髮女鬼" },
                desc: "這兩個人都喜歡住在狹窄的地方（壁櫥 vs 井/電視）。或許貞子爬出來時，哆啦A夢會給她一個任意門。"
            }
        ],

        init: function() {
            this.cacheDOM();
            this.bindEvents();
            this.loadRandomCP();
        },

        cacheDOM: function() {
            this.hintA = document.getElementById("hint-a");
            this.hintB = document.getElementById("hint-b");
            this.inputA = document.getElementById("input-a");
            this.inputB = document.getElementById("input-b");
            this.checkBtn = document.getElementById("check-cp-btn");
            this.revealBtn = document.getElementById("reveal-cp-btn");
            this.nextBtn = document.getElementById("next-cp-btn");
            this.resultEl = document.getElementById("cp-result");
            this.leftAvatar = document.querySelector(".left-avatar");
            this.rightAvatar = document.querySelector(".right-avatar");
        },

        bindEvents: function() {
            this.checkBtn.addEventListener("click", () => this.checkAnswer());
            this.revealBtn.addEventListener("click", () => this.revealAnswer());
            this.nextBtn.addEventListener("click", () => this.loadRandomCP());
        },

        loadRandomCP: function() {
            // 隨機選一對
            this.currentCP = this.cpList[Math.floor(Math.random() * this.cpList.length)];

            // 重置 UI
            this.hintA.innerText = this.currentCP.a.hint;
            this.hintB.innerText = this.currentCP.b.hint;
            this.inputA.value = "";
            this.inputB.value = "";
            this.inputA.disabled = false;
            this.inputB.disabled = false;
            this.resultEl.innerText = "";
            this.leftAvatar.innerText = "?";
            this.rightAvatar.innerText = "?";

            // 按鈕狀態
            this.checkBtn.classList.remove("hidden");
            this.revealBtn.classList.remove("hidden");
            this.nextBtn.classList.add("hidden");
        },

        checkAnswer: function() {
            const valA = this.inputA.value.trim();
            const valB = this.inputB.value.trim();

            if (!valA || !valB) {
                alert("請填寫兩邊的名字！");
                return;
            }

            // 檢查是否包含關鍵字 (模糊比對)
            const isACorrect = this.currentCP.a.keywords.some(k => valA.includes(k));
            const isBCorrect = this.currentCP.b.keywords.some(k => valB.includes(k));

            if (isACorrect && isBCorrect) {
                // --- 新增開始：播放音效 ---
                const audio = document.getElementById("cp-correct-sound");
                if (audio) {
                    audio.currentTime = 0; // 重置時間，確保每次猜對都從頭播
                    audio.play();
                }
                // --- 新增結束 ---
                
                this.resultEl.innerHTML = `<span style="color:#28a745">🎉 太神了！你居然猜到了這對邪門 CP！<br>${this.currentCP.desc}</span>`;
                this.showRealNames();
            } else {
                let msg = "❌ 猜錯囉！";
                if (isACorrect) msg += " (角色 A 猜對了)";
                if (isBCorrect) msg += " (角色 B 猜對了)";
                this.resultEl.innerText = msg;
            }
        },

        revealAnswer: function() {
            this.resultEl.innerHTML = `<span style="color:#d63384">答案揭曉：${this.currentCP.a.name} X ${this.currentCP.b.name}<br>${this.currentCP.desc}</span>`;
            this.showRealNames();
        },

        showRealNames: function() {
            this.leftAvatar.innerText = this.currentCP.a.name[0];
            this.rightAvatar.innerText = this.currentCP.b.name[0];
            this.inputA.value = this.currentCP.a.name;
            this.inputB.value = this.currentCP.b.name;
            this.inputA.disabled = true;
            this.inputB.disabled = true;

            this.checkBtn.classList.add("hidden");
            this.revealBtn.classList.add("hidden");
            this.nextBtn.classList.remove("hidden");
        }
    };

    // 啟動 CP 產生器
    if(document.getElementById("cursed-cp-game")) {
        cpGame.init();
    }
});

/* rituals.html */
/* 公會集會動態報名系統 */
document.addEventListener("DOMContentLoaded", function () {
    const ritualCards = document.querySelectorAll(".ritual-card");

    if (ritualCards.length === 0) return;

    ritualCards.forEach(card => {
        updateCardStatus(card);
    });

    // --- 核心邏輯：更新卡片狀態 ---
    function updateCardStatus(card) {
        const dateStr = card.dataset.date;
        const eventTitle = card.dataset.title;
        let currentCount = parseInt(card.dataset.current);
        const maxCount = parseInt(card.dataset.max);
        
        const btn = card.querySelector(".ritual-action-btn");
        const countDisplay = card.querySelector(".ritual-count");

        // 日期判斷 (是否過期)
        const eventDate = new Date(dateStr);
        eventDate.setHours(23, 59, 59); 
        const now = new Date();

        if (now > eventDate) {
            setButtonState(btn, "ended", "活動已結束 (Event Ended)");
            return;
        }

        // 人數判斷 (是否額滿)
        if (currentCount >= maxCount) {
            setButtonState(btn, "closed", "報名已結束 (額滿)");
        } else {
            setButtonState(btn, "open", "開放預約中 (Book Now)");
            
            // 綁定點擊事件 (先移除舊的避免重複)
            btn.onclick = null; 
            btn.onclick = function() {
                openBookingModal(eventTitle, function(userInfo) {
                    // 報名成功回調
                    currentCount++; 
                    card.dataset.current = currentCount; 

                    // 更新文字顯示
                    if (maxCount > 90000) {
                        countDisplay.innerHTML = `<strong>報名人數：</strong> 已預約 ${currentCount.toLocaleString()} 人 / 無限額`;
                    } else {
                        countDisplay.innerHTML = `<strong>報名人數：</strong> 已預約 ${currentCount} 人 / 限額 ${maxCount} 人`;
                    }

                    // 遞迴檢查 (如果剛好滿了，會立刻變紅色)
                    updateCardStatus(card);

                    // 成功提示
                    alert(`✅ 報名成功！\n\n歡迎${userInfo.name}加入【${eventTitle}】\n確認信已發送至：${userInfo.email}`);
                });
            };
        }
    }

    // --- 輔助函式：設定按鈕外觀 ---
    function setButtonState(btn, state, text) {
        btn.innerText = text;
        btn.classList.remove("status-open", "status-closed", "status-ended");
        
        if (state === "open") {
            btn.classList.add("status-open");
            btn.disabled = false;
        } else if (state === "closed") {
            btn.classList.add("status-closed");
            btn.disabled = true;
        } else {
            btn.classList.add("status-ended");
            btn.disabled = true;
        }
    }

    // --- UI 函式：動態產生報名彈窗 (使用 class 樣式) ---
    function openBookingModal(title, successCallback) {
        // 建立遮罩
        const overlay = document.createElement("div");
        overlay.classList.add("modal-overlay");

        // 建立彈窗內容
        const modal = document.createElement("div");
        modal.classList.add("modal-box");

        modal.innerHTML = `
            <h3>🔮 簽署契約</h3>
            <p>您欲參加：<strong>${title}</strong></p>
            
            <label>您的代號 (Name):</label>
            <input type="text" id="modal-name" placeholder="例如：孤獨的風">

            <label>聯絡電話 (Phone):</label>
            <input type="tel" id="modal-phone" placeholder="09xx-xxx-xxx (必填)">
            
            <label>電子信箱 (Email):</label>
            <input type="email" id="modal-email" placeholder="example@mail.com (必填)">

            <div class="modal-buttons">
                <button id="modal-cancel" class="modal-btn-cancel">取消</button>
                <button id="modal-confirm" class="modal-btn-confirm">確認報名</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // 綁定「取消」事件
        document.getElementById("modal-cancel").onclick = function() {
            document.body.removeChild(overlay);
        };

        // 綁定「確認」事件 (含驗證邏輯)
        document.getElementById("modal-confirm").onclick = function() {
            const nameInput = document.getElementById("modal-name");
            const phoneInput = document.getElementById("modal-phone");
            const emailInput = document.getElementById("modal-email");

            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            const email = emailInput.value.trim();

            // 重置錯誤樣式
            nameInput.classList.remove("input-error");
            phoneInput.classList.remove("input-error");
            emailInput.classList.remove("input-error");

            let isValid = true;
            let errorMsg = [];

            // 1. 驗證名字 (不可為空)
            if (!name) {
                nameInput.classList.add("input-error");
                isValid = false;
            }

            // 2. 驗證電話 (台灣手機格式 09xxxxxxxx)
            // Regex 解釋: ^09 開頭, 後面接 8 個數字, $ 結尾
            const phoneRegex = /^09\d{8}$/;
            if (!phoneRegex.test(phone)) {
                phoneInput.classList.add("input-error");
                errorMsg.push("電話格式錯誤 (需為 09 開頭共 10 碼數字)");
                isValid = false;
            }

            // 3. 驗證 Email (基本格式)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailInput.classList.add("input-error");
                errorMsg.push("Email 格式錯誤");
                isValid = false;
            }

            if (!isValid) {
                // 如果有錯誤，顯示提示 (如果名字沒填就提示通用的，如果有具體格式錯就顯示具體的)
                if(errorMsg.length > 0) {
                    alert("⚠️ 驗證失敗：\n" + errorMsg.join("\n"));
                } else {
                    alert("⚠️ 請完整填寫所有欄位！");
                }
                return;
            }

            // 全部通過，關閉視窗並執行回呼
            document.body.removeChild(overlay);
            successCallback({ name, phone, email });
        };
    }
});