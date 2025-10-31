import type { CSSProperties, FC, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import './FloatingWindow.css';

interface FloatingWindowProps {
  children: ReactNode;
  title?: string;
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const FloatingWindow: FC<FloatingWindowProps> = ({
  children,
  title = 'Window',
  initialX = 100,
  initialY = 100,
  initialWidth = 400,
  initialHeight = 300,
  minWidth = 200,
  minHeight = 150,
  onClose,
  className = '',
  style = {},
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const dragStart = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  // Handle dragging
  const handleMouseDownDrag = useCallback(
    (e: React.MouseEvent) => {
      if (
        (e.target as HTMLElement).closest('.floating-window-header') &&
        !(e.target as HTMLElement).closest('.floating-window-close')
      ) {
        setIsDragging(true);
        dragStart.current = {
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        };
        e.preventDefault();
      }
    },
    [position]
  );

  // Handle resizing
  const handleMouseDownResize = useCallback(
    (e: React.MouseEvent, direction: string) => {
      setIsResizing(true);
      setResizeDirection(direction);
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      };
      e.preventDefault();
      e.stopPropagation();
    },
    [size]
  );

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = position.x;
        let newY = position.y;

        if (resizeDirection.includes('e')) {
          newWidth = Math.max(minWidth, resizeStart.current.width + deltaX);
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(minHeight, resizeStart.current.height + deltaY);
        }
        if (resizeDirection.includes('w')) {
          const potentialWidth = resizeStart.current.width - deltaX;
          if (potentialWidth >= minWidth) {
            newWidth = potentialWidth;
            newX = position.x + deltaX;
          }
        }
        if (resizeDirection.includes('n')) {
          const potentialHeight = resizeStart.current.height - deltaY;
          if (potentialHeight >= minHeight) {
            newHeight = potentialHeight;
            newY = position.y + deltaY;
          }
        }

        setSize({ width: newWidth, height: newHeight });
        if (resizeDirection.includes('w') || resizeDirection.includes('n')) {
          setPosition({ x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection('');
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, resizeDirection, position, minWidth, minHeight]);

  return (
    <div
      ref={windowRef}
      className={`floating-window ${className}`}
      style={{
        ...style,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      {/* biome-ignore lint/a11y/useSemanticElements: Drag handle needs to be a div for proper cursor styling */}
      <div
        className="floating-window-header"
        onMouseDown={handleMouseDownDrag}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
          }
        }}
      >
        <span className="floating-window-title">{title}</span>
        {onClose && (
          <button
            type="button"
            className="floating-window-close"
            onClick={onClose}
            aria-label="Close window"
          >
            ×
          </button>
        )}
      </div>

      <div className="floating-window-content">{children}</div>

      {/* Resize handles */}
      {/* biome-ignore lint/a11y/useSemanticElements: Resize handles need to be divs for proper positioning and cursor styling */}
      <div
        className="resize-handle resize-n"
        onMouseDown={(e) => handleMouseDownResize(e, 'n')}
        role="button"
        tabIndex={-1}
        aria-label="Resize north"
      />
      {/* biome-ignore lint/a11y/useSemanticElements: Resize handles need to be divs for proper positioning and cursor styling */}
      <div
        className="resize-handle resize-s"
        onMouseDown={(e) => handleMouseDownResize(e, 's')}
        role="button"
        tabIndex={-1}
        aria-label="Resize south"
      />
      {/* biome-ignore lint/a11y/useSemanticElements: Resize handles need to be divs for proper positioning and cursor styling */}
      <div
        className="resize-handle resize-e"
        onMouseDown={(e) => handleMouseDownResize(e, 'e')}
        role="button"
        tabIndex={-1}
        aria-label="Resize east"
      />
      {/* biome-ignore lint/a11y/useSemanticElements: Resize handles need to be divs for proper positioning and cursor styling */}
      <div
        className="resize-handle resize-w"
        onMouseDown={(e) => handleMouseDownResize(e, 'w')}
        role="button"
        tabIndex={-1}
        aria-label="Resize west"
      />
      {/* biome-ignore lint/a11y/useSemanticElements: Resize handles need to be divs for proper positioning and cursor styling */}
      <div
        className="resize-handle resize-ne"
        onMouseDown={(e) => handleMouseDownResize(e, 'ne')}
        role="button"
        tabIndex={-1}
        aria-label="Resize northeast"
      />
      {/* biome-ignore lint/a11y/useSemanticElements: Resize handles need to be divs for proper positioning and cursor styling */}
      <div
        className="resize-handle resize-nw"
        onMouseDown={(e) => handleMouseDownResize(e, 'nw')}
        role="button"
        tabIndex={-1}
        aria-label="Resize northwest"
      />
      {/* biome-ignore lint/a11y/useSemanticElements: Resize handles need to be divs for proper positioning and cursor styling */}
      <div
        className="resize-handle resize-se"
        onMouseDown={(e) => handleMouseDownResize(e, 'se')}
        role="button"
        tabIndex={-1}
        aria-label="Resize southeast"
      />
      {/* biome-ignore lint/a11y/useSemanticElements: Resize handles need to be divs for proper positioning and cursor styling */}
      <div
        className="resize-handle resize-sw"
        onMouseDown={(e) => handleMouseDownResize(e, 'sw')}
        role="button"
        tabIndex={-1}
        aria-label="Resize southwest"
      />
    </div>
  );
};
