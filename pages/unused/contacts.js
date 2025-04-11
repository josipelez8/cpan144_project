import React from "react";
import ContactsComponent from "../components/ContactsComponent";
import Layout from "../components/LayoutComponent";

const ContactsPage = () => {
  const showToast = (message) => {
    window.dispatchEvent(new CustomEvent("showToast", { detail: message }));
  };

  return (
    <Layout>
      <div className="background">
        <div>
          {/* Trigger Toast (lift states) */}
          <button onClick={() => showToast("New Message Received!")}>
            Show Toast Test
          </button>
        </div>

        <div className="page-container">
          <ContactsComponent />
        </div>
      </div>
    </Layout>
  );
};

export default ContactsPage;