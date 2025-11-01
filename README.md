# Site Support DataPaie - Documentation Complète

## 📋 Vue d'Ensemble

Ce site support est conçu pour assister vos clients dans l'utilisation du logiciel OpenPaye. Il se concentre uniquement sur le **support client** et redirige vers votre site principal (datapaie.com) pour les outils, simulateurs et tarifs.

---

## 📦 Contenu du Package

### Pages HTML
- **`index.html`** : Page d'accueil avec vidéos de prise en main
- **`documentation.html`** : Liens vers la documentation OpenPaye et vidéos tutoriels
- **`faq.html`** : Questions fréquentes avec système d'accordéon
- **`contact.html`** : Formulaire de contact + WhatsApp + Chat

### Fichiers de Style et Scripts
- **`styles.css`** : Feuille de style complète (design professionnel, responsive)
- **`main.js`** : Script JavaScript pour le menu mobile et interactions
- **`google-apps-script.js`** : Script pour gérer les soumissions du formulaire de contact

### Documentation
- **`README_FINAL.md`** : Ce fichier

---

## 🎯 Architecture du Site

### Pages Locales (Hébergées sur votre serveur support)
1. **Accueil** : Vidéos de prise en main + accès rapide
2. **Documentation** : Liens vers OpenPaye Academy
3. **FAQ** : Questions spécifiques au support DataPaie
4. **Contact** : Formulaire + WhatsApp + Chatbot

### Redirections vers datapaie.com
- **Outils** → `https://www.datapaie.com/outils`
- **Tarifs** → `https://www.datapaie.com/#tarifs`

---

## 🚀 Installation

### 1. Hébergement

Vous pouvez héberger ce site sur :
- **Votre propre serveur** (Apache, Nginx)
- **GitHub Pages** (gratuit)
- **Netlify** (gratuit)
- **Vercel** (gratuit)

### 2. Déploiement Simple

```bash
# Décompresser l'archive
unzip site_support_datapaie_final.zip -d support

# Uploader les fichiers sur votre serveur
# Exemple avec FTP, SFTP ou panneau d'administration
```

### 3. Configuration DNS

Créez un sous-domaine pour votre site support :
- `support.datapaie.com` → Pointe vers votre serveur

---

## ⚙️ Configuration Nécessaire

### 1. Intégrer les Vidéos OpenPaye

Dans `index.html` et `documentation.html`, remplacez les placeholders par les vraies vidéos :

```html
<!-- Remplacer -->
<div class="video-placeholder">
    ...
</div>

<!-- Par -->
<iframe 
    src="URL_DE_LA_VIDEO_OPENPAYE" 
    width="100%" 
    height="315" 
    frameborder="0" 
    allowfullscreen>
</iframe>
```

**Vidéos à intégrer (Module 1 - OpenPaye Academy) :**
1. Préparer son dossier (02:58)
2. Création des salariés et des contrats de travail (04:10)
3. Calculer les premiers bulletins (02:04)
4. Saisie des éléments variables (05:04)
5. Suppression et recalcul des bulletins (02:25)
6. Impression et envoi des bulletins (00:56)
7. Payer les salariés (01:24)

---

### 2. Configurer le Chatbot Tawk.to

