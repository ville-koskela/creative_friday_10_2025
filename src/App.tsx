import { HelloWorld } from './components/HelloWorld';
import { WindowManager } from './components/WindowManager';
import { WindowTaskbar } from './components/WindowTaskbar';
import { useWindows } from './contexts';
import './App.css';

export function App() {
  const { createWindow, windows } = useWindows();

  const handleCreateWindow = () => {
    const windowId = `window-${Date.now()}`;
    createWindow({
      id: windowId,
      title: `Window ${windows.length + 1}`,
      initialX: 100 + windows.length * 30,
      initialY: 100 + windows.length * 30,
      initialWidth: 500,
      initialHeight: 400,
      content: (
        <div>
          <h2>Draggable & Resizable Window</h2>
          <p>This is a floating window component. You can:</p>
          <ul>
            <li>Drag it by clicking and holding the header</li>
            <li>Resize it by dragging any edge or corner</li>
            <li>Close it by clicking the × button</li>
            <li>Click on it to bring it to front</li>
          </ul>
          <p>Add any content you want inside the FloatingWindow component!</p>
          <button
            type="button"
            onClick={() =>
              createWindow({
                id: `nested-window-${Date.now()}`,
                title: 'Nested Window',
                initialX: 150 + windows.length * 30,
                initialY: 150 + windows.length * 30,
                initialWidth: 350,
                initialHeight: 250,
                content: (
                  <div>
                    <p>This is a nested window created from another window!</p>
                    <p>You can create as many windows as you want.</p>
                  </div>
                ),
              })
            }
          >
            Create Nested Window
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="App">
      <HelloWorld />

      <div style={{ margin: '20px' }}>
        <button type="button" onClick={handleCreateWindow}>
          Create New Window
        </button>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Open windows: {windows.length}
        </p>
      </div>

      <WindowManager />
      <WindowTaskbar />
    </div>
  );
}
