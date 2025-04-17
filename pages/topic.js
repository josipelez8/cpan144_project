import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Message from '../components/MessageComponent'
import Layout from "../components/LayoutComponent";
import FooterComponent from "../components/FooterComponent";
import '../styles/styles.css'

const TopicPage = () => {
  const router = useRouter()
  const { contact } = router.query
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  //localStorage.clear();

  useEffect(() => {
    //const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]')
    //setMessages(storedMessages)
    setMessages([]);

    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (token && username) {
      // load topics from server
      fetch('http://localhost:4000/api/topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, token: token, topic: contact, action: "getmsg"}),
      })
      .then(res => res.json())
      .then(data => {
        setMessages(data.comments || []);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    const interval = setInterval(() => {
      //console.log("Checking for messages");
      const username = localStorage.getItem('username')
      const token = localStorage.getItem('token')
      if (token && username) {
        // load topics from server
        fetch('http://localhost:4000/api/topic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, token: token, topic: contact, action: "getmsg"}),
        })
        .then(res => res.json())
        .then(data => {
          setMessages(data.comments || []);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [router.query, router.isReady])

  const handleSend = () => {
    if (message.trim()) {
      //const newMessage = { sender: localStorage.getItem('username'), content: message }
      //const newMessages = [...messages, newMessage]
      //setMessages(newMessages)
      //localStorage.setItem('messages', JSON.stringify(newMessages))
      setMessage('')

      const username = localStorage.getItem('username')
      const token = localStorage.getItem('token')
      if (token && username) {
        // load topics from server
        fetch('http://localhost:4000/api/topic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, token: token, topic: contact, action: "sendmsg", text: message }),
        })
        .then(res => res.json())
        .then(data => {
          setMessages(data.comments || []);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }
  }

  return (
    <Layout>
    <div className="background">
    
    <div className="topic-container">
      <h1>Chat about {contact}</h1>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.name} content={msg.text} usercolor={msg.color} />
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
    <FooterComponent />
    </Layout>
  )
}

export default TopicPage