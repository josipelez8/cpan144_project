import { useState } from 'react';
import '../styles/profile.css'

const ProfileComponent = () => {
  const [name, setName] = useState('John Doe');
  const [birthday, setBirthday] = useState('1990-01-01');
  const [image, setImage] = useState('../assets/profile_default.jpg');
  const [color, setColor] = useState('#e0f7fa');

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
          <label>Image URL<br />
          <button type="button" className="upload-button">
              Choose File
            </button>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
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