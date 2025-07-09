
import './App.css'
import profilePic from './assets/websitephoto.jpg'
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function App() {

  return (
    <>
      <div>
        <img 
          src={profilePic} 
          alt="Nicole Cui" 
          style={{ 
            width: '200px', 
            height: '200px', 
            objectFit: 'cover', 
            borderRadius: '50%',
            objectPosition: '50% 20%',
          }}
        />
      </div>

      <h1 style={{ fontFamily: 'Azeret Mono, monospace', fontSize: 40 , fontWeight: 'normal', color: '#000000'}}>Nicole Cui</h1>
      <div className="card">
        <p>
        Hello! I am an undergraduate at Columbia University studying computer science & applied math.
        </p>
        <p>
          <b>Contact:</b> n.cui@columbia.edu
        </p>
        <a 
          href="https://github.com/nc0le" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '15px',
            margin: '10px',
            fontSize: '35px',
            color: '#000000'
          }}
        >
          <FaGithub />
        </a>

        <a 
          href="https://www.linkedin.com/in/nicole-cui/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            margin: '10px',
            fontSize: '35px',
            color: '#000000'
          }}
        >
          <FaLinkedin />
        </a>
      </div>
    </>
  )
}

export default App