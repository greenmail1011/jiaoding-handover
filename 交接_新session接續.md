# 交接｜教定區壇辦班承接專案（可換帳號接續）

更新：2026-11-25（本檔取代 2026-11-23 與 11-25 稍早的兩份舊交接）

> 這份是「遮名版」，本機與 GitHub 內容相同。不含金鑰、密語、電話、名單。

## 0. 先看這裡：換帳號怎麼接續
**跟 Claude 帳號綁在一起、換帳號後不會跟過去的：** 記憶檔、Project「三組佐理記憶」裡的文件、過去的對話、Gmail/Drive/Chrome 等連接器的授權。
**不受影響、換帳號後仍在的：** Mac 資料夾、GitHub repo、Apps Script 專案、Google Drive、Gemini 金鑰（這些屬於 Harry 的其他帳號或電腦）。

接續步驟：
1. 新帳號開 Claude 桌面版 → 新對話 → 「+」→「Add folder」→ 選 `Desktop/Tao/三組佐理記憶`。
2. 第一句話：「請先讀 `交接_新session接續.md`」。
3. 要改網站：請 Claude 把 GitHub repo `greenmail1011/jiaoding-handover` 加進這個 session（需要 push 權限；新帳號要先連接 GitHub）。
4. 要用瀏覽器或 Drive：重新連接 Claude in Chrome、Google Drive 連接器。瀏覽器一律用 Claude in Chrome，不用內建瀏覽器。
5. （選用）把 `承接手冊_彙整.md`、`承接手冊_做法版_教定區壇辦班.md` 重新放進新帳號的 Project。
6. 若換的是 **Google** 帳號：Apps Script 專案不能轉移擁有者，要在原專案「分享」給新帳號當編輯者，或把 `上線版/Code.gs` 貼到新帳號新建的專案、重設指令碼屬性並重新部署（會換 /exec 網址，要改 `index.html` 的 `AI_URL`）。

## 1. 目標與用法
Harry（台灣，無人機足球教育）承接 LINE 群組「教定區壇辦班」五位組長的工作：區中心 李小卿、道務 林小慧、總務 曾小誠、教育 歐小慧、志工輪值/除草 范小勇（皆遮名；經理＝周小順，遮名寫法，實名待 Harry 確認）。
用法：Harry 貼會議資料給 Claude，Claude 當「接手參謀」，依過去做法起草訊息，Harry 自己貼進 LINE（Claude 不能發 LINE）。

## 2. 鐵則
- 公開 repo 與公開網頁：姓名一律遮名（中間字改「小」；2 字名＝首字＋小）。
- 「接龍」內容不可當回答依據。
- 不推原始 LINE txt、`分析資料/`、任何含個資的名單。
- 花費前先告知；Gemini 為預付制（NT$150，自動儲值關閉，一年到期不退款）。
- eCRM 只讀，不輸入密碼、不改資料。Claude 不輸入任何金鑰或密碼，這類欄位由 Harry 自己填。
- Harry 偏好：Claude Pro、省額度；繁體中文；session 太長主動寫交接並提醒開新 session；複雜任務先建議模型與投入程度。
- Commit 結尾：`Co-Authored-By: Claude <noreply@anthropic.com>` 加上新 session 自己的 Claude-Session 連結。

## 3. 成品與位置
**GitHub**：https://github.com/greenmail1011/jiaoding-handover（main）
- `index.html`：單檔網站（3D 辦公室、角色對話、可複製範本、「幫我填」、AI 問答）。
- `承接手冊_做法版.md`：遮名手冊（含 2017–2022 補充）。
- `apps-script/Code.template.gs`、`apps-script/Code.gs`：AI 問答後端（Code.gs 由 template 把手冊內嵌產生，內含的手冊是遮名版）。
- `README.md`、本檔。

**Mac 資料夾**：`/Users/harrypotter/Desktop/Tao/三組佐理記憶/`
- `上線版/`：`Code.gs`、`index.html`、`部署步驟.md`（與 GitHub 同步）。
- `承接問答_Gemini/`：本機問答網頁（Gemini File Search，網址 127.0.0.1:8791）。金鑰在 `.env`，不要讀取。**尚未驗證重啟後能否正常回答**；現在網站有雲端版 AI 問答，這個本機版是備用。
- `教定區壇辦道親地圖.html`（v13，含個資，只放本機）及各 eCRM 名單 csv/json（含個資，不上網）。
- 原始資料：`[LINE]教定區壇辦班.txt`、`分析資料/`、三個幹部錄音檔（不上網）。
- `承接手冊_彙整.md`、`承接手冊_做法版_教定區壇辦班.md`（舊版含真名，僅本機）。
- 舊交接備份：`交接_新session接續_備份_*.md`（含真名，僅本機）。

