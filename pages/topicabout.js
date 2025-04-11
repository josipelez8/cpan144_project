import React from "react";
import TopicAboutComponent from "../components/TopicAboutComponent";
import Layout from "../components/LayoutComponent";
import FooterComponent from "../components/FooterComponent";
import '../styles/styles.css'

const TopicAboutPage = () => {
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
          <TopicAboutComponent />
        </div>
      </div>
      <FooterComponent />
    </Layout>
  );
};

export default TopicAboutPage;