1. Créez un compte gratuit sur [tawk.to](https://www.tawk.to/)
2. Créez un nouveau site/propriété
3. Copiez votre ID Tawk (format : `XXXXXXXXXXXXXXX/default`)
4. Remplacez dans **toutes les pages HTML** :

```javascript
// Ligne à modifier dans chaque page
s1.src='https://embed.tawk.to/VOTRE_ID_TAWK/default';
```

---

### 3. Configurer le Formulaire de Contact

#### Étape 1 : Créer le Google Apps Script

1. Allez sur [script.google.com](https://script.google.com/)
2. Créez un nouveau projet
3. Copiez le contenu de `google-apps-script.js`
4. Modifiez l'email de notification :
   ```javascript
   const EMAIL_NOTIFICATION = 'rose.yemeli@yso-conseils.com';
   ```
5. Déployez le script :
   - Cliquez sur "Déployer" → "Nouveau déploiement"
   - Type : "Application Web"
   - Accès : "Tout le monde"
   - Copiez l'URL du déploiement

#### Étape 2 : Mettre à jour contact.html

Dans `contact.html`, ligne ~265, remplacez :

```javascript
const response = await fetch('VOTRE_URL_GOOGLE_APPS_SCRIPT', {
```

Par votre vraie URL Google Apps Script.

---

### 4. Configurer WhatsApp

Dans `contact.html`, ligne ~335, remplacez :

```html
<a href="https://wa.me/33XXXXXXXXX" target="_blank" class="btn btn-outline">Ouvrir WhatsApp</a>
```

Par votre vrai numéro WhatsApp (format international, sans + ni espaces).

**Exemple :** `https://wa.me/33612345678`

---

## 🎨 Personnalisation

### Couleurs

Dans `styles.css`, modifiez les variables CSS (lignes 1-10) :

```css
:root {
    --primary-color: #2563eb;     /* Bleu principal */
    --secondary-color: #1e40af;   /* Bleu foncé */
    --accent-color: #f59e0b;      /* Orange accent */
    /* ... */
}
```

### Logo

Remplacez le texte "DataPaie" dans le header par votre logo :

```html
<!-- Dans toutes les pages, remplacer -->
<div class="logo">
    <h1>DataPaie</h1>
    <span class="tagline">Support & Assistance</span>
</div>

<!-- Par -->
<div class="logo">
    <img src="votre-logo.png" alt="DataPaie Logo" height="50">
</div>
```

---

## 📧 Notifications par Email

Toutes les soumissions du formulaire de contact envoient un email à :
- **`rose.yemeli@yso-conseils.com`**

Le format de l'email :

```
Sujet : Nouvelle demande de support - [Type de demande]

Contenu :
- Email de connexion : xxx
- Nom : xxx
- Téléphone : xxx
- Statut : xxx
- Type de demande : xxx
- Message : xxx
- Date : xxx
```

---

## 🔒 Sécurité

### Données Sensibles

- ❌ **Ne jamais** stocker de mots de passe ou données bancaires
- ✅ Toutes les soumissions sont envoyées via HTTPS
- ✅ Les données sont stockées dans Google Sheets (sécurisé)

### RGPD

Ajoutez une mention de confidentialité dans le formulaire de contact :

```html
<p style="font-size: 12px; color: #666;">
    En soumettant ce formulaire, vous acceptez que vos données soient utilisées 
    pour traiter votre demande. <a href="https://www.datapaie.com/confidentialite">
    Politique de confidentialité</a>
</p>
```

---

## 🧪 Test du Site

### Test Local

```bash
# Démarrer un serveur local
python3 -m http.server 8000

# Ouvrir dans le navigateur
http://localhost:8000/index.html
```

### Test en Ligne

Une fois déployé, testez :
1. ✅ Navigation entre les pages
2. ✅ Redirections vers datapaie.com (Outils, Tarifs)
3. ✅ Formulaire de contact (envoi d'un test)
4. ✅ Chatbot Tawk.to (ouverture)
5. ✅ WhatsApp (redirection)
6. ✅ Responsive (mobile, tablette)

---

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à :
- 📱 Mobile (< 768px)
- 📱 Tablette (768px - 1024px)
- 💻 Desktop (> 1024px)

---

## 🆘 Support et Maintenance

### Mises à Jour Fréquentes

- **FAQ** : Ajoutez de nouvelles questions au fur et à mesure
- **Vidéos** : Mettez à jour si OpenPaye change d'interface
- **Liens** : Vérifiez régulièrement que les redirections fonctionnent

### Problèmes Courants

**Le formulaire ne fonctionne pas**
→ Vérifiez que l'URL Google Apps Script est correcte

**Le chatbot n'apparaît pas**
→ Vérifiez votre ID Tawk.to dans le code

**Les vidéos ne s'affichent pas**
→ Vérifiez que les URLs des vidéos OpenPaye sont correctes

---

## 📊 Analytics (Optionnel)

Pour suivre les visites, ajoutez Google Analytics :

```html
<!-- Dans le <head> de chaque page -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎯 Prochaines Étapes

1. ✅ Déployer le site sur votre serveur
2. ✅ Configurer Tawk.to
3. ✅ Configurer Google Apps Script
4. ✅ Intégrer les vidéos OpenPaye
5. ✅ Tester toutes les fonctionnalités
6. ✅ Ajouter le lien dans les emails de bienvenue aux nouveaux clients

---

## 📞 Contact

Pour toute question sur ce site support :
- Email : rose.yemeli@yso-conseils.com
- Site : https://www.datapaie.com

---

**Créé avec ❤️ pour DataPaie**  
Version 1.0 - Novembre 2025
