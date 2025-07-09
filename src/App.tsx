import './App.css'
import profilePic from './assets/websitephoto.jpg'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react'
import TerminalEmulator from './Terminal';

function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  if (showTerminal) {
    return (
      <div style={{ padding: '4rem', overflow: 'hidden' }}>
        <button
          onClick={() => setShowTerminal(false)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
            padding: '8px 12px',
            backgroundColor: 'transparent', 
            color: '#000',
            border: '1px solid #000', // Black border
            borderRadius: '5px',
            cursor: 'pointer',
            fontFamily: 'Azeret Mono, monospace',
            fontSize: '14px',
            fontWeight: 'normal'
          }}
        >
          Close Terminal
        </button>
        <TerminalEmulator />
      </div>
    );
  }

  return (
    <div style={{ padding: '4rem'}}>
      {/* Top-left terminal toggle button */}
      <button
        onClick={() => setShowTerminal(true)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          padding: '8px 12px',
          backgroundColor: 'transparent', 
          color: '#000',
          border: '1px solid #000', // Black border
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Azeret Mono, monospace',
          fontSize: '14px',
          fontWeight: 'normal'
        }}
      >
        Open Terminal
      </button>

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
    </div>
  )
}

export default App