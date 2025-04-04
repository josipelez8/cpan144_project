import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ToastComponent from "./ToastComponent"; // Import the toast component
import "../styles/sidebar.css";

const pages = [
  { name: "Home", path: "/" },
  { name: "Contacts", path: "/contacts" },
  { name: "@John (online)", path: "/chat?contact=John" },
  { name: "@Jane (online)", path: "/chat?contact=Jane" },
  { name: "@Alice (online)", path: "/chat?contact=Alice" },
  { name: "@Bob (online)", path: "/chat?contact=Bob" },
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