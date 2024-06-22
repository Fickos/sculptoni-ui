import PropTypes from 'prop-types';
import '../../../styles/components/canvas-elements/Component.scss';

ComponentPageBase.propTypes = {
  isPage: PropTypes.bool,
  rest: PropTypes.objectOf({
    name: PropTypes.string,
    states: PropTypes.array,
    effects: PropTypes.array,
    actions: PropTypes.array,
    return: PropTypes.string,
    imports: PropTypes.array,
  }),
};

export default function ComponentPageBase(props) {
  const { isPage, ...rest } = props;

  return (
    <>
      <div className="stripe-head">
        <div className="type-indicator">{isPage ? 'P' : 'C'}</div>
        <div className="name">
          {rest.name}
          {isPage && <div className="stripe-route">{rest.url}</div>}
        </div>
      </div>
      <div className="stripe-two">
        {rest.states.map((state) => (
          <div key={state.name}>{state.name}</div>
        ))}
      </div>
      <div className="stripe-three">
        {rest.effects.map((eff, i) => (
          <div key={i}>{eff.function}</div>
        ))}
      </div>
      <div className="stripe-four">
        <div className="text-editor"></div>
        <div className="import-section">
          {rest.imports.map((imp) => (
            <div key={imp.name}>{imp.name}</div>
          ))}
        </div>
      </div>
    </>
  );
}
