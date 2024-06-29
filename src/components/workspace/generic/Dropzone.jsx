import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { setHtmlContent } from '../../../redux/workspaceSlice';
import { useState } from 'react';

export default function Dropzone() {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length !== 1) {
        return alert('Not allowed to upload multiple files');
      }
      const file = acceptedFiles[0];
      if (file.type !== 'text/html') {
        return alert('Only support HTML files');
      }
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;

        dispatch(setHtmlContent(data));
        setSelectedFile({ fileName: file.name });
      };
      reader.readAsText(file);
    },
    noClick: true,
    maxFiles: 1,
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className={`drop-zone ${isDragActive ? 'hovered' : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>Drop here</div>
      ) : (
        <>
          {selectedFile ? (
            <div>{selectedFile.fileName}</div>
          ) : (
            <>
              <div>Drag & drop HTML file</div>
              <div>OR</div>
            </>
          )}
          <button onClick={open} className="action-btn">
            Browse an HTML file
          </button>
        </>
      )}
    </div>
  );
}
