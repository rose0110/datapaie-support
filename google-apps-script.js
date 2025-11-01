/**
 * Script Google Apps Script pour gérer les soumissions du formulaire de contact
 * 
 * INSTRUCTIONS D'INSTALLATION :
 * 
 * 1. Créez un nouveau Google Sheets pour stocker les demandes de contact
 * 2. Allez dans Extensions > Apps Script
 * 3. Copiez-collez ce code dans l'éditeur
 * 4. Modifiez les variables ci-dessous selon vos besoins
 * 5. Cliquez sur "Déployer" > "Nouveau déploiement"
 * 6. Sélectionnez "Application Web"
 * 7. Accès : "Tout le monde"
 * 8. Copiez l'URL du déploiement et collez-la dans script.js (variable GOOGLE_SCRIPT_URL)
 */

// ========== CONFIGURATION ==========

// Email de notification (où recevoir les demandes)
const EMAIL_NOTIFICATION = 'rose.yemeli@yso-conseils.com';

// Nom de l'onglet dans Google Sheets où stocker les demandes
const SHEET_NAME = 'Demandes Contact';

// ===================================

/**
 * Fonction appelée lors de la soumission du formulaire
 */
function doPost(e) {
  try {
    // Récupérer les données du formulaire
    const data = JSON.parse(e.postData.contents);
    
    // Enregistrer dans Google Sheets
    enregistrerDansSheets(data);
    
    // Envoyer l'email de notification
    envoyerEmailNotification(data);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erreur:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Enregistrer les données dans Google Sheets
 */
function enregistrerDansSheets(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Créer l'onglet s'il n'existe pas
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Ajouter les en-têtes
    sheet.appendRow([
      'Date',
      'Email',
      'Nom',
      'Téléphone',
      'Statut',
      'Type de Demande',
      'Message',
      'Traité'
    ]);
    
    // Formater les en-têtes
    const headerRange = sheet.getRange(1, 1, 1, 8);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
  }
  
  // Ajouter la nouvelle demande
  sheet.appendRow([
    data.date,
    data.email,
    data.nom,
    data.telephone,
    data.statut,
    data.type_demande,
    data.message,
    'Non' // Statut "Traité"
  ]);
  
  // Auto-ajuster les colonnes
  sheet.autoResizeColumns(1, 8);
}

/**
 * Envoyer un email de notification
 */
function envoyerEmailNotification(data) {
  const subject = `[DataPaie Support] Nouvelle demande - ${data.type_demande}`;
  
  const htmlBody = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #1e293b; }
          .value { color: #475569; margin-top: 5px; }
          .message-box { background: white; padding: 15px; border-left: 4px solid #2563eb; margin-top: 10px; }
          .footer { background: #1e293b; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          .badge { display: inline-block; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
          .badge-essai { background: #fef3c7; color: #92400e; }
          .badge-starter { background: #dbeafe; color: #1e40af; }
          .badge-pro { background: #dcfce7; color: #166534; }
          .badge-vip { background: #fce7f3; color: #9f1239; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 Nouvelle Demande de Support</h2>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">📅 Date et Heure</div>
              <div class="value">${data.date}</div>
            </div>
            
            <div class="field">
              <div class="label">👤 Nom</div>
              <div class="value">${data.nom}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email de Connexion</div>
              <div class="value">${data.email}</div>
            </div>
            
            <div class="field">
              <div class="label">📞 Téléphone</div>
              <div class="value">${data.telephone}</div>
            </div>
            
            <div class="field">
              <div class="label">🏷️ Statut Client</div>
              <div class="value">
                <span class="badge badge-${data.statut}">${getStatutLabel(data.statut)}</span>
              </div>
            </div>
            
            <div class="field">
              <div class="label">📋 Type de Demande</div>
              <div class="value">${getTypeDemandeLabel(data.type_demande)}</div>
            </div>
            
            <div class="field">
              <div class="label">💬 Message</div>
              <div class="message-box">${data.message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>Cette demande a été enregistrée dans votre Google Sheets.</p>
            <p>Pensez à répondre rapidement au client !</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  const plainBody = `
Nouvelle Demande de Support - DataPaie

Date: ${data.date}
Nom: ${data.nom}
Email: ${data.email}
Téléphone: ${data.telephone}
Statut: ${getStatutLabel(data.statut)}
Type de Demande: ${getTypeDemandeLabel(data.type_demande)}

Message:
${data.message}

---
Cette demande a été enregistrée dans votre Google Sheets.
  `;
  
  MailApp.sendEmail({
    to: EMAIL_NOTIFICATION,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody
  });
}

/**
 * Convertir le code statut en label lisible
 */
function getStatutLabel(statut) {
  const labels = {
    'essai': 'En période d\'essai',
    'starter': 'Client STARTER',
    'pro': 'Client PRO',
    'vip': 'Client VIP'
  };
  return labels[statut] || statut;
}

/**
 * Convertir le code type de demande en label lisible
 */
function getTypeDemandeLabel(type) {
  const labels = {
    'technique': 'Question technique',
    'accompagnement': 'Accompagnement à la mise en place du dossier',
    'service': 'Demande de service supplémentaire',
    'facturation': 'Question sur ma facturation',
    'autre': 'Autre'
  };
  return labels[type] || type;
}

/**
 * Fonction de test (à exécuter manuellement pour tester)
 */
function testFormulaire() {
  const testData = {
    date: new Date().toLocaleString('fr-FR'),
    email: 'test@exemple.fr',
    nom: 'Test Utilisateur',
    telephone: '06 12 34 56 78',
    statut: 'starter',
    type_demande: 'technique',
    message: 'Ceci est un message de test pour vérifier que le système fonctionne correctement.'
  };
  
  enregistrerDansSheets(testData);
  envoyerEmailNotification(testData);
  
  Logger.log('Test terminé avec succès !');
}
