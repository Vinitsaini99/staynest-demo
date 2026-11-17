import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { chatbotAnswers } from '../../data/mockData'

const questions = Object.keys(chatbotAnswers)

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi — I am StayNest Assist. Choose a question for a quick answer.' },
  ])

  const ask = (q) => {
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: q },
      { from: 'bot', text: chatbotAnswers[q] },
    ])
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg md:bottom-6 md:right-6"
        aria-label="Open assistant"
      >
        <MessageCircle size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-36 right-4 z-50 flex h-[420px] w-[min(100vw-2rem,340px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl md:bottom-24 md:right-6"
          >
            <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-white">
              <div>
                <p className="font-heading text-sm font-bold">StayNest Assist</p>
                <p className="text-[11px] text-white/55">Product demo support</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-white/10">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    m.from === 'bot' ? 'bg-bg text-text' : 'ml-auto bg-primary text-white'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="border-t border-border p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {questions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => ask(q)}
                    className="rounded-lg border border-border bg-bg px-2.5 py-1 text-[11px] font-medium text-text hover:border-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <a
                href="mailto:hello@staynest.co"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-2 text-sm font-semibold text-white"
              >
                <Send size={13} /> Contact Support
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
