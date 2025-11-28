import { UserData, MetabolismType } from '../types';

/**
 * !!! ИНСТРУКЦИЯ ДЛЯ GOOGLE APPS SCRIPT !!!
 * 
 * Скопируйте код внутри блока комментариев ниже (между строками START и END).
 * Не копируйте символы "/*" или "* /".
 * Код должен начинаться с "var TELEGRAM_BOT_TOKEN = ..."
 */

/*
// --- START COPYING HERE (LINE 16) ---
var TELEGRAM_BOT_TOKEN = 'ВСТАВЬТЕ_ТОКЕН_БОТА_СЮДА'; 
var ADMIN_CHAT_ID = 'ВСТАВЬТЕ_ID_ГРУППЫ_СЮДА';

function findRowByPhone(sheet, phone) {
  var lastRow = sheet.getLastRow();
  for (var i = lastRow; i >= 2; i--) {
    var rowPhone = sheet.getRange(i, 3).getValue(); 
    if (String(rowPhone).replace(/\D/g, '') == String(phone).replace(/\D/g, '')) {
      return i;
    }
  }
  return null;
}

function sendTelegramMessage(text) {
  if (!TELEGRAM_BOT_TOKEN || !ADMIN_CHAT_ID || TELEGRAM_BOT_TOKEN.includes('ВСТАВЬТЕ')) return;
  
  var url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";
  var payload = {
    "chat_id": ADMIN_CHAT_ID,
    "text": text,
    "parse_mode": "HTML",
    "disable_web_page_preview": true
  };
  
  try {
    UrlFetchApp.fetch(url, {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload)
    });
  } catch (e) {
  }
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  var output = ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);

  if (data.action === 'marathon_click') {
    var row = findRowByPhone(sheet, data.phone);
    if (row) sheet.getRange(row, 7).setValue("Да"); 
    return output;
  }

  if (data.action === 'marathon_finished') {
    var row = findRowByPhone(sheet, data.phone);
    if (row) sheet.getRange(row, 8).setValue("Да"); 
    return output;
  }

  if (data.action === 'paid_ready') {
    var row = findRowByPhone(sheet, data.phone);
    var clientName = "Неизвестно";
    var metType = "Не определен";
    
    if (row) {
      sheet.getRange(row, 9).setValue("Да"); 
      clientName = sheet.getRange(row, 2).getValue(); 
      metType = sheet.getRange(row, 4).getValue();    
    }
    
    var userLink = "";
    if (data.username) {
      userLink = "\n💬 Чат: <a href='https://t.me/" + data.username + "'>@" + data.username + "</a>";
    } else {
      userLink = "\n💬 Чат: Нет username";
    }

    var message = "🔥 <b>ГОТОВ К ОПЛАТЕ! (СТОП ДИЕТА)</b>\n\n" +
                  "👤 <b>Имя:</b> " + clientName + "\n" +
                  "📱 <b>Телефон:</b> " + data.phone + "\n" +
                  "🧬 <b>Тип:</b> " + metType + 
                  userLink + "\n\n" +
                  "ℹ️ <i>Клиент нажал кнопку покупки в боте.</i>";
                  
    sendTelegramMessage(message);
    
    return output;
  }

  sheet.appendRow([
    new Date(),       
    data.name,        
    data.phone,       
    data.resultType,  
    data.score,       
    data.answers,     
    "Нет",            
    "Нет",            
    "Нет"             
  ]);
  
  return output;
}
// --- END COPYING HERE ---
*/

// Ссылка на опубликованный скрипт
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwQlRPmrTValtVfY3kVON5S-TXDu7bfuFUO9ht1mT6LaecNrRWgLzht4HoE8RydaKmK8g/exec';

export const submitToGoogleSheets = async (
  userData: UserData,
  resultType: MetabolismType,
  score: number,
  answers: Record<number, string>
): Promise<boolean> => {
  const payload = {
    action: 'submit',
    timestamp: new Date().toLocaleString("ru-RU"),
    name: userData.name,
    phone: userData.phone,
    resultType: resultType,
    score: score,
    answers: JSON.stringify(answers),
  };

  console.log("Submitting LEADS payload:", payload);

  if (!GOOGLE_SCRIPT_URL) return true;

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return false;
  }
};

export const recordMarathonClick = async (phone: string): Promise<boolean> => {
  const payload = {
    action: 'marathon_click',
    phone: phone,
  };

  console.log("Submitting MARATHON payload:", payload);

  if (!GOOGLE_SCRIPT_URL) return true;

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error("Error recording marathon click:", error);
    return false;
  }
};