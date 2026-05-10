# DengueWatch AI Chatbot Setup Guide

## 🤖 Features

✅ Real-time chat with Groq API (Llama 3.1)  
✅ Specialized in dengue fever information for Metro Manila  
✅ Clean, mobile-responsive UI  
✅ Conversation history tracking  
✅ Loading animations & error handling  
✅ 5 starter questions for first-time users  

---

## 📋 Prerequisites

1. **Node.js** (v14+) installed
2. **Groq API Key** (free, no credit card needed)
3. **npm** or **yarn**

---

## 🔑 Step 1: Get Groq API Key

1. Go to [Groq Console](https://console.groq.com)
2. Create a free account
3. Navigate to **API Keys**
4. Create a new API key
5. Copy the key

---

## 📦 Step 2: Install Backend Dependencies

```bash
npm install express cors axios dotenv
```

**What each package does:**
- `express` - Web server framework
- `cors` - Handle cross-origin requests
- `axios` - Make HTTP requests to Groq API
- `dotenv` - Load environment variables from .env file

---

## 🔧 Step 3: Configure Environment Variables

Edit `.env` file in project root:

```env
GROQ_API_KEY=your_actual_api_key_here
PORT=5000
NODE_ENV=development
REACT_APP_API_URL=http://localhost:5000
```

⚠️ **IMPORTANT:** 
- Replace `your_actual_api_key_here` with your real Groq API key
- Never commit `.env` to git
- Add `.env` to `.gitignore`

---

## 🚀 Step 4: Start the Backend Server

From project root:

```bash
node server.js
```

Expected output:
```
🤖 DengueWatch AI Server running on http://localhost:5000
📡 Chat endpoint: POST /api/chat
```

---

## 💻 Step 5: Start the React Frontend

In a **new terminal** (keep backend running):

```bash
npm start
```

This starts React on `http://localhost:3000`

---

## ✅ Step 6: Test the Chatbot

1. Open browser to `http://localhost:3000`
2. Navigate to **Chat** page
3. Click a starter question or type a message
4. Send and see AI response!

---

## 🔍 Troubleshooting

### Error: "GROQ_API_KEY is not configured"
- Check your `.env` file has `GROQ_API_KEY=your_key`
- Restart `node server.js`
- Make sure you're not missing the key value

### Error: "Failed to connect to chat service"
- Check backend is running: `http://localhost:5000/api/health`
- Check `REACT_APP_API_URL` in `.env` is correct
- Check for CORS errors in browser console
- Verify port 5000 is not in use: `netstat -ano | findstr :5000` (Windows)

### Error: "Invalid GROQ_API_KEY"
- Your key is incorrect or expired
- Generate a new key from [Groq Console](https://console.groq.com)
- Update `.env` and restart server

### Chat takes too long to respond
- First request initializes the model (normal)
- Network latency to Groq API
- Check your internet connection

### Frontend not finding backend
- Make sure backend runs on port 5000
- Frontend `.env` has `REACT_APP_API_URL=http://localhost:5000`
- Restart React: `npm start`

---

## 📱 Mobile Responsive

The chatbot is fully responsive:
- ✅ Desktop: 2-column starter questions
- ✅ Mobile: 1-column starter questions, proper spacing
- ✅ Safe area padding on all screen sizes
- ✅ Auto-scroll to latest message

---

## 🎨 Customization

### Change Bot Personality

Edit `server.js` → `SYSTEM_PROMPT` variable:

```javascript
const SYSTEM_PROMPT = `Your custom system prompt here...`;
```

### Change Colors

Edit `src/pages/ChatPage.jsx` → Tailwind classes:
- `bg-navy` = User message background
- `bg-white` = AI message background
- `text-navy` = Header color

### Add More Starter Questions

Edit `ChatPage.jsx`:

```javascript
const STARTER_QUESTIONS = [
  'Question 1?',
  'Question 2?',
  // Add more...
];
```

---

## 📊 API Response Format

**Request to backend:**
```json
{
  "message": "What are dengue symptoms?",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ]
}
```

**Response from backend:**
```json
{
  "reply": "Dengue symptoms include..."
}
```

---

## 🔐 Security Notes

1. **Never commit `.env`** - Add to `.gitignore`
2. **Rotate API keys** if exposed
3. **Rate limiting** - Add to production `server.js` if needed
4. **HTTPS only** - Use HTTPS in production
5. **Input validation** - Backend validates message length & type

---

## 🚀 Production Deployment

### Backend (Example: Render/Railway)
```bash
# Add start script to package.json
"start": "node server.js"

# Set environment variable GROQ_API_KEY in platform dashboard
# Deploy to platform (Render, Railway, Heroku, etc.)
```

### Frontend (Example: Vercel)
```bash
# Update REACT_APP_API_URL to production backend URL
REACT_APP_API_URL=https://your-backend-domain.com

# Deploy to Vercel/Netlify
npm run build
```

---

## 📚 Resources

- [Groq API Docs](https://console.groq.com/docs/overview)
- [Llama 3.1 Model Card](https://huggingface.co/meta-llama/Llama-3.1-8B-Instant)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)

---

## 💡 Tips

- **First message slower**: Model initializes on first call
- **Conversation context**: Backend maintains chat history for context
- **Mobile-friendly**: Test on phone - scroll and input work smoothly
- **Rate limiting**: Groq free tier has limits, add checks if needed

---

**Questions?** Check backend logs with `node server.js` for detailed errors!
