import '../../../styles/components/canvas-elements/Redux.scss';

Redux.propTypes = {};

// eslint-disable-next-line no-unused-vars
export default function Redux(props) {
  return (
    <>
      <div className="stripe-head">
        <div className="type-indicator">R</div>
        <div className="name">SliceName</div>
      </div>
      <div className="stripe-two">
        <div>a: B</div>
        <div>b: []</div>
      </div>
      <div className="stripe-three">
        <div>reducerOne(a, b, c)</div>
        <div>reducerOne(a, b, c)</div>
      </div>
    </>
  );
}
