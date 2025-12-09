const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let messages = [
    { author: "Système", content: "Bienvenue dans le chat DevOps !", timestamp: new Date() }
];

// GET /api/messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// POST /api/messages
app.post('/api/messages', (req, res) => {
    const { author, content } = req.body;
    if (!author || !content) {
        return res.status(400).json({ error: 'Author et content requis' });
    }
    const newMessage = { author, content, timestamp: new Date() };
    messages.push(newMessage);
    if (messages.length > 50) messages = messages.slice(-50); // garder les 50 derniers
    res.status(201).json(newMessage);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend en écoute sur le port ${PORT}`));
