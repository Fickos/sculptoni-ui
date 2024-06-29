import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToImports,
  removeFromImports,
  workspaceSliceSelectors,
} from '../../../../redux/workspaceSlice';

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
    <div>
      <h2>Choose components which will be used within this one</h2>
      <input
        placeholder="Search for components in your project"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="options">
        {suggestions
          .filter((s) =>
            s.data.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((s) => (
            <div key={s.workspaceId}>
              {s.data?.name}
              <button onClick={() => dispatch(addToImports(s))}>Add</button>
            </div>
          ))}
      </div>
      {selectedElement.imports.map((el) => (
        <div key={'s' + el.workspaceId} onClick={() => removeFromImports()}>
          <span>{el.workspaceId}</span>
          <span>{el.name}</span>
          <span>{el.path}</span>
          <button onClick={() => dispatch(removeFromImports(el.workspaceId))}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
