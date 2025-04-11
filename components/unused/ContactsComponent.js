import Link from 'next/link'
import '../styles/styles.css'

const ContactsComponent = () => {
  const contacts = ['John', 'Jane', 'Alice', 'Bob']

  return (
    <div className="contact-list">
      <h1>Contacts</h1>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <Link href={`/chat?contact=${contact}`}>
              {contact}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContactsComponent