// Script console - Modifier le To Email du template Le Ngor
// 1. Connecte-toi sur https://dashboard.emailjs.com/admin/templates/cita2g8
// 2. F12 → Console → copie-colle ce script → Entree

(function() {
  const NEW_EMAIL = 'contact@restaurantlengor.sn';

  async function run() {
    // Cherche l'input "To Email" ou "Recipient Email"
    const allInputs = document.querySelectorAll('input[type="email"], input[type="text"], div[contenteditable]');
    let found = false;

    for (const inp of allInputs) {
      const label = inp.closest('div, label, fieldset');
      const labelText = (label ? label.textContent : '').toLowerCase();
      const aria = (inp.getAttribute('aria-label') || '').toLowerCase();
      const ph = (inp.placeholder || '').toLowerCase();

      if (labelText.includes('to email') || labelText.includes('recipient') || labelText.includes('destinataire') ||
          aria.includes('to email') || aria.includes('recipient') ||
          ph.includes('to email') || ph.includes('recipient')) {
        inp.value = NEW_EMAIL;
        inp.dispatchEvent(new Event('input', {bubbles:true}));
        inp.dispatchEvent(new Event('change', {bubbles:true}));
        console.log('To Email mis a jour :', NEW_EMAIL);
        found = true;
        break;
      }
    }

    if (!found) {
      // Fallback: cherche tout input contenant un @
      for (const inp of allInputs) {
        if (inp.value && inp.value.includes('@')) {
          inp.value = NEW_EMAIL;
          inp.dispatchEvent(new Event('input', {bubbles:true}));
          console.log('Email field remplace :', NEW_EMAIL);
          found = true;
          break;
        }
      }
    }

    await new Promise(r => setTimeout(r, 500));

    // Sauvegarde
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b =>
      b.textContent.toLowerCase().includes('save'));
    if (saveBtn) {
      saveBtn.click();
      console.log('Save OK - To Email configure !');
    } else {
      console.log('Bouton Save non trouve. Verifie manuellement.');
    }
  }

  run();
})();
