import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import WorkspaceContext from '../components/workspace/WorkspaceContext';

import '../styles/pages/Workspace.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProject } from '../redux/workspaceSlice';

export default function Workspace() {
  const dispatch = useDispatch();

  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      dispatch(loadProject(projectId));
    }
  }, [projectId, dispatch]);

  return (
    <div className="screen">
      <Header activeSection="home" />
      <WorkspaceContext />
    </div>
  );
}
