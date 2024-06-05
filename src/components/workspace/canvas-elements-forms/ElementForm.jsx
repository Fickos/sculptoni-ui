import withRenderOnlyWhenElementSelected from '../../../hocs/withRenderOnlyWhenElementSelected';
import ComponentForm from './component/ComponentForm';

const ElementForm = withRenderOnlyWhenElementSelected(({ element }) => {
  switch (element.type) {
    case 'component':
    case 'page':
      return <ComponentForm />;
    case 'service':
      return <div>This is a service</div>;
    case 'util':
      return <div>This is a util</div>;
    case 'redux':
      return <div>This is a redux</div>;
    default:
      return <div>This is a form base</div>;
  }
});

export default ElementForm;
