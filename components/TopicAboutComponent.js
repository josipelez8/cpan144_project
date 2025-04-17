import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import '../styles/topicabout.css'

const TopicAboutComponent = () => {
  const router = useRouter()
  const { contact } = router.query
  const [desc, setDesc] = useState("");

  useEffect(() => {
      console.log("Getting description...");

      const username = localStorage.getItem('username')
      const token = localStorage.getItem('token')
      if (token && username) {
        // load topics from server
        fetch('http://localhost:4000/api/topic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username, token: token, topic: contact, action: "getTopicsAbout" }),
        })
        .then(res => res.json())
        .then(data => {
          setDesc(data.desc);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }, [router.query, router.isReady]);

  return (
    <div className="editor-container">
      <h1>About { contact }</h1>
      <p>{ desc }</p>
    </div>
  );
}

export default TopicAboutComponent