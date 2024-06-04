import withRenderOnlyWhenElementSelected from '../../../hocs/withRenderOnlyWhenElementSelected';

const ElementForm = withRenderOnlyWhenElementSelected(({ element }) => {
  switch (element.type) {
    case 'component':
      return <div>This is a component</div>;
    case 'page':
      return <div>This is a page</div>;
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
