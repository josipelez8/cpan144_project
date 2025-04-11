import { useRouter } from 'next/router'
import { useState } from 'react';
import '../styles/topicabout.css'

const TopicAboutComponent = () => {
  const router = useRouter()
  const { contact } = router.query

  return (
    <div className="editor-container">
      <h1>Topic About { contact }</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  );
}

export default TopicAboutComponent