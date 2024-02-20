import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './Sidebar';
import Canvas from './Canvas';

export default function WorkspaceContext() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="workspace">
        <Sidebar />
        <Canvas />
      </div>
    </DndProvider>
  );
}
