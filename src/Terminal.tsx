import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import './App.css';

export default function TerminalEmulator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const term = useRef<Terminal | null>(null)

  let cwd = '~';
  function setCwd(newCwd: string){
    cwd = newCwd;
  }

  let input = ''

  const fileSystem = {
    '~': {
        'about.txt': `+----------------------------------------------+\r\n| These folders contain an overview of my work |\r\n| All code: https://github.com/nc0le           |\r\n+----------------------------------------------+`,
        research:{
            'knowles-lab.txt':
                "\r\n"+
                "\x1b[38;2;203;166;247m+----------------------------------------------------------+\x1b[0m\r\n" +
                "\x1b[1;38;2;203;166;247m|  Knowles Lab @ Columbia / New York Genome Center (2025)  |\x1b[0m\r\n" +
                "\x1b[38;2;203;166;247m+----------------------------------------------------------+\x1b[0m\r\n" +
                "• currently: developing machine learning model to classify falsitrons\r\n" +
                "• built RNA-seq pipeline to identify exitrons (exonic introns)\r\n" +
                "• used regression analysis to find correlations between exitrons and disease" +
                "\r\n",

            'esvelt-lab.txt':
                "\r\n"+
                "\x1b[38;2;203;166;247m+--------------------------------+\x1b[0m\r\n" +
                "\x1b[1;38;2;203;166;247m|  Esvelt Lab @ MIT (2023-2025)  |\x1b[0m\r\n" +
                "\x1b[38;2;203;166;247m+--------------------------------+\x1b[0m\r\n" +
                "• currently: genetically engineering duckweed to taste sweet\r\n" +
                "• contributed to development of DHARMA (generation of large-scale protein data)\r\n" +
                "\r\n",
            
            'geco-lab.txt':
                "\r\n"+
                "\x1b[38;2;203;166;247m+---------------------------------------------------------------+\x1b[0m\r\n" +
                "\x1b[1;38;2;203;166;247m|  GECO Lab @ Columbia / Chan-Zuckerberg Biohub (briefly 2025)  |\x1b[0m\r\n" +
                "\x1b[38;2;203;166;247m+---------------------------------------------------------------+\x1b[0m\r\n" +
                "• optimized cloning protocols for large-scale CRISPR screens\r\n" +
                "\r\n",
        },
        projects: {
            'krAI-overlay.txt': 
                "\r\n"+
                "\x1b[38;2;203;166;247m+------------------------------------------+\x1b[0m\r\n" +
                "\x1b[1;38;2;203;166;247m|  krAI-Overlay (JavaScript, Electron.js)  |\x1b[0m\r\n" +
                "\x1b[38;2;203;166;247m+------------------------------------------+\x1b[0m\r\n" +
                "• AI-powered overlay for realtime digital art feedback\r\n" +
                "\x1b[2mGitHub: https://github.com/nc0le/AI-art-overlay\x1b[0m" +
                "\r\n",

            'duckweed.txt': 
                "\r\n"+
                "\x1b[38;2;203;166;247m+------------------------------------------+\x1b[0m\r\n" +
                "\x1b[1;38;2;203;166;247m|  Duckweed Identifier (Python, HTML/CSS)  |\x1b[0m\r\n" +
                "\x1b[38;2;203;166;247m+------------------------------------------+\x1b[0m\r\n" +
                '• duckweed callus classification with machine learning\r\n' +
                "\x1b[2mGitHub: https://github.com/nc0le/duckweed-callus-detection\x1b[0m" +
                "\r\n",
            
            'my-website.txt':
                "\r\n"+
                "\x1b[38;2;203;166;247m+------------------------------------------------------------+\x1b[0m\r\n" +
                "\x1b[1;38;2;203;166;247m|  Personal Website (React, Xterm.js, TypeScript, HTML/CSS)  |\x1b[0m\r\n" +
                "\x1b[38;2;203;166;247m+------------------------------------------------------------+\x1b[0m\r\n" +
                "• what you're looking at!\r\n" +
                '• terminal inspired by https://ronakpjain.com/terminal/\r\n' +
                "\x1b[2mGitHub: https://github.com/nc0le/personal-website\x1b[0m" +
                "\r\n",

            'GetYoMoneyUp.txt':
                "\r\n"+
                "\x1b[38;2;203;166;247m+---------------------------------------+\x1b[0m\r\n" +
                "\x1b[1;38;2;203;166;247m|  GetYoMoneyUp (JavaScript, HTML/CSS)  |\x1b[0m\r\n" +
                "\x1b[38;2;203;166;247m+---------------------------------------+\x1b[0m\r\n" +
                '• chrome extension for spending reminders in online shopping\r\n' +
                '• HackNYU 2025 project\r\n' +
                "\x1b[2mGitHub: https://github.com/nc0le/GetYoMoneyUp\x1b[0m" +
                "\r\n",
        }
    },
  }

  useEffect(() => {
    term.current = new Terminal({
      cursorBlink: true,
      lineHeight: 1.2, 

      theme: {
        background: '#171717',
        foreground: '#f0f0f0',
    
      },
    })
    term.current.open(containerRef.current!)

    const now = new Date().toDateString()
    term.current.writeln(`Last login: ${now}`)
    prompt()

    term.current.onData((data) => {
      if (data === '\r') {
        term.current!.writeln('')
        handleCommand(input.trim())
        input = ''
        prompt()
      } else if (data === '\u007f') {
        // backspace
        if (input.length > 0) {
          input = input.slice(0, -1)
          term.current!.write('\b \b')
        }
      } else {
        input += data
        term.current!.write(data)
      }
    })

    return () => {
      term.current?.dispose()
    }
  }, [])

  function prompt() {
    term.current?.write(`\x1b[38;2;137;217;190myou@nicoles-website \x1b[38;2;130;173;159m${cwd} \x1b[0m$ `)
  }

  function getCurrentDir(): any {
    const parts = cwd.split('/').filter(Boolean)
    let node: any = fileSystem['~']
    for (const part of parts.slice(1)) {
      node = node[part]
    }
    return node
  }

  function handleCommand(cmd: string) {
    const [command, arg] = cmd.split(' ')
    const dir = getCurrentDir()

    switch (command) {
      case 'clear':
        term.current!.clear()
        break

      case 'ls': {
        const items = Object.keys(dir)
        if (items.length === 0) {
          term.current!.writeln('No files or directories')
        } else {
          for (const item of items) {
            if (typeof dir[item] === 'object') {
              term.current!.writeln(`\x1b[38;2;137;180;250m ꩜ ${item}/\x1b[0m`)
            } else {
              term.current!.writeln(`\x1b[38;2;209;173;77m ⭒ ${item}\x1b[0m`)
            }
          }
        }
        break
      }

      case 'cd':
        if (!arg) {
          term.current!.writeln('Usage: cd <directory>')
        } else if (arg === '..') {
          const parts = cwd.split('/').filter(Boolean)
          if (parts.length > 1) {
            setCwd('/' + parts.slice(0, -1).join('/'))
          } else {
            setCwd('~')
          }
        } else if (dir[arg]) {
          setCwd(cwd + '/' + arg)
        } else {
          term.current!.writeln(`No such directory: ${arg}`)
        }
        break

      case 'cat':
        if (!arg) {
          term.current!.writeln('Usage: cat <file>')
        } else if (dir[arg]) {
          if (typeof dir[arg] === 'string') {
            term.current!.writeln(dir[arg])
          } else {
            term.current!.writeln(`${arg} is a directory`)
          }
        } else {
          term.current!.writeln(`No such file: ${arg}`)
        }
        break

      case 'pwd':
        term.current!.writeln(cwd)
        break

      case 'help':
        term.current!.writeln('');
        term.current!.writeln('\x1b[38;2;250;214;115mAvailable commands:\x1b[0m');
        term.current!.writeln('  \x1b[38;2;250;214;115mls\x1b[0m                - List files and directories');
        term.current!.writeln('  \x1b[38;2;250;214;115mcd <directory>\x1b[0m    - Change directory');
        term.current!.writeln('  \x1b[38;2;250;214;115mcat <file>\x1b[0m        - Display file contents');
        term.current!.writeln('  \x1b[38;2;250;214;115mpwd\x1b[0m               - Print working directory');
        term.current!.writeln('  \x1b[38;2;250;214;115mclear\x1b[0m             - Clear the terminal');
        term.current!.writeln('');
        break;
          

      default:
        term.current!.writeln(`Command not found: ${cmd}`)
    }
  }

  return <div ref={containerRef} className="terminal-wrapper" />;
}
