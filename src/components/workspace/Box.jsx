import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { CANVAS_ELEMENT_TYPES as CET } from '../../costants';

import '../../styles/components/canvas-elements/BaseElement.scss';
import '../../styles/components/canvas-elements/Component.scss';
import { initialElementStates } from '../../utils/initialElementStates';

Box.propTypes = {
  type: PropTypes.string,
};

/**
 * This component represents elements from sidebar
 * By dragging one of these elements to the canvas
 * The new element is added
 * @param {type} props
 * type -> Represents what template should be used as a design point
 * (component, page, service, util, redux...)
 */
export default function Box(props) {
  const { type } = props;

  const [{ isDragging }, drag] = useDrag({
    type: 'box',
    item: {
      type,
      data: JSON.parse(JSON.stringify(initialElementStates[type])),
    },
    // Code from documentation
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`canvas-element ${type}`}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div className="stripe-head">
        <div className="type-indicator">{type[0]}</div>
        <div className="name-placeholder">&nbsp;</div>
      </div>
      <div className="stripe-two"></div>
      {(type === CET.COMPONENT || type === CET.PAGE || type === CET.REDUX) && (
        <>
          <div className="stripe-three"></div>
          {(type === CET.COMPONENT || type === CET.PAGE) && (
            <div className="stripe-four">
              <div className="editor-placeholder"></div>
              <div className="imports-placeholder"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
