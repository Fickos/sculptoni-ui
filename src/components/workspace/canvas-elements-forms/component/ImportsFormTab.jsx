import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToImports,
  removeFromImports,
  workspaceSliceSelectors,
} from '../../../../redux/workspaceSlice';
import '../../../../styles/components/forms/ComponentImportsSection.scss';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ImportsFormTab() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const selectedElement = useSelector(
    workspaceSliceSelectors.selectedElement
  ).data;

  const suggestions = useSelector(
    workspaceSliceSelectors.suggestionsForImportSection
  );

  return (
    <div className="imports-section">
      <h2>Choose components which will be used within this one</h2>
      <input
        placeholder="Search for components in your project"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex-split-two">
        <div className="options">
          {suggestions
            .filter((s) =>
              s.data.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((s) => (
              <div key={s.workspaceId}>
                {s.data?.name}
                <button
                  onClick={() => dispatch(addToImports(s))}
                  className="add"
                >
                  <FontAwesomeIcon icon={faPlus} className="2xl" />
                </button>
              </div>
            ))}
        </div>
        <div className="options">
          {selectedElement.imports.map((el) => (
            <div key={'s' + el.workspaceId} onClick={() => removeFromImports()}>
              <span>{el.name}</span>
              {/* <span>{el.path}</span> */}
              <button
                onClick={() => dispatch(removeFromImports(el.workspaceId))}
                className="remove"
              >
                <FontAwesomeIcon icon={faMinus} className="2xl" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
