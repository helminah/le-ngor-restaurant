// =============================================================================
// SCRIPT CONSOLE - Activation Auto-Reply EmailJS (Confirmation client)
// =============================================================================
// 1. Va sur https://dashboard.emailjs.com/admin/templates
// 2. Ouvre le template "Contact Us" (template de reservation)
// 3. F12 → Console → copie-colle ce script → Entree
// 4. Attends 5 secondes. L'auto-reply sera configure.
// =============================================================================

(function() {
  const SUBJECT_CLIENT = "Votre reservation au Le Ngor est confirmee";
  const FROM_NAME = "Le Ngor Restaurant";
  const FROM_EMAIL = "contact@restaurantlengor.sn";

  const HTML_CLIENT = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
<tr><td style="background:#1a5f3f;padding:30px;text-align:center;">
<h1 style="color:#c9a84c;margin:0;font-size:28px;font-weight:bold;letter-spacing:1px;">LE NGOR</h1>
<p style="color:#f5f0e8;margin:8px 0 0;font-size:14px;font-style:italic;">Restaurant - Plage de Ngor</p>
</td></tr>
<tr><td style="padding:30px 30px 0;">
<h2 style="color:#1a5f3f;margin:0;font-size:22px;">Reservation confirmee</h2>
<p style="color:#888;margin:5px 0 0;font-size:14px;">Nous avons bien recu votre demande</p>
</td></tr>
<tr><td style="padding:20px 30px;">
<p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 15px;">
Bonjour <strong>{{nom}}</strong>,<br><br>
Nous vous confirmons la bonne reception de votre demande de reservation. Notre equipe vous contactera rapidement au <strong>{{tel}}</strong> pour la finaliser.
</p>
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:15px 0;">
<tr><td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;width:35%;color:#1a5f3f;font-weight:bold;font-size:14px;">Date & Heure</td>
<td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{date}}</td></tr>
<tr><td style="padding:12px 15px;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Convives</td>
<td style="padding:12px 15px;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{convives}} personnes</td></tr>
<tr><td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Occasion</td>
<td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{occasion}}</td></tr>
</table>
<p style="color:#555;font-size:15px;line-height:1.6;margin:0 0 15px;">
A tres bientot au <strong>Le Ngor</strong> pour un moment inoubliable les pieds dans l'eau.
</p>
</td></tr>
<tr><td style="padding:0 30px 30px;text-align:center;">
<a href="https://restaurantlengor.sn" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;">Visiter notre site</a>
</td></tr>
<tr><td style="background:#1a5f3f;padding:20px 30px;text-align:center;">
<p style="color:#f5f0e8;margin:0;font-size:13px;">Le Ngor - Restaurant | Ngor, Senegal</p>
<p style="color:#c9a84c;margin:5px 0 0;font-size:12px;">Tel: +221 77 123 45 67</p>
</td></tr>
</table>
</td></tr></table></body></html>`;

  async function run() {
    console.log("=== Configuration Auto-Reply Le Ngor ===");

    // 1. Chercher et cliquer sur "Auto-reply" dans la sidebar
    const sidebarItems = document.querySelectorAll('a, button, div, li, span');
    let autoReplyLink = null;
    for (const el of sidebarItems) {
      const text = el.textContent.toLowerCase();
      if (text.includes('auto') && text.includes('reply')) {
        autoReplyLink = el;
        break;
      }
    }

    if (!autoReplyLink) {
      console.warn("Onglet Auto-reply non trouve. Essaye de chercher 'Auto Reply' ou icone reply...");
      // Fallback: chercher icone reply ou texte partiel
      for (const el of sidebarItems) {
        const text = el.textContent.toLowerCase();
        if (text.includes('reply') || text.includes('reponse') || text.includes('confirm')) {
          if (el.offsetParent !== null) { // visible
            autoReplyLink = el;
            console.log("Alternative trouvee:", text);
            break;
          }
        }
      }
    }

    if (autoReplyLink) {
      autoReplyLink.click();
      console.log("Clic Auto-reply OK");
    } else {
      console.error("ERREUR: Impossible de trouver l'onglet Auto-reply. Cherche manuellement dans la sidebar gauche.");
      return;
    }

    await new Promise(r => setTimeout(r, 1500));

    // 2. Activer le toggle "Enable auto-reply"
    const toggles = document.querySelectorAll('input[type="checkbox"], button[role="switch"], .toggle, .switch');
    let enabled = false;
    for (const t of toggles) {
      const label = t.closest('label') || t.parentElement;
      const labelText = label ? label.textContent.toLowerCase() : '';
      if (labelText.includes('enable') || labelText.includes('activer') || t.getAttribute('aria-label')?.toLowerCase().includes('enable')) {
        if (!t.checked) {
          t.click();
          console.log("Toggle auto-reply active");
        } else {
          console.log("Auto-reply deja active");
        }
        enabled = true;
        break;
      }
    }
    if (!enabled) {
      console.warn("Toggle non trouve. Cherche un switch 'Enable auto-reply'.");
    }

    await new Promise(r => setTimeout(r, 800));

    // 3. Remplir Subject
    const allInputs = document.querySelectorAll('input[type="text"], input:not([type])');
    for (const inp of allInputs) {
      const ph = (inp.placeholder || '').toLowerCase();
      const lbl = (inp.getAttribute('aria-label') || '').toLowerCase();
      const name = (inp.name || '').toLowerCase();
      if (ph.includes('subject') || lbl.includes('subject') || name.includes('subject') || ph.includes('objet') || lbl.includes('objet')) {
        inp.value = SUBJECT_CLIENT;
        inp.dispatchEvent(new Event('input', {bubbles:true}));
        inp.dispatchEvent(new Event('change', {bubbles:true}));
        console.log("Subject client rempli");
        break;
      }
    }

    // 4. Remplir From Name
    for (const inp of allInputs) {
      const ph = (inp.placeholder || '').toLowerCase();
      const lbl = (inp.getAttribute('aria-label') || '').toLowerCase();
      const name = (inp.name || '').toLowerCase();
      if ((ph.includes('from') && ph.includes('name')) || (lbl.includes('from') && lbl.includes('name')) || name.includes('from_name')) {
        inp.value = FROM_NAME;
        inp.dispatchEvent(new Event('input', {bubbles:true}));
        console.log("From Name rempli");
        break;
      }
    }

    // 5. Remplir From Email
    for (const inp of document.querySelectorAll('input[type="email"], input')) {
      const ph = (inp.placeholder || '').toLowerCase();
      const lbl = (inp.getAttribute('aria-label') || '').toLowerCase();
      const name = (inp.name || '').toLowerCase();
      if ((ph.includes('from') && ph.includes('email')) || (lbl.includes('from') && lbl.includes('email')) || name.includes('from_email') || name.includes('fromemail')) {
        inp.value = FROM_EMAIL;
        inp.dispatchEvent(new Event('input', {bubbles:true}));
        console.log("From Email rempli");
        break;
      }
    }

    await new Promise(r => setTimeout(r, 500));

    // 6. Clic "Edit Content" si present
    const editBtn = Array.from(document.querySelectorAll('button, a, div, span')).find(el =>
      el.textContent.toLowerCase().includes('edit') && el.textContent.toLowerCase().includes('content')
    );
    if (editBtn) {
      editBtn.click();
      console.log("Edit Content OK");
      await new Promise(r => setTimeout(r, 1200));
    }

    // 7. Injecter HTML dans l'editeur
    const editors = document.querySelectorAll('textarea, div[contenteditable="true"]');
    for (const ed of editors) {
      ed.value = HTML_CLIENT;
      ed.innerHTML = HTML_CLIENT;
      ed.dispatchEvent(new Event('input', {bubbles:true}));
      console.log("HTML confirmation injecte");
      break;
    }

    await new Promise(r => setTimeout(r, 500));

    // 8. Sauvegarder
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.textContent.toLowerCase().includes('save') || b.textContent.toLowerCase().includes('sauvegarder')
    );
    if (saveBtn) {
      saveBtn.click();
      console.log("%cSAUVEGARDE OK - Auto-reply configure !", "color:green;font-size:14px;font-weight:bold;");
    } else {
      console.warn("Bouton Save non trouve. Clique manuellement sur Save.");
    }
  }

  run();
})();