## 4. AI 問答（這次完成）
架構：網站（GitHub 靜態頁）→ Apps Script 網頁應用程式 → Gemini。金鑰只放在 Apps Script 的「指令碼屬性」。
- Apps Script 專案名「承接問答後端」，部署為網頁應用程式（執行身分：我；存取：所有人）。
- 指令碼屬性：`GEMINI_API_KEY`、`PASSCODE`（密語只有 Harry 知道，不寫在任何檔案）、`DAILY_LIMIT`（沒設則預設 150，用完當天自動退回預寫答案）、選用 `GEMINI_MODEL`（預設 gemini-flash-latest）。
- 後端把遮名手冊內嵌在程式裡當唯一依據；系統提示要求：只依手冊、不編造、保留「待確認」、不還原真名、不用接龍、以角色視角回答。
- 前端：點角色→打字提問才會走 AI；點項目、工作總覽、這個月、幫我填仍用預寫答案（不花額度）。AI 失敗或逾時會自動退回預寫答案。
- 密語輸入：頁面右上角 🔑 按鈕（有 AI_URL 才顯示）。輸入後會先驗證（送空問題：回 `empty`＝正確、`auth`＝錯誤，不計次數），通過後按鈕變 🔓，密語存在該瀏覽器 localStorage（`jd-pass`）。可按「清除」停用。
- 更新手冊後：重新用 template 產生 Code.gs（把手冊以 JSON 字串取代 `__MANUAL__`），貼回 Apps Script →「部署→管理部署作業→編輯→新版本」，網址不變。
- 注意：雲端 Claude 環境連不到 script.google.com（代理擋 403），測後端必須請 Harry 在自己的瀏覽器測。
- Harry 決定：**不**把 Drive 資料夾串進 AI（資料夾【教定區】含通訊錄、婚喪、關懷、住宿、財務等個資，不適合）。

## 5. 其他系統（重點）
- **3D 辦公室**：長桌、經理坐前端面向大家；右排志工/總務/區中心，左排教育/道務；點角色開對話面板。人物順序：區中心、道務、總務、教育、志工。
- **道親地圖**：Apps Script 網頁應用程式（執行身分＝存取者本人，存取＝已登入 Google 帳戶，能不能看由 Drive 檔案共用決定）。資料來源 eCRM「區別＝教定區」，壇辦 62 人（壇主 30／辦事 27／捨辦 7，30 間佛堂）、全部道親 867 人。本機版 v13 另有「已成道」標記。
- **eCRM**（http://ecrm.andong.org.tw/mainpage/index.php）：Harry 的 Chrome 已登入。清口＝`customer_search.php` 選「清口」；各班名單＝`/r-<班別ID>/registration_pnt_3.php?registration_class=<班別ID>`；報名列表沒有「明道班」。「區別」欄不準，可能漏人。
- **NotebookLM 用 Google Doc**（私人，11/22 快照）：https://docs.google.com/document/d/1IGKtq3N6wmnJLnU3zcZwaegXDwTxiSStXXu7SjUFg4Y/edit

## 6. 待辦（都先確認再做）
1. 向林小慧（道務）要明道班參班紀錄與最新未參班名單（每年兩次，班前約一個月）。
2. Drive 的 `勤務組.pdf`、`禮節手冊.docx` 一般存取要手動改成「限制」；敦化班試算表分享設定待檢查；清掉空白試算表、`_frames_tmp`、Drive 舊版地圖。
3. 道親紀錄功能（未做）：明道班、敦化班可重複記錄；清口只一次；可篩「未清口／未參加明道班」。需先問 Harry 記錄放哪裡。
4. 未決資料：一位壇主歸「（未填佛堂）」；「張氏（未註明）」2 位成員；柬埔寨文姓名 221 位只計人數，是否逐一列出待決定。
5. 18 個問題待問區中心；2017–2021 早期項目偏薄，需舊 LINE 檔補。
6. 本機 Gemini 問答頁驗證；Project 內的承接手冊是舊版，尚未納入新功能與 AI 問答。
7. 是否把網站正式公開（GitHub Pages）與公開網址：Harry 尚未明確指示。

## 7. 技術備忘
- 雲端 ↔ Mac：`device_stage_files`（Mac→雲端）、`device_commit_files`（雲端→Mac，覆蓋用 `force:true`）；`device_bash` 看到的檔案可能過期，落地後再驗證。
- 推 GitHub：session 需先把 repo 加入並有 push 權限，否則 403。
- 前端測試：Playwright + swiftshader（`--use-gl=swiftshader --enable-unsafe-swiftshader --no-sandbox`），用攔截的假後端測 AI 路徑。
- 網站資料結構：`D`（人物）、TPL（範本）、FLOW、SRCURL（Drive 出處，🔒＝含個資需登入）、`CARDS`/`cardHTML`（工作總覽）、`FILL`（幫我填）。
