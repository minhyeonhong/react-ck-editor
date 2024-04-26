import { useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './styles.css';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import UploadAdapter from './UploadAdapter';

const Editor = ({ className = '', post, setPost }) => {
    const editorRef = useRef();
    const [images, setImages] = useState([]);

    useEffect(() => {
        //이미지 파일 부모 컴포넌트에 업데이트
        setPost({ ...post, images });
    }, [images])

    return (
        <div className={`flex flex-col ${className}`}>
            <CKEditor
                onReady={editor => {
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        return new UploadAdapter(loader, setImages);
                    };

                    editorRef.current = editor;
                }}
                onError={(error, { willEditorRestart }) => {
                    if (willEditorRestart) {
                        editorRef.current.ui.view.toolbar.element.remove();
                    }
                }}
                data={post.content ?? ''}
                onChange={(event, editor) => setPost({ ...post, content: editor.getData() })}
                editor={DecoupledEditor}
                config={{
                    fontSize: {
                        options: [11, 13, 15, 16, 19, 24, 28, 30, 34, 38]
                    },
                }}
            />
        </div>
    );
};

export default Editor;
