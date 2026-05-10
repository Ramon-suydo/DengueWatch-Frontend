const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
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

app.listen(PORT, () => {
  console.log(`🤖 DengueWatch AI Server running on http://localhost:${PORT}`);
  console.log(`📡 Chat endpoint: POST /api/chat`);
});
