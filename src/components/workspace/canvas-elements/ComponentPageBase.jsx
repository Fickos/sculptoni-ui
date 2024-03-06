import PropTypes from 'prop-types';
import '../../../styles/components/canvas-elements/Component.scss';

ComponentPageBase.propTypes = {
  isPage: PropTypes.bool,
};

export default function ComponentPageBase(props) {
  const { isPage, ...rest } = props;

  return (
    <>
      <div className="stripe-head">
        <div className="type-indicator">{isPage ? 'P' : 'C'}</div>
        <div className="name">
          ComponentName
          {isPage && <div className="stripe-route">/about</div>}
        </div>
      </div>
      <div className="stripe-two">
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
        <div>state1</div>
      </div>
      <div className="stripe-three">
        <div>loadAllUsersFromAgent</div>
        <div>effect2</div>
      </div>
      <div className="stripe-four">
        <div className="text-editor"></div>
        <div className="import-section">
          <div>Component1</div>
          <div>{'MUI->123123'}</div>
          <div>DNDNDNDNDNDNDNDNDNDDNNDNDND</div>
        </div>
      </div>
    </>
  );
}
