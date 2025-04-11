import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ToastComponent from "./ToastComponent"; // Import the toast component
import "../styles/sidebar.css";

const pages = [
  { name: "Change Users", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "@Cute", path: "/topic?contact=Cute" },
  { name: "About @Cute", path: "/topicabout?contact=Cute" },

  { name: "@Sports", path: "/topic?contact=Sports" },
  { name: "About @Sports", path: "/topicabout?contact=Sports" },

  { name: "@Technology", path: "/topic?contact=Technology" },
  { name: "About @Technology", path: "/topicabout?contact=Technology" },

  { name: "@News", path: "/topic?contact=News" },
  { name: "About @News", path: "/topicabout?contact=News" },

  { name: "@Funny", path: "/topic?contact=Funny" },
  { name: "About @Funny", path: "/topicabout?contact=Funny" },
];

const LayoutComponent = ({ children }) => {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const handleShowToast = (event) => {
      setToastMessage(event.detail);
    };

    window.addEventListener("showToast", handleShowToast);
    return () => window.removeEventListener("showToast", handleShowToast);
  }, []);

  return (
    <div className="container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <img src="../assets/logo.png" width={128} height={128}></img>
        <h1></h1>
        <h2>Instant Connect</h2>
        <ul>
          {pages.map((page) => (
            <li key={page.path} className={router.pathname === page.path ? "active" : ""}>
              <Link href={page.path}>{page.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="content">
        {children}
      </main>

      {/* Toast Notification */}
      {toastMessage && <ToastComponent message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
};

export default LayoutComponent;