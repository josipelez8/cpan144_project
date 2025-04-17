import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginComponent = () => {
  const [email, setEmail] = useState('user1');
  const [password, setPassword] = useState('password1');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password: password }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.status === 200) {
        document.cookie = `username=${email}; path=/; max-age=86400`
        document.cookie = `token=${data.token}; path=/; max-age=86400`
        localStorage.setItem('username', email);
        localStorage.setItem('token', data.token);

        router.push('/profile');
      } else {
        setError(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleCookieResetClick = () => {
    //<button onClick={handleCookieResetClick}>Reset Cookies</button>
  };

  return (
    <div className="background">
    <div className="login-container">
      <img src="../assets/logo.png" width={128} height={128}></img>
      <h1>Instant Connect</h1>
      <h2>CPAN144 Group Project by Josip Elez and Advit Virmani</h2>
      <br></br>
      <p style={{ color: 'red' }}>{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="name"
            id="name"
            placeholder="Not implemented, type anything then press 'Login' to skip!"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Not implemented, type anything then press 'Login' to skip!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginComponent;