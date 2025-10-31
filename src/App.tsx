import { useState } from 'react';
import { FloatingWindow } from './components/FloatingWindow';
import { HelloWorld } from './components/HelloWorld';
import './App.css';

export function App() {
  const [showWindow, setShowWindow] = useState(true);

  return (
    <div className="App">
      <HelloWorld />

      <button
        type="button"
        onClick={() => setShowWindow(true)}
        style={{ margin: '20px' }}
      >
        Show Floating Window
      </button>

      {showWindow && (
        <FloatingWindow
          title="Example Window"
          initialX={200}
          initialY={150}
          initialWidth={500}
          initialHeight={400}
          onClose={() => setShowWindow(false)}
        >
          <h2>Draggable & Resizable Window</h2>
          <p>This is a floating window component. You can:</p>
          <ul>
            <li>Drag it by clicking and holding the header</li>
            <li>Resize it by dragging any edge or corner</li>
            <li>Close it by clicking the × button</li>
          </ul>
          <p>Add any content you want inside the FloatingWindow component!</p>
        </FloatingWindow>
      )}
    </div>
  );
}
