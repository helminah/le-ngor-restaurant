function doPost(e) {
  const params = e.parameter;
  
  const nom = params.nom || 'Non renseigne';
  const tel = params.tel || 'Non renseigne';
  const email = params.email || 'Non renseigne';
  const date = params.date || 'Non renseigne';
  const convives = params.convives || 'Non renseigne';
  const occasion = params.occasion || 'Non renseigne';
  const message = params.message || 'Aucune';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nouvelle reservation - Le Ngor</title>
</head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:Georgia,'Times New Roman',serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);max-width:90%;">

<!-- HEADER -->
<tr><td style="background:#1a5f3f;padding:30px;text-align:center;">
<h1 style="color:#c9a84c;margin:0;font-size:28px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Le Ngor</h1>
<p style="color:#f5f0e8;margin:8px 0 0;font-size:14px;font-style:italic;">Restaurant · Plage de Ngor</p>
</td></tr>

<!-- TITRE -->
<tr><td style="padding:30px 30px 0;">
<h2 style="color:#1a5f3f;margin:0;font-size:22px;font-weight:bold;">Nouvelle reservation</h2>
<p style="color:#888;margin:5px 0 0;font-size:14px;">Recue via le site internet</p>
</td></tr>

<!-- TABLEAU -->
<tr><td style="padding:20px 30px;">
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:8px;overflow:hidden;">

<tr>
<td style="padding:14px 16px;background:#f8f6f1;width:35%;color:#1a5f3f;font-weight:bold;font-size:14px;border-bottom:1px solid #eee;">Nom</td>
<td style="padding:14px 16px;background:#f8f6f1;color:#333;font-size:14px;border-bottom:1px solid #eee;">${escapeHtml(nom)}</td>
</tr>

<tr>
<td style="padding:14px 16px;width:35%;color:#1a5f3f;font-weight:bold;font-size:14px;border-bottom:1px solid #eee;">Telephone</td>
<td style="padding:14px 16px;color:#333;font-size:14px;border-bottom:1px solid #eee;">${escapeHtml(tel)}</td>
</tr>

<tr>
<td style="padding:14px 16px;background:#f8f6f1;width:35%;color:#1a5f3f;font-weight:bold;font-size:14px;border-bottom:1px solid #eee;">Email</td>
<td style="padding:14px 16px;background:#f8f6f1;color:#333;font-size:14px;border-bottom:1px solid #eee;">${escapeHtml(email)}</td>
</tr>

<tr>
<td style="padding:14px 16px;width:35%;color:#1a5f3f;font-weight:bold;font-size:14px;border-bottom:1px solid #eee;">Date & Heure</td>
<td style="padding:14px 16px;color:#333;font-size:14px;border-bottom:1px solid #eee;">${escapeHtml(date)}</td>
</tr>

<tr>
<td style="padding:14px 16px;background:#f8f6f1;width:35%;color:#1a5f3f;font-weight:bold;font-size:14px;border-bottom:1px solid #eee;">Convives</td>
<td style="padding:14px 16px;background:#f8f6f1;color:#333;font-size:14px;border-bottom:1px solid #eee;">${escapeHtml(convives)} personnes</td>
</tr>

<tr>
<td style="padding:14px 16px;width:35%;color:#1a5f3f;font-weight:bold;font-size:14px;border-bottom:1px solid #eee;">Occasion</td>
<td style="padding:14px 16px;color:#333;font-size:14px;border-bottom:1px solid #eee;">${escapeHtml(occasion)}</td>
</tr>

</table>
</td></tr>

<!-- MESSAGE -->
<tr><td style="padding:0 30px 20px;">
<p style="color:#1a5f3f;font-weight:bold;font-size:14px;margin:0 0 10px;">Demande speciale :</p>
<div style="background:#f8f6f1;border-left:4px solid #c9a84c;padding:15px;color:#555;font-size:14px;line-height:1.6;border-radius:0 8px 8px 0;">
${escapeHtml(message).replace(/\n/g, '<br>')}
</div>
</td></tr>

<!-- BOUTON APPELER -->
<tr><td style="padding:0 30px 30px;text-align:center;">
<a href="tel:${encodeURIComponent(tel)}" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:15px;letter-spacing:0.5px;">Appeler le client</a>
</td></tr>

<!-- FOOTER -->
<tr><td style="background:#1a5f3f;padding:20px 30px;text-align:center;">
<p style="color:#f5f0e8;margin:0;font-size:13px;">Le Ngor · Restaurant | Ngor, Senegal</p>
<p style="color:#c9a84c;margin:5px 0 0;font-size:12px;">Cette reservation a ete envoyee via restaurantlengor.sn</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  GmailApp.sendEmail(
    'contact@restaurantlengor.sn',
    'Nouvelle reservation - Le Ngor | ' + escapeHtml(nom),
    'Nouvelle reservation de ' + nom + ' pour ' + convives + ' personnes le ' + date + '. Tel: ' + tel,
    {
      htmlBody: htmlBody,
      name: 'Le Ngor Restaurant',
      replyTo: email !== 'Non renseigne' ? email : undefined
    }
  );

  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: 'Reservation envoyee' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doGet(e) {
  return doPost(e);
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
