import { useDispatch, useSelector } from 'react-redux';
import {
  setComponentName,
  setPageUrl,
  workspaceSliceSelectors,
} from '../../../../redux/workspaceSlice';
import { sanitizeIdentificator } from '../../../../utils/workspaceValidations';

import '../../../../styles/components/forms/ComponentGeneralSectionForm.scss';

export default function GeneralFormTab() {
  const dispatch = useDispatch();

  const selectedElement = useSelector(workspaceSliceSelectors.selectedElement);

  return (
    <div className="general-section">
      <div className="form-group">
        <label htmlFor="component-name">Component Name:</label>
        <input
          type="text"
          id="component-name"
          value={selectedElement.data.name}
          onChange={(e) =>
            dispatch(setComponentName(sanitizeIdentificator(e.target.value)))
          }
        />
      </div>
      {selectedElement.type === 'page' && (
        <div className="form-group">
          <label htmlFor="page-url">Page URL:</label>
          <input
            type="text"
            id="page-url"
            value={selectedElement.data.url}
            onChange={(e) =>
              dispatch(setPageUrl(sanitizeIdentificator(e.target.value)))
            }
          />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="component-name">Component Path:</label>
        {/* This will be a tree view selector */}
        <input
          type="text"
          id="component-name"
          value={selectedElement.data.path}
          disabled
        />
      </div>
    </div>
  );
}
