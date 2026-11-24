/**
 * 教定區承接問答｜Apps Script 後端
 * 金鑰與通關密語放在「專案設定 → 指令碼屬性」，不要寫在程式裡。
 *   GEMINI_API_KEY  必填
 *   PASSCODE        必填（網頁第一次使用時輸入）
 *   DAILY_LIMIT     選填，每天最多幾次，預設 150
 *   GEMINI_MODEL    選填，預設 gemini-flash-latest
 */
const MANUAL = __MANUAL__;

const SYSTEM = [
  "你是「教定區壇辦班」的承接參謀，協助新接手的人了解過去的做法。",
  "只能根據下面〈手冊〉回答。手冊沒寫的就說「手冊裡沒有這項，請向本人確認」，不要編造。",
  "手冊裡標「待確認」的地方，回答時也要保留「待確認」。",
  "姓名維持手冊裡的遮名寫法，不要還原、不要猜真名。不要提供電話、帳號、密碼、金額。",
  "不要使用「接龍」的內容當依據。日期每年會變，要提醒以當年公文為準。",
  "用繁體中文，簡短、條列，先講結論。若使用者指定了角色，從該角色的工作角度回答；問題不屬於該角色時，指出是哪位的工作。",
  "〈手冊〉開始：\n"
].join("\n");

function doPost(e) {
  try {
    const P = PropertiesService.getScriptProperties();
    const body = JSON.parse(e.postData.contents);
    if (!P.getProperty("PASSCODE") || body.pass !== P.getProperty("PASSCODE")) return out_({ok:false, err:"auth"});
    const q = String(body.q || "").trim().slice(0, 500);
    if (!q) return out_({ok:false, err:"empty"});

    // 每日次數上限
    const lock = LockService.getScriptLock(); lock.waitLock(5000);
    const day = Utilities.formatDate(new Date(), "Asia/Taipei", "yyyyMMdd");
    const limit = parseInt(P.getProperty("DAILY_LIMIT") || "150", 10);
    let n = parseInt(P.getProperty("N_" + day) || "0", 10);
    if (n >= limit) { lock.releaseLock(); return out_({ok:false, err:"limit"}); }
    P.setProperty("N_" + day, String(n + 1)); lock.releaseLock();

    const role = body.role ? "（目前問的是：" + String(body.role).slice(0, 30) + "）" : "";
    const contents = [];
    (Array.isArray(body.history) ? body.history.slice(-6) : []).forEach(function (h) {
      if (h && h.t) contents.push({role: h.r === "bot" ? "model" : "user", parts: [{text: String(h.t).slice(0, 800)}]});
    });
    contents.push({role: "user", parts: [{text: q + role}]});

    const model = P.getProperty("GEMINI_MODEL") || "gemini-flash-latest";
    const res = UrlFetchApp.fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent",
      { method: "post", contentType: "application/json", muteHttpExceptions: true,
        headers: {"x-goog-api-key": P.getProperty("GEMINI_API_KEY")},
        payload: JSON.stringify({
          systemInstruction: {parts: [{text: SYSTEM + MANUAL}]},
          contents: contents,
          generationConfig: {temperature: 0.2, maxOutputTokens: 1200}
        }) });
    const code = res.getResponseCode();
    if (code !== 200) return out_({ok:false, err:"api" + code});
    const j = JSON.parse(res.getContentText());
    const parts = (((j.candidates || [])[0] || {}).content || {}).parts || [];
    const text = parts.map(function (p) { return p.text || ""; }).join("").trim();
    return out_(text ? {ok:true, a:text} : {ok:false, err:"empty_answer"});
  } catch (err) {
    return out_({ok:false, err:"server"});
  }
}

function doGet() { return out_({ok:true, hello:"承接問答後端運作中"}); }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
