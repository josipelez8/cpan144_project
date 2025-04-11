import React from "react";
import ProfileComponent from "../components/ProfileComponent";
import Layout from "../components/LayoutComponent";
import FooterComponent from "../components/FooterComponent";
import '../styles/styles.css'

const ProfilePage = () => {
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
          <ProfileComponent />
        </div>
      </div>
      <FooterComponent />
    </Layout>
  );
};

export default ProfilePage;