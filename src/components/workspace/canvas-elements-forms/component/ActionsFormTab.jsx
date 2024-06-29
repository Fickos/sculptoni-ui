import { useDispatch, useSelector } from 'react-redux';
import {
  addAction,
  editAction,
  removeAction,
  workspaceSliceSelectors,
} from '../../../../redux/workspaceSlice';
import { useState } from 'react';
import { sanitizeIdentificator } from '../../../../utils/workspaceValidations';
import '../../../../styles/components/forms/ComponentActionsSectionForm.scss';

export default function ActionsFormTab() {
  const dispatch = useDispatch();

  const selectedElement = useSelector(
    workspaceSliceSelectors.selectedElement
  ).data;

  const [action, setAction] = useState({
    name: '',
    isEventHandler: false,
    parameters: [],
  });

  const saveAction = () => {
    if (action.id) {
      console.log('EDIT', action);
      dispatch(editAction(action));
    } else {
      dispatch(addAction(action));
    }
    setAction({
      name: '',
      isEventHandler: false,
      parameters: [],
    });
  };

  return (
    <div className="actions-section">
      <div className="actions-form">
        <div className="function-info">
          <div className="flex inline-controls">
            <label htmlFor="functionName">Action name:</label>
            <input
              type="text"
              name="functionName"
              value={action.name}
              onChange={(e) => {
                setAction({
                  ...action,
                  name: sanitizeIdentificator(e.target.value),
                });
              }}
            />

            <label htmlFor="isEventHandler">Event handler: </label>
            <input
              type="checkbox"
              name="eventHandler"
              checked={action.isEventHandler}
              onChange={(e) =>
                setAction({ ...action, isEventHandler: e.target.checked })
              }
            />
            {/* Make the component above as a switch */}
            <div className="parametersCrud">
              {/* TO DO: add parameter ids */}
            </div>
          </div>

          <button
            className="action-btn"
            onClick={saveAction}
            disabled={!sanitizeIdentificator(action.name)}
          >
            Save
          </button>
        </div>
      </div>
      <div className="actions-preview">
        {selectedElement.actions.map((el) => (
          <div key={el.id}>
            <span>
              {el.name}(
              {el.isEventHandler
                ? ['e', ...el.parameters].join(',')
                : el.parameters.join(', ')}
              )
            </span>
            <button className="edit" onClick={() => setAction({ ...el })}>
              Edit
            </button>
            <button
              className="remove"
              onClick={() => dispatch(removeAction(el.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
