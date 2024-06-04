import { useSelector } from 'react-redux';
import { workspaceSliceSelectors } from '../redux/workspaceSlice';

const withRenderOnlyWhenElementSelected = (Component) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const selectedElement = useSelector(
      workspaceSliceSelectors.selectedElement
    );
    if (!selectedElement) {
      return null;
    }
    return <Component {...props} element={selectedElement} />;
  };
};

export default withRenderOnlyWhenElementSelected;
