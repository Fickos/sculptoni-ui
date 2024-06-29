import { Editor } from '@monaco-editor/react';
import { useRef } from 'react';
import Dropzone from '../../generic/Dropzone';
import '../../../../styles/components/forms/ComponentRenderSectionForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHtmlContent,
  workspaceSliceSelectors,
} from '../../../../redux/workspaceSlice';

export default function RenderFormTab() {
  const dispatch = useDispatch();

  const htmlContent = useSelector(workspaceSliceSelectors.selectedElement)?.data
    ?.return;

  const editorRef = useRef(null);

  const handleEditorChange = (value) => {
    dispatch(setHtmlContent(value));
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="render-section">
      {/* Add Dropzone here which accepts HTML files */}
      <div className="dz-wrapper">
        <Dropzone />
      </div>
      <Editor
        height="80vh"
        theme="vs-dark"
        defaultLanguage="html"
        defaultValue="// HTML content"
        value={htmlContent}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
}
