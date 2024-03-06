import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import FlyInDialog from './generic/FlyInDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedElement } from '../../redux/workspaceSlice';

export default function WorkspaceContext() {
  const dispatch = useDispatch();

  const selectedElement = useSelector(
    (state) => state.workspace.selectedElement
  ); // TO DO: CHANGE TO APPSLICE SELECTOR SO WE CAN RETRIEVE WHOOLE OBJECT FROM ELEMENTS

  const setOpen = (isOpen) => {
    if (!isOpen) {
      dispatch(setSelectedElement(null));
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="workspace">
        <Sidebar />
        <Canvas />
        <FlyInDialog open={selectedElement !== null} setOpen={setOpen}>
          <div>This is flyInDialog</div>
        </FlyInDialog>
      </div>
    </DndProvider>
  );
}
