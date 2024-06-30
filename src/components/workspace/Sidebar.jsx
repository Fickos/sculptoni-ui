import { useState } from 'react';
import Box from './Box';
import PropTypes from 'prop-types';
import { CANVAS_ELEMENT_TYPES as CET } from '../../costants';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/components/Sidebar.scss';
import { useDispatch } from 'react-redux';
import { saveProject } from '../../redux/workspaceSlice';

CollapsableSidebarSection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

function CollapsableSidebarSection({ title, children }) {
  const [isCollapsed, setCollapsed] = useState(true);

  return (
    <div className="sb-section">
      <div
        className="sb-section-head"
        onClick={() => setCollapsed(!isCollapsed)}
      >
        <span>{title}</span>
        <span style={{ marginLeft: '1em' }}>
          <FontAwesomeIcon icon={isCollapsed ? faChevronUp : faChevronDown} />
        </span>
        {/* <span>{isCollapsed ? 'UP' : 'DOWN'}</span> */}
      </div>
      {isCollapsed && <div className="sb-section-content">{children}</div>}
    </div>
  );
}

export default function Sidebar() {
  const dispatch = useDispatch();

  return (
    <div className="sidebar" id="sidebar">
      <div
        className="actions"
        style={{
          display: 'flex',
          gap: '2em',
          width: '100%',
          padding: '2em 0em',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button
          className="action-btn"
          style={{ fontSize: '1.25rem' }}
          onClick={() => dispatch(saveProject())}
        >
          Save
        </button>
        <button className="action-btn" style={{ fontSize: '1.25rem' }}>
          Generate
        </button>
      </div>
      <CollapsableSidebarSection title="General">
        <Box type={CET.COMPONENT} />
        <Box type={CET.PAGE} />
        <Box type={CET.SERVICE} />
        <Box type={CET.UTIL} />
        <Box type={CET.REDUX} />
      </CollapsableSidebarSection>
    </div>
  );
}
