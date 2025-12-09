const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

// ✅ Route racine pour Render
app.get('/', (req, res) => {
    res.json({
        service: 'Chat Backend API',
        status: 'running',
        endpoints: {
            getMessages: 'GET /api/messages',
            addMessage: 'POST /api/messages',
            docs: '/api'
        }
    });
});

// ✅ Route info API
app.get('/api', (req, res) => {
    res.json({
        message: 'Chat API',
        version: '1.0.0',
        endpoints: [
            'GET /api/messages - Get all messages',
            'POST /api/messages - Add a new message'
        ]
    });
});

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
    res.status(201).json(newMessage);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend en écoute sur le port ${PORT}`));
