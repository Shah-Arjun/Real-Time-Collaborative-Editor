import "./App.css"
import { Editor } from "@monaco-editor/react"
import { MonacoBinding } from "y-monaco"
import { useRef, useMemo, useState } from "react"
import * as Y from "yjs"
import { SocketIOProvider } from "y-socket.io"

function App() {
  const editorRef = useRef(null)
  const [ username, setUsername ] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || ""
  })

  const ydoc = useMemo(() => new Y.Doc(), [])
  const yText = useMemo(() => ydoc.getText("monaco"), [ ydoc ])


  const handleMount = (editor) => {
    editorRef.current = editor

    new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([ editorRef.current ]),
    )
  }

  
  // handle form submit
  const handleJoin = (e) => {
    e.preventDefault()
    setUsername(e.target.username.value)
    window.history.pushState({}, "", "?username=" + e.target.username.value) 
  }


  // if the username is not set, show the join screen
  if (!username) {
    return (
      <main className="h-screen w-full bg-gray-950 flex gap-4 p-2 items-center justify-center">
        <form onSubmit={handleJoin} className="flex flex-col gap-4 items-center">
          <input 
            type="text"
            placeholder="Enter your username"
            name="username"
            className="text-md px-2 p-1 rounded-lg text-white border border-white"
          />
          <button className="px-4 py-2 w-full bg-white text-black rounded-lg" >
            Join
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="h-screen w-full bg-gray-950 flex gap-4 p-2">
      {/* LEFT-SIDEBAR */}
      <aside className="h-full w-1/4 bg-amber-50 rounded-lg"></aside>
      {/* RIGHT EDITOR */}
      <section className="w-3/4 bg-neutral-800 rounded-lg overflow-hidden">
        <Editor 
          height="100%" 
          defaultLanguage="javascript" 
          defaultValue="" 
          theme="vs-dark"
          onMount={handleMount}
        />
      </section>
    </main>
  )
}

export default App