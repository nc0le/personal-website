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

        projects: {
            'krAI-overlay.txt': 
                "\r\n"+
                "\x1b[1;38;2;203;166;247mkrAI-Overlay\x1b[0m\r\n" +
                "\x1b[38;2;203;166;247m------------------\x1b[0m\r\n" +
                "• AI-powered overlay that provides realtime digital art feedback\r\n" +
                "• Working on complete rewrite of codebase with support for new \r\nmainboard\r\n" +
                "• Hopefully work on some CV stuff next year for autoaim\r\n" +
                "\x1b[2mGitHub: https://github.com/PurdueRM/Embedded-Control\x1b[0m" +
                "\r\n",

            'duckweed.txt': 'Machine learning for duckweed callus classification',
            'GetYoMoneyUp.txt': 'Chrome extension for smarter online shopping',
        },
        research:{
            'knowles-lab.txt': 'Detection and prediction of exitrons',
            'esvelt-lab.txt': 'Research on synthetic biology and CRISPR',
        }
    },
  }

  useEffect(() => {
    term.current = new Terminal({
      cursorBlink: true,
      lineHeight: 1.2, 

      theme: {
        background: '#171717',
        foreground: '#cfcfcf',
    
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
    term.current?.write(`\x1b[38;2;238;188;224myou@nicoles-website \x1b[38;2;136;179;249m${cwd} \x1b[0m$ `)
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
              term.current!.writeln(`\x1b[38;2;137;180;250m📁 ${item}/\x1b[0m`)
            } else {
              term.current!.writeln(`\x1b[38;2;217;197;154m📄 ${item}\x1b[0m`)
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
        term.current!.writeln('\x1b[38;2;136;179;249mAvailable commands:\x1b[0m');
        term.current!.writeln('  \x1b[38;2;136;179;249mls\x1b[0m                - List files and directories');
        term.current!.writeln('  \x1b[38;2;136;179;249mcd <directory>\x1b[0m    - Change directory');
        term.current!.writeln('  \x1b[38;2;136;179;249mcat <file>\x1b[0m        - Display file contents');
        term.current!.writeln('  \x1b[38;2;136;179;249mpwd\x1b[0m               - Print working directory');
        term.current!.writeln('  \x1b[38;2;136;179;249mclear\x1b[0m             - Clear the terminal');
        term.current!.writeln('');
        break;
          

      default:
        term.current!.writeln(`Command not found: ${cmd}`)
    }
  }

  return <div ref={containerRef} className="terminal-wrapper" />;
}
