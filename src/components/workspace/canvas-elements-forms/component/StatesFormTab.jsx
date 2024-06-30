import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStateToComponent,
  deleteStateFromComponent,
  workspaceSliceSelectors,
} from '../../../../redux/workspaceSlice';
import '../../../../styles/components/forms/ComponentStateSectionForm.scss';

export default function StatesFormTab() {
  const dispatch = useDispatch();

  const [newState, setNewState] = useState({ name: '', defaultValue: '' });

  const [formErrors, setFormErrors] = useState(null);

  const selectedElement = useSelector(
    workspaceSliceSelectors.selectedElement
  )?.data;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selectedElement.states.findIndex((el) => el.name === newState.name) !==
        -1 &&
      !newState.edit
    ) {
      setFormErrors({ name: 'Duplicated state name' });
      return;
    }
    setFormErrors(null);
    dispatch(addStateToComponent(newState));
    setNewState({ name: '', defaultValue: '' });
  };

  return (
    <div className="states-section">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            required
            value={newState.name}
            className={formErrors?.name ? 'error' : ''}
            onChange={(e) => setNewState({ ...newState, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="defaultValue">Default value:</label>
          <input
            type="text"
            id="defaultValue"
            required
            value={newState.defaultValue}
            onChange={(e) =>
              setNewState({ ...newState, defaultValue: e.target.value })
            }
          />
        </div>
        <button type="submit" className="action-btn">
          {newState?.edit ? 'Edit' : 'Add'}
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Default value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {selectedElement.states.map((state) => (
            <tr key={state.name}>
              <td>{state.name}</td>
              <td>{state.defaultValue}</td>
              <td className="actions-cell">
                <button
                  className="edit"
                  onClick={() =>
                    setNewState({
                      name: state.name,
                      defaultValue: state.defaultValue,
                      edit: true,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="remove"
                  onClick={() => dispatch(deleteStateFromComponent(state.name))}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
