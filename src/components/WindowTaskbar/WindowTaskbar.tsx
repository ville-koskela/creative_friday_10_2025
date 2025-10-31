import type { FC } from 'react';
import { useWindows } from '../../contexts';
import './WindowTaskbar.css';

export const WindowTaskbar: FC = () => {
  const { windows, bringToFront, minimizeWindow, restoreWindow, closeWindow } =
    useWindows();

  if (windows.length === 0) {
    return null;
  }

  return (
    <div className="window-taskbar">
      <div className="taskbar-title">Open Windows ({windows.length})</div>
      <div className="taskbar-items">
        {windows.map((window) => (
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
        ))}
      </div>
    </div>
  );
};
