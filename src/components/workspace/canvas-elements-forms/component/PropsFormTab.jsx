import { useState } from 'react';
import { sanitizeIdentificator } from '../../../../utils/workspaceValidations';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProp,
  removeProp,
  workspaceSliceSelectors,
} from '../../../../redux/workspaceSlice';
import '../../../../styles/components/forms/ComponentPropsSectionForm.scss';

export default function PropsFormTab() {
  const dispatch = useDispatch();

  const [propName, setPropName] = useState('');

  const selectedElement = useSelector(
    workspaceSliceSelectors.selectedElement
  ).data;

  const handleAdd = () => {
    if (selectedElement.props.findIndex((el) => el === propName) !== -1) {
      return;
    }
    dispatch(addProp(propName));
  };

  return (
    <div className="props-section">
      <span className="flex-inline">
        <div className="form-group">
          <label htmlFor="prop-name">Prop name:</label>
          <input
            type="text"
            value={propName}
            onChange={(e) => setPropName(sanitizeIdentificator(e.target.value))}
          />
        </div>
        <button className="action-btn" onClick={handleAdd}>
          Add
        </button>
      </span>
      <div className="props">
        {selectedElement.props.map((pr) => (
          <div className="prop-item" key={pr}>
            <span>{pr}</span>
            <button onClick={() => dispatch(removeProp(pr))}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
