import { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import './styles.css';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const View = ({ className = '', post }) => {
    const editorRef = useRef();

    return (
        <div className={`flex flex-col ${className}`}>
            <CKEditor
                disabled={true}
                onReady={editor => {
                    // 읽기 전용 모드 활성화
                    editor.enableReadOnlyMode(`ckEditorPreview_${Date.now()}`);

                    editorRef.current = editor;  // 에디터 인스턴스 저장
                }}
                onError={(error, { willEditorRestart }) => {
                    if (willEditorRestart) {
                        editorRef.current.ui.view.toolbar.element.remove();
                    }
                }}
                onFocus={false}
                data={post.content ?? ''}
                editor={DecoupledEditor}
            />
        </div>
    );
};

export default View;
