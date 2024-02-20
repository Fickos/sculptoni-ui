import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/components/Header.scss';

const sections = [
  { name: 'home', path: '/home' },
  { name: 'projects', path: '/projects' },
  { name: 'profile', path: '/profile' },
  { name: 'about', path: '/about' },
  {},
];

Header.propTypes = {
  activeSection: PropTypes.string,
};

export default function Header(props) {
  const { activeSection } = props;

  const navigate = useNavigate();
  return (
    <div className="header-navbar">
      <div className="logo" onClick={() => navigate('/home')}>
        LOGO
      </div>
      <div className="header-items">
        {sections.map((el, i) => (
          <div
            key={i}
            className={`header-item ${
              activeSection === el.name ? 'active' : ''
            }`}
            onClick={() => navigate(`${el.path}`)}
          >
            {el.name}
          </div>
        ))}
      </div>
    </div>
  );
}
