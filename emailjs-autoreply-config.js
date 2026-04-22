// Script Console EmailJS - Creer le template Auto-Reply "Le Ngor"
// 1. Connecte-toi sur https://dashboard.emailjs.com/admin/templates
// 2. Clique "Create New Template"
// 3. Nomme-le : "Auto-Reply Reservation Le Ngor"
// 4. F12 -> Console -> colle ce script -> Entree

(function() {
  const NEW_SUBJECT = "Votre reservation au Ngor - Confirmation";
  const NEW_HTML = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 0;"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);max-width:94vw;"><tr><td style="background:#1a5f3f;padding:30px;text-align:center;"><h1 style="color:#c9a84c;margin:0;font-size:28px;font-weight:bold;letter-spacing:1px;">LE NGOR</h1><p style="color:#f5f0e8;margin:8px 0 0;font-size:14px;font-style:italic;">Restaurant - Plage de Ngor</p></td></tr><tr><td style="padding:30px 30px 0;"><h2 style="color:#1a5f3f;margin:0;font-size:22px;">Merci pour votre demande !</h2><p style="color:#555;margin:12px 0 0;font-size:15px;line-height:1.7;">Bonjour <strong>{{nom}}</strong>,<br><br>Nous avons bien recu votre demande de reservation. Notre equipe l'etudie attentivement et vous repondra dans un delai maximum de <strong style="color:#1a5f3f;">24 heures</strong>.</p></td></tr><tr><td style="padding:20px 30px;"><p style="color:#1a5f3f;font-weight:bold;font-size:14px;margin:0 0 12px;text-transform:uppercase;letter-spacing:.08em;">Recapitulatif de votre demande</p><table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tr><td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;width:35%;color:#1a5f3f;font-weight:bold;font-size:14px;">Date & Heure</td><td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{date}}</td></tr><tr><td style="padding:12px 15px;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Convives</td><td style="padding:12px 15px;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{convives}} personnes</td></tr><tr><td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Telephone</td><td style="padding:12px 15px;background:#f8f6f1;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{tel}}</td></tr><tr><td style="padding:12px 15px;border-bottom:1px solid #eee;color:#1a5f3f;font-weight:bold;font-size:14px;">Occasion</td><td style="padding:12px 15px;border-bottom:1px solid #eee;color:#333;font-size:14px;">{{occasion}}</td></tr></table></td></tr><tr><td style="padding:0 30px 20px;"><p style="color:#1a5f3f;font-weight:bold;font-size:14px;margin:0 0 8px;">Votre message :</p><div style="background:#f8f6f1;border-left:3px solid #c9a84c;padding:15px;color:#555;font-size:14px;line-height:1.6;">{{message}}</div></td></tr><tr><td style="padding:0 30px 30px;text-align:center;"><a href="https://wa.me/221775043006" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;">Nous contacter sur WhatsApp</a><p style="color:#888;font-size:13px;margin-top:12px;">Pour toute urgence, appelez le <a href="tel:+221775043006" style="color:#1a5f3f;text-decoration:underline;">+221 77 504 30 06</a></p></td></tr><tr><td style="background:#1a5f3f;padding:20px 30px;text-align:center;"><p style="color:#f5f0e8;margin:0;font-size:13px;">Le Ngor - Restaurant | Ngor, Senegal</p><p style="color:#c9a84c;margin:5px 0 0;font-size:12px;">Cette confirmation a ete envoyee automatiquement via restaurantlengor.sn</p></td></tr></table></td></tr></table></body></html>`;

  async function run() {
    // Modifier Subject
    const allInputs = document.querySelectorAll('input, div[contenteditable]');
    for (const inp of allInputs) {
      if (inp.placeholder?.toLowerCase().includes('subject') ||
          inp.getAttribute('aria-label')?.toLowerCase().includes('subject') ||
          inp.value?.toLowerCase().includes('new message')) {
        inp.value = NEW_SUBJECT;
        inp.dispatchEvent(new Event('input', {bubbles:true}));
        console.log('Subject OK');
        break;
      }
    }
    await new Promise(r => setTimeout(r, 500));

    // Clic Edit Content
    const editBtn = Array.from(document.querySelectorAll('button, a, div, span')).find(el =>
      el.textContent.toLowerCase().includes('edit') && el.textContent.toLowerCase().includes('content'));
    if (editBtn) { editBtn.click(); console.log('Edit Content OK'); }
    await new Promise(r => setTimeout(r, 1500));

    // Injecter HTML
    const editors = document.querySelectorAll('textarea, div[contenteditable="true"]');
    for (const ed of editors) {
      ed.value = NEW_HTML;
      ed.innerHTML = NEW_HTML;
      ed.dispatchEvent(new Event('input', {bubbles:true}));
      console.log('HTML injecte');
      break;
    }
    await new Promise(r => setTimeout(r, 500));

    // Save
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.textContent.toLowerCase().includes('save'));
    if (saveBtn) { saveBtn.click(); console.log('Save OK - TERMINE !'); }

    console.log('\n=== IMPORTANT ===');
    console.log('Recupere le Template ID dans l\'URL (ex: template_xxxxx)');
    console.log('Puis remplace template_autoreply_xxx dans index.html par ce Template ID');
  }

  run();
})();
