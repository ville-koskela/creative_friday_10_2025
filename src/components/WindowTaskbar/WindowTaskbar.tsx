import { type FC, useState } from 'react';
import { useWindows } from '../../contexts';
import { Terminal } from '../Terminal';
import './WindowTaskbar.css';

export const WindowTaskbar: FC = () => {
  const {
    windows,
    bringToFront,
    minimizeWindow,
    restoreWindow,
    closeWindow,
    createWindow,
  } = useWindows();
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const handleCreateTerminal = () => {
    const terminalId = `terminal-${Date.now()}`;
    createWindow({
      id: terminalId,
      title: 'Terminal',
      content: <Terminal />,
      initialX: 150 + windows.length * 30,
      initialY: 150 + windows.length * 30,
      initialWidth: 600,
      initialHeight: 400,
      minWidth: 400,
      minHeight: 300,
    });
    setIsStartMenuOpen(false);
  };

  return (
    <div className="window-taskbar">
      <div className="taskbar-start">
        <button
          type="button"
          className={`start-menu-button ${isStartMenuOpen ? 'active' : ''}`}
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          title="Start Menu"
        >
          <span className="start-icon">⊞</span>
          <span className="start-text">Start</span>
        </button>
        {isStartMenuOpen && (
          <>
            <button
              type="button"
              className="start-menu-backdrop"
              onClick={() => setIsStartMenuOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setIsStartMenuOpen(false);
                }
              }}
              aria-label="Close start menu"
            />
            <div className="start-menu">
              <div className="start-menu-header">Applications</div>
              <div className="start-menu-items">
                <button
                  type="button"
                  className="start-menu-item"
                  onClick={handleCreateTerminal}
                >
                  <span className="menu-item-icon">▶</span>
                  <span className="menu-item-text">Terminal</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="taskbar-separator" />
      <div className="taskbar-items">
        {windows.length === 0 ? (
          <div className="taskbar-empty">No open windows</div>
        ) : (
          windows.map((window) => (
            <div key={window.id} className="taskbar-item">
              <button
                type="button"
                className={`taskbar-button ${window.isMinimized ? 'minimized' : ''}`}
                onClick={() => {
                  if (window.isMinimized) {
                    restoreWindow(window.id);
                  } else {
                    bringToFront(window.id);
                  }
                }}
                title={window.title}
              >
                <span className="taskbar-button-title">{window.title}</span>
              </button>
              <button
                type="button"
                className="taskbar-minimize"
                onClick={() => {
                  if (window.isMinimized) {
                    restoreWindow(window.id);
                  } else {
                    minimizeWindow(window.id);
                  }
                }}
                title={window.isMinimized ? 'Restore' : 'Minimize'}
              >
                {window.isMinimized ? '▢' : '_'}
              </button>
              <button
                type="button"
                className="taskbar-close"
                onClick={() => closeWindow(window.id)}
                title="Close"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
