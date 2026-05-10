# 🚀 Quick Start Checklist

## Files Created/Modified:

### ✅ Created:
- `server.js` - Backend chat API
- `.env` - Environment configuration
- `CHATBOT_SETUP.md` - Full setup guide

### ✅ Modified:
- `src/pages/ChatPage.jsx` - Full chatbot UI
- `.gitignore` - Added .env to ignore list

---

## ⚡ Quick Setup (5 minutes):

### 1️⃣ Install Backend Dependencies
```bash
npm install express cors axios dotenv
```

### 2️⃣ Get Free Groq API Key
- Go to https://console.groq.com
- Sign up (free, no credit card)
- Get your API key

### 3️⃣ Add API Key to `.env`
Edit `.env`:
```
GROQ_API_KEY=your_key_here
```

### 4️⃣ Start Backend (Terminal 1)
```bash
node server.js
```
Should see: `🤖 DengueWatch AI Server running on http://localhost:5000`

### 5️⃣ Start Frontend (Terminal 2)
```bash
npm start
```
Should open `http://localhost:3000`

### 6️⃣ Test It!
- Go to Chat page
- Click a starter question
- See AI respond! 🎉

---

## 📋 Complete File Overview:

### `server.js` (Backend)
```javascript
- POST /api/chat endpoint
- Accepts: { message, history }
- Calls Groq API with system prompt
- Returns: { reply }
```

**Features:**
- ✅ Error handling & validation
- ✅ Conversation history
- ✅ Health check endpoint
- ✅ Environment variable support

---

### `ChatPage.jsx` (Frontend)
```jsx
- Real-time message input
- Auto-scroll to latest message
- 5 starter questions
- Loading animation
- Error messages
- Mobile responsive
```

**Features:**
- ✅ Send on Enter or button
- ✅ User messages: navy/right
- ✅ AI messages: white/left
- ✅ Clean, modern design
- ✅ Empty state with welcome

---

### `.env`
```
GROQ_API_KEY=...
PORT=5000
REACT_APP_API_URL=http://localhost:5000
```

---

## 🎯 What's Happening:

1. **User** types message in ChatPage.jsx
2. **Frontend** sends to `POST /api/chat`
3. **Backend** adds system prompt + history
4. **Groq API** processes with Llama 3.1
5. **Backend** returns reply
6. **Frontend** displays in chat bubble

---

## ⚠️ Common Issues:

| Issue | Fix |
|-------|-----|
| "Cannot find module" | Run `npm install express cors axios dotenv` |
| "GROQ_API_KEY not configured" | Add key to `.env`, restart server |
| "Connection refused" | Start backend: `node server.js` |
| No responses | Check internet, valid API key |

---

## 🔐 Security:

- `.env` is in `.gitignore` ✅
- Never commit API keys ✅
- All validation on backend ✅
- CORS configured ✅

---

## 📱 Works On:

- ✅ Desktop (Chrome, Firefox, Safari)
- ✅ Tablet (iPad, Android)
- ✅ Mobile (iPhone, Android phones)
- ✅ Responsive: 1 col mobile, 2 col desktop

---

## 🎓 Customization:

### Change Bot Personality
Edit `server.js` line ~12:
```javascript
const SYSTEM_PROMPT = `Your custom instructions...`;
```

### Add More Starter Questions
Edit `ChatPage.jsx` line ~31:
```javascript
const STARTER_QUESTIONS = [
  'New question?',
  // ...
];
```

### Change Colors
Edit `ChatPage.jsx` Tailwind classes:
```jsx
bg-navy      // User messages
bg-white     // AI messages
border-navy  // Borders
```

---

## 📞 Need Help?

1. Check `CHATBOT_SETUP.md` for detailed guide
2. Check browser console for errors (F12)
3. Check server logs: `node server.js`
4. Verify `.env` has your actual Groq key

---

**You're all set! Happy chatting! 🎉**
