import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Group, Rect } from 'react-konva';
import { Html } from 'react-konva-utils';

import '../../styles/components/canvas-elements/BaseElement.scss';
import '../../styles/components/canvas-elements/Component.scss'; // To do : new file

CanvasElement.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  type: PropTypes.string,
  scale: PropTypes.number,
  rest: PropTypes.any,
};

export default function CanvasElement(props) {
  // eslint-disable-next-line no-unused-vars
  const { x, y, type, scale, ...rest } = props; // ...rest will be used in flyin dialog

  const divRef = useRef(null);
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });

  const [isResizing, setIsResizing] = useState(false);
  const [initialResizePos, setInitialResizePos] = useState({ x: 0, y: 0 });
  const [resized, setResized] = useState(false);
  const [position, setPosition] = useState({ x: x, y: y }); // TO DO: double-check

  useEffect(() => {
    // This effect is used to set divDimensions so that the Rect component
    // can have the proper size -> Allow proper dragging and onClick evt
    const updateDimensions = () => {
      if (divRef.current) {
        const { width, height } = divRef.current.getBoundingClientRect();
        setDivDimensions({ width: width / scale, height: height / scale });
      }
    };
    updateDimensions();
  }, [divRef, scale]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing && divRef.current) {
        const deltaX = e.clientX - initialResizePos.x;
        const deltaY = e.clientY - initialResizePos.y;

        const newWidth = divRef.current.offsetWidth + deltaX;
        const newHeight = divRef.current.offsetHeight + deltaY;

        setDivDimensions({ width: newWidth, height: newHeight });
        setInitialResizePos({ x: e.clientX, y: e.clientY });
      }
    };
    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, initialResizePos, divRef, scale]);

  const renderCardContent = () => {
    switch (type) {
      case 'component':
        return <>Component</>;
      case 'page':
        return <>Page</>;
      case 'service':
        return <>Service</>;
      case 'util':
        return <>Util</>;
      case 'redux':
        return <>Redux</>;
      default:
        return null;
    }
  };

  // Initiate resizing by clicking into bottom left corner of canvas element
  const handleMouseDown = (e) => {
    setIsResizing(true);
    setResized(true);
    setInitialResizePos({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = (e) => {
    setPosition({ x: e.target.x(), y: e.target.y() });
  };

  return (
    <>
      <Group draggable x={position.x} y={position.y} onDragEnd={handleDragEnd}>
        <Html divProps={{ style: { pointerEvents: 'none' } }}>
          <div
            ref={divRef}
            className="canvas-element"
            style={{
              width: resized && divDimensions.width,
              height: resized && divDimensions.height,
            }}
          >
            {renderCardContent()}
          </div>
        </Html>
        <Rect
          width={divDimensions.width}
          height={divDimensions.height}
          shadowBlur={10}
          onClick={() => console.log('Open Fly-in')}
        />
        {/* Below is the div which enables resizing within canvas */}
      </Group>
      <Group
        x={position.x + divDimensions.width}
        y={position.y + divDimensions.height}
      >
        <Html>
          <div
            className="resize-handle"
            onMouseDown={handleMouseDown}
            onClick={(e) => {
              e.stopPropagation();
            }} // In order to not trigger opening of the fly-in dialog
          />
        </Html>
      </Group>
    </>
  );
}
