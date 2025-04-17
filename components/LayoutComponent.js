import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ToastComponent from "./ToastComponent";
import "../styles/sidebar.css";

let topics = {};

const LayoutComponent = ({ children }) => {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    try {
      topics = JSON.parse(localStorage.getItem('topics')) || {};
    } catch (e) {
      topics = {};
    }

    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (token && username) {
      // load topics from server
      fetch('http://localhost:4000/api/topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, token: token, action: "getTopics" }),
      })
      .then(res => res.json())
      .then(data => {
        topics = data;
        localStorage.setItem('topics', JSON.stringify(data) );
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    const handleShowToast = (event) => setToastMessage(event.detail);
    window.addEventListener("showToast", handleShowToast);
    return () => window.removeEventListener("showToast", handleShowToast);
  }, []);

  /*
    <li className={router.pathname === "/" ? "active" : ""}>
            <Link href="/">Change Users</Link>
          </li>
  */

  return (
    <div className="container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <img src="../assets/logo.png" width={128} height={128} alt="Logo" />
        <h2>Instant Connect</h2>
        <ul>
          <li className={router.pathname === "/profile" ? "active" : ""}>
            <Link href="/profile">Profile</Link>
          </li>

          {Object.keys(topics).map((topic) => (
            <li key={topic}>
              <div className="link-pair">
                <Link
                  href={`/topic?contact=${topic}`}
                  className={
                    router.pathname === "/topic" &&
                    router.query.contact === topic
                      ? "active"
                      : ""
                  }
                >
                  @{topic}
                </Link>
                <Link
                  href={`/topicabout?contact=${topic}`}
                  className={
                    router.pathname === "/topicabout" &&
                    router.query.contact === topic
                      ? "active"
                      : ""
                  }
                >
                  About
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="content">{children}</main>

      {/* Toast Notification */}
      {toastMessage && (
        <ToastComponent message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
};

export default LayoutComponent;
