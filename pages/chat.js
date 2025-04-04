import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Message from '../components/MessageComponent'
import Layout from "../components/LayoutComponent";
import '../styles/styles.css'

const ChatPage = () => {
  const router = useRouter()
  const { contact } = router.query
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  localStorage.clear();

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]')
    setMessages(storedMessages)
  }, [])

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = { sender: 'You', content: message }
      const newMessages = [...messages, newMessage]
      setMessages(newMessages)
      localStorage.setItem('messages', JSON.stringify(newMessages))
      setMessage('')
    }
  }

  return (
    <Layout>
    <div className="background">
    
    <div className="page-container">
      <h1>Chat with {contact}</h1>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} content={msg.content} />
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>

    </div>
    </Layout>
  )
}

export default ChatPage