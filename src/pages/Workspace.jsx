import Header from '../components/Header';
import WorkspaceContext from '../components/workspace/WorkspaceContext';

import '../styles/pages/Workspace.scss';

export default function Workspace() {
  return (
    <div className="screen">
      <Header activeSection="home" />
      <WorkspaceContext />
    </div>
  );
}
