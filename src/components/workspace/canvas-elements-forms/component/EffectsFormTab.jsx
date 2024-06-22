import { useDispatch, useSelector } from 'react-redux';
import {
  addEffect,
  removeEffect,
  workspaceSliceSelectors,
} from '../../../../redux/workspaceSlice';
import { useState } from 'react';
import AutocompleteInputField from '../../generic/AutocompleteInputField';
import '../../../../styles/components/forms/ComponentEffectSectionForm.scss';

/**
 * One effect can be described as:
 * dependency array (arbitrary count of props/states) from this component
 * functions (from state/util files || actions || arbitrary -> in last case
 * the new function is created in the file itself wrapped in a useCallback hook
 * which has the same dependency array as the useEffect itself)
 */
export default function EffectsFormTab() {
  const dispatch = useDispatch();

  const selectedElement = useSelector(
    workspaceSliceSelectors.selectedElement
  ).data;

  const [effectFunctions, setEffectFunctions] = useState([]);
  const [effectDepArr, setEffectDepArr] = useState([]);

  const suggestionsForFunctions = useSelector(
    workspaceSliceSelectors.suggestionsForEffectFunctions
  );

  const suggestionsForDependencyArr = useSelector(
    workspaceSliceSelectors.suggestionsForEffectDependencyArr
  );

  const handleNewFunction = (data) => {
    setEffectFunctions([...effectFunctions, data]);
  };

  const handleNewDependency = (data) => {
    setEffectDepArr([...effectDepArr, data]);
  };

  const saveNewEffect = () => {
    dispatch(
      addEffect({ functions: effectFunctions, dependencyArr: effectDepArr })
    );
    setEffectFunctions([]);
    setEffectDepArr([]);
  };

  return (
    <div className="effects-section">
      <div className="effect-form">
        <AutocompleteInputField
          suggestions={suggestionsForFunctions}
          duplicates={effectFunctions}
          onSubmit={handleNewFunction}
        />
        <AutocompleteInputField
          suggestions={suggestionsForDependencyArr}
          duplicates={effectDepArr}
          onSubmit={handleNewDependency}
          disabled={
            !suggestionsForDependencyArr.filter(
              (el) => !effectDepArr.includes(el)
            ).length
          }
          mustSelect={true}
        />
        <button className="action-btn" onClick={saveNewEffect}>
          Save effect
        </button>
      </div>
      <div className="current-effect-preview">
        <div className="functions-preview">
          {effectFunctions.map((ef) => (
            <div className="func" key={ef}>
              {ef}
            </div>
          ))}
        </div>

        <div className="dep-arr-preview">
          <pre>[ {effectDepArr.join(',')} ]</pre>
        </div>
      </div>
      <table className="effects">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Functions</th>
            <th style={{ width: '40%' }}>Dependency array</th>
            <th style={{ width: '20%' }}></th>
          </tr>
        </thead>
        <tbody>
          {selectedElement.effects.map((el) => (
            <tr key={el.id}>
              <td>{el.functions.join(', ')}</td>
              <td>
                <pre>[{el.dependencyArr.join(', ')}]</pre>
              </td>
              <td>
                <button
                  className="remove"
                  onClick={() => dispatch(removeEffect(el.id))}
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
