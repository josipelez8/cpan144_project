'use client';

import { useState } from 'react';

export default function Test() {
  const [response, setResponse] = useState(null);

  const sendData = async () => {
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: "pootis", password: "spenser" }),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div>
      <button onClick={sendData}>Send Data</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}