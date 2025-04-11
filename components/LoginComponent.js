import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push('/profile');
    /*
    
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    // Simulate a login attempt
    alert(`Logging in with email: ${email}`);
    setError('');

    */

  };

  return (
    <div className="background">
    <div className="login-container">
      <img src="../assets/logo.png" width={128} height={128}></img>
      <h1>Instant Connect</h1>
      <h2>CPAN144 Group Project by Josip Elez and Advit Virmani</h2>
      <br></br>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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