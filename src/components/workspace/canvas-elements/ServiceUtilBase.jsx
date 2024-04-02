import PropTypes from 'prop-types';
import '../../../styles/components/canvas-elements/Service.scss';

ServiceUtilBase.propTypes = {
  isService: PropTypes.bool,
};

export default function ServiceUtilBase(props) {
  // eslint-disable-next-line no-unused-vars
  const { isService, ...rest } = props;

  return (
    <>
      <div className="stripe-head">
        <div className="type-indicator">{isService ? 'S' : 'U'}</div>
        <div className="name">fileName.js</div>
      </div>
      <div className="stripe-two">
        <div>export function A</div>
        <div>export function B</div>
      </div>
    </>
  );
}
