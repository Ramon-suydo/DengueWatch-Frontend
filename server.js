const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = (process.env.ALLOWED_ORIGINS || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000')).split(',').map(s => s.trim()).filter(Boolean);
if (allowedOrigins.includes('*') || (process.env.NODE_ENV === 'production' && !allowedOrigins.length)) throw new Error('Configure explicit ALLOWED_ORIGINS');
app.use(cors({ origin: (origin, cb) => cb(null, !origin || allowedOrigins.includes(origin)) }));
app.use('/api/chat', rateLimit({ windowMs: 60000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false, message: { error: 'Too many messages. Please try again later.' } }));
app.use(express.json({ limit: '32kb' }));

// System prompt for DengueWatch AI
const SYSTEM_PROMPT = `You are DengueWatch AI Assistant, a specialized chatbot for the DengueWatch AI application serving Metro Manila, Philippines. You help users understand dengue fever risks, symptoms, prevention, and treatment. You have knowledge about dengue patterns in NCR cities based on DOH 2016-2021 data:
- Dengue peak season: June-November
- Highest risk cities: Quezon City (35,280 cases), Manila City (13,048 cases), Paranaque (8,526 cases)
- Primary vector: Aedes aegypti mosquito
- 4S Strategy: Search and destroy, Self-protection, Seek early consultation, Say yes to fogging
Always recommend consulting a doctor for medical advice. Respond in English or Filipino based on user's language. Keep responses concise and helpful.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // Validate input
    if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
      return res.status(400).json({ error: 'Message must contain 1 to 2000 characters' });
    }

    if (!Array.isArray(history) || history.length > 10 || history.some(item => !item || !['user', 'assistant'].includes(item.role) || typeof item.content !== 'string' || item.content.length > 2000) || history.reduce((sum, item) => sum + item.content.length, 0) > 20000) {
      return res.status(400).json({ error: 'Invalid or oversized conversation history' });
    }
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY is not configured' });
    }

    // Build messages array with conversation history
    const messages = [
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ];

    // Call Groq API
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 512,
        top_p: 1
      },
      {
        timeout: 15000,
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid GROQ_API_KEY' });
    }
    
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (require.main === module) app.listen(PORT, () => {
  console.log(`🤖 DengueWatch AI Server running on http://localhost:${PORT}`);
  console.log(`📡 Chat endpoint: POST /api/chat`);
});

module.exports = app;
