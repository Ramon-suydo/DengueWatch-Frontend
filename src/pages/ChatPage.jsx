import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Loader } from 'lucide-react';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Suggested starter questions
  const STARTER_QUESTIONS = [
    'What are dengue symptoms?',
    'How to prevent dengue at home?',
    'Which city in Metro Manila has highest dengue risk?',
    'When is dengue season in Philippines?',
    'What is the 4S strategy?'
  ];

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message handler
  const sendMessage = async (messageText = null) => {
    const textToSend = messageText || input.trim();
    
    if (!textToSend) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError('');
    setLoading(true);

    try {
      // Call backend API
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message || 'Failed to connect to chat service. Make sure the backend is running.');
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-7rem)] bg-gradient-to-br from-sand to-sand/50">
      {/* Header */}
      <div className="border-b border-navy/10 bg-white shadow-soft">
        <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10">
            <MessageCircle size={20} className="text-navy" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-navy">DengueWatch AI</h1>
            <p className="text-xs text-ink/60">Dengue expert chatbot for Metro Manila</p>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-4">
        {messages.length === 0 ? (
          // Empty State
          <div className="flex h-full flex-col items-center justify-center gap-6 py-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy/10">
              <MessageCircle size={48} className="text-navy" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-navy mb-2">Hi, I'm DengueWatch AI!</h2>
              <p className="text-sm text-ink/70 mb-6">
                Ask me anything about dengue fever, prevention, or risks in Metro Manila.
              </p>
            </div>

            {/* Starter Questions */}
            <div className="w-full max-w-md space-y-2">
              <p className="text-xs text-ink/60 font-semibold text-center">Try asking:</p>
              <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
                {STARTER_QUESTIONS.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(question)}
                    disabled={loading}
                    className="rounded-lg border border-navy/20 bg-white px-3 py-2 text-sm text-navy hover:bg-navy/5 transition-colors disabled:opacity-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Messages
          <div className="space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs rounded-2xl px-4 py-3 sm:max-w-sm lg:max-w-md ${
                    message.role === 'user'
                      ? 'rounded-br-none bg-navy text-white shadow-md'
                      : 'rounded-bl-none border border-navy/10 bg-white text-ink shadow-soft'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-none border border-navy/10 bg-white px-4 py-3 shadow-soft">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-navy/60 animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-navy/60 animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="h-2 w-2 rounded-full bg-navy/60 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-navy/10 bg-white px-4 py-4 sm:px-6">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="Ask about dengue symptoms, prevention, risks..."
            className="flex-1 rounded-full border border-navy/10 bg-sand px-4 py-3 text-sm text-ink placeholder:text-ink/50 outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/10 disabled:bg-sand/50 disabled:cursor-not-allowed transition-all"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white hover:bg-navy/90 disabled:bg-navy/50 disabled:cursor-not-allowed transition-colors shadow-soft"
          >
            {loading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-ink/60 text-center">
          Always consult a doctor for medical advice.
        </p>
      </div>
    </main>
  );
}

export default ChatPage;
