import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/styles.css'

// If logged in, go straight to contacts,
// otherwise you must log in!

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (!username) {
      router.push('/login')
    } else {
      router.push('/contacts')
    }
  }, [])

  return null
}

/*
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
    </div>
  );
}
*/