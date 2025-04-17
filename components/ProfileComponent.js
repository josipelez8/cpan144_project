import { useState, useEffect } from 'react';
import '../styles/profile.css'

const ProfileComponent = () => {
  const [name, setName] = useState('John Doe');
  const [birthday, setBirthday] = useState('1990-01-01');
  const [image, setImage] = useState('../assets/profile_default.jpg');
  const [color, setColor] = useState('#e0f7fa');

  // Update profile on first load
  useEffect(() => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (!token || !username) {
      return;
    }

    fetch('http://localhost:4000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, token: token, set: null }),
    })
    .then(res => res.json())
    .then(data => {
      setName(data.name);
      setBirthday(data.birthday);
      setColor(data.color);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }, []);

  // Send data to server to update profile
  const handleApplyClick = () => {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')
    if (!token || !username) {
      return;
    }

    fetch('http://localhost:4000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, token: token, set: {
        name: name,
        birthday: birthday,
        color: color
      } }),
    })
    .then(res => res.json())
    .then(data => {
      //setName(data.name);
      //setBirthday(data.birthday);
      //setColor(data.color);
      alert("Profile Updated Successfully!");
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };


  return (
    <div className="editor-container">
      <div className="form-grid">
        <div className="form-field">
          <label>Name<br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div className="form-field">
          <label>Birthday<br />
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </label>
        </div>

        <div className="form-field">
          <label>Save Changes<br />
          <button onClick={handleApplyClick} type="button" className="upload-button">Apply</button>
          </label>
        </div>

        <div className="form-field">
          <label>Background Color<br />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="preview-card" style={{ backgroundColor: color }}>
        <img
          src={image}
          alt="Profile Image"
          onError={(e) => (e.target.src = '../assets/profile_default.jpg')}
        />
        <div>
          <h2>{name}</h2>
          <p>Birthday: {birthday}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent