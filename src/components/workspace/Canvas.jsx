import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Layer, Stage } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import CanvasElement from './CanvasElement';
import { addElement } from '../../redux/workspaceSlice';
import { v4 as uuidv4 } from 'uuid';

export default function Canvas() {
  const stageRef = useRef();

  const dispatch = useDispatch();

  const elements = useSelector((state) => state.workspace.elements);

  const [{ canDrop }, drop] = useDrop({
    accept: 'box',
    drop: (item, monitor) => {
      const stage = stageRef.current.getStage();
      const itemOffset = monitor.getClientOffset();

      const sidebar = document.getElementById('sidebar');
      let sidebarWidth = sidebar?.offsetWidth ?? 0;

      const pointerPosition = {
        x: itemOffset.x - sidebarWidth,
        y: itemOffset.y,
      };

      const canvasPosition = {
        x: pointerPosition.x / stage.scaleX() - stage.x() / stage.scaleX(),
        y: pointerPosition.y / stage.scaleY() - stage.y() / stage.scaleY(),
      };

      dispatch(
        addElement({
          x: canvasPosition.x,
          y: canvasPosition.y,
          type: item.type,
          scale: stage.scaleX(),
          workspaceId: uuidv4(),
          ...item,
        })
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleStageScale = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.02;
    const stage = stageRef.current.getStage();
    const oldScale = stage.scaleX();

    // Get the direction of scrolling
    const delta = e.evt.deltaY;
    const sign = delta > 0 ? -1 : 1;

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    // Scale up for positive delta, scale down for negative delta
    const newScale = oldScale * Math.pow(scaleBy, sign);
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };

    stage.position(newPos);
    stage.batchDraw();
  };

  return (
    <div
      className="workspace-canvas"
      ref={drop}
      style={{
        backgroundColor: canDrop ? '#353535' : '#333',
      }}
    >
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable
        scaleX={1}
        scaleY={1}
        onWheel={handleStageScale}
      >
        <Layer>
          {elements.map((el, i) => (
            <CanvasElement
              key={i}
              x={el.x}
              y={el.y}
              type={el.type}
              scale={el.scale}
              {...el}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
