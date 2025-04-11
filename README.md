## CPAN144 PROJECT

# Components
FooterComponent: The footer that shows copyright info.<br/>
LayoutComponent: The sidebar that shows quick links to other chatrooms.<br/>
LoginComponent: Allows you to login to the site.<br/>
MessageComponent: Each displays a name and message.<br/>
ProfileComponent: Allows you to modify and preview your profile.<br/>
ToastComponent: A toast to notify you if a chatroom updates.<br/>
TopicAboutComponent: Shows what each chatroom is about.<br/>

# Routes
/index -> /login -> /profile<br/>
/topic?contact=TOPIC<br/>
/topicabout?contact=TOPIC<br/>

# States
Chatroom:<br/>
const [message, setMessage] = useState('') - Each messages<br/>
const [messages, setMessages] = useState([]) - Holds all the messages<br/>

Profile:<br/>
const [name, setName] = useState('John Doe');<br/>
const [birthday, setBirthday] = useState('1990-01-01');<br/>
const [image, setImage] = useState('../assets/profile_default.jpg');<br/>
const [color, setColor] = useState('#e0f7fa');<br/>