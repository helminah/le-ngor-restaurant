// Script auto-configuration EmailJS pour Le Ngor
// 1. Va sur https://dashboard.emailjs.com/admin/templates
// 2. Ouvre le template "Contact Us"
// 3. Colle ce script dans la console (F12 → Console) → Entree
// 4. Attends 3 secondes, c'est fait !

(function() {
  'use strict';

  const NEW_SUBJECT = "Nouvelle reservation - Le Ngor";
  const NEW_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
        <tr><td style="background:#1a5f3f;padding:30px;text-align:center;">
          <h1 style="color:#c9a84c;margin:0;font-size:28px;font-weight:bold;letter-spacing:1px;">LE NGOR</h1>
          <p style="color:#f5f0e8;margin:8px 0 0;font-size:14px;font-style:italic;">Restaurant - Plage de Ngor</p>
        </td></tr>
        <tr><td style="padding:30px 30px 0;">
          <h2 style="color:#1a5f3f;margin:0;font-size:22px;">Nouvelle reservation</h2>
          <p style="color:#888;margin:5px 0 0;font-size:14px;">Recue via le site internet</p>
        </td></tr>
        <tr><td style="padding:20px 30px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr><td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;width:35%;color:#1a5f3f;font-weight:bold;font-size:14px;">Nom</td>
                <td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{nom}}</td></tr>
            <tr><td style="padding:12px 15px;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Telephone</td>
                <td style="padding:12px 15px;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{tel}}</td></tr>
            <tr><td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Email</td>
                <td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{email}}</td></tr>
            <tr><td style="padding:12px 15px;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Date & Heure</td>
                <td style="padding:12px 15px;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{date}}</td></tr>
            <tr><td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Convives</td>
                <td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{convives}} personnes</td></tr>
            <tr><td style="padding:12px 15px;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Occasion</td>
                <td style="padding:12px 15px;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{occasion}}</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 30px 20px;">
          <p style="color:#1a5f3f;font-weight:bold;font-size:14px;margin:0 0 8px;">Demande speciale :</p>
          <div style="background:#f8f6f1;border-left:3px solid #c9a84c;padding:15px;color:#555;font-size:14px;line-height:1.6;">{{message}}</div>
        </td></tr>
        <tr><td style="padding:0 30px 30px;text-align:center;">
          <a href="tel:{{tel}}" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;">Appeler le client</a>
        </td></tr>
        <tr><td style="background:#1a5f3f;padding:20px 30px;text-align:center;">
          <p style="color:#f5f0e8;margin:0;font-size:13px;">Le Ngor - Restaurant | Ngor, Senegal</p>
          <p style="color:#c9a84c;margin:5px 0 0;font-size:12px;">Cette reservation a ete envoyee via restaurantlengor.sn</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function run() {
    console.log("[Le Ngor] Demarrage auto-config...");

    // 1. Modifier le Subject
    const subjectInput = document.querySelector('input[value*="Contact Us"], input[placeholder*="Subject"], div[contenteditable="true"]');
    if (subjectInput) {
      subjectInput.focus();
      subjectInput.value = NEW_SUBJECT;
      subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
      subjectInput.dispatchEvent(new Event('change', { bubbles: true }));
      console.log("[Le Ngor] Subject modifie !");
    } else {
      console.warn("[Le Ngor] Subject input non trouve, tentative par placeholder...");
      const allInputs = document.querySelectorAll('input, div[contenteditable]');
      for (const inp of allInputs) {
        if (inp.placeholder?.toLowerCase().includes('subject') || inp.getAttribute('aria-label')?.toLowerCase().includes('subject')) {
          inp.value = NEW_SUBJECT;
          inp.dispatchEvent(new Event('input', { bubbles: true }));
          console.log("[Le Ngor] Subject modifie (fallback) !");
          break;
        }
      }
    }

    await wait(500);

    // 2. Chercher et cliquer sur Edit Content
    const editBtn = Array.from(document.querySelectorAll('button, a, div, span')).find(el =>
      el.textContent.toLowerCase().includes('edit') && el.textContent.toLowerCase().includes('content')
    );
    if (editBtn) {
      editBtn.click();
      console.log("[Le Ngor] Bouton Edit Content clique !");
    } else {
      console.warn("[Le Ngor] Bouton Edit Content non trouve.");
    }

    await wait(1500);

    // 3. Injecter le HTML dans l'editeur
    const editors = document.querySelectorAll('textarea, div[contenteditable="true"], .cm-content, .monaco-editor');
    let injected = false;
    for (const ed of editors) {
      if (ed.tagName === 'TEXTAREA' || ed.contentEditable === 'true') {
        ed.value = NEW_HTML;
        ed.innerHTML = NEW_HTML;
        ed.textContent = NEW_HTML;
        ed.dispatchEvent(new Event('input', { bubbles: true }));
        ed.dispatchEvent(new Event('change', { bubbles: true }));
        injected = true;
        console.log("[Le Ngor] HTML injecte dans l'editeur !");
        break;
      }
    }

    if (!injected) {
      console.warn("[Le Ngor] Editeur non trouve. Verifiez manuellement.");
    }

    await wait(500);

    // 4. Chercher et cliquer Save
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.textContent.toLowerCase().includes('save')
    );
    if (saveBtn) {
      saveBtn.click();
      console.log("[Le Ngor] Sauvegarde declenchee !");
    }

    console.log("[Le Ngor] Configuration terminee. Verifiez le rendu et cliquez Save si necessaire.");
  }

  run();
})();
