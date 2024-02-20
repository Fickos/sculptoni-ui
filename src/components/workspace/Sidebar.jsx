import { useState } from 'react';
import Box from './Box';
import PropTypes from 'prop-types';
import { CANVAS_ELEMENT_TYPES as CET } from '../../costants';

import '../../styles/components/Sidebar.scss';

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
        <span>{isCollapsed ? 'UP' : 'DOWN'}</span>
      </div>
      {isCollapsed && <div className="sb-section-content">{children}</div>}
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="sidebar" id="sidebar">
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
