import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TextArea.css';
import QuillToolbar from './QuillToolBar';

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];

function TextArea({ onQuillValueChange, textContainerRef }) {
  const handleQuillValueChange = (e) => {
    onQuillValueChange(e);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: '#toolbar',
      },
      history: {},
    };
  }, []);

  return (
    <div className="container">
      <QuillToolbar />
      <ReactQuill
        ref={textContainerRef}
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={handleQuillValueChange}
      />
    </div>
  );
}

export default React.memo(TextArea);
