import { useState } from 'react';

import './CkEditor/styles.css';
import Editor from './CkEditor/Editor';

function App() {
  const [post, setPost] = useState({
    content: "",
    images: []
  });

  // const onSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     if (post.images.length > 0) {
  //       const formData = new FormData();
  //       //XSS 공격을 방지하기 위해 데이터 정화
  //       const cleanHtml = DOMPurify.sanitize(post.content);
  //       const doc = new DOMParser().parseFromString(cleanHtml, 'text/html');
  //       const imgElements = Array.from(doc.querySelectorAll('img'));

  //       const innerImgSrcs = imgElements.map(img => img.src).filter(src => src.startsWith('data:image'));
  //       //중간에 이미지를 지웠을 수 있기에 content와 images매칭
  //       const innerImgs = post.images.filter(img => innerImgSrcs.includes(img.base64));

  //       // FormData 객체에 이미지 파일 추가
  //       innerImgs.forEach((img, i) => formData.append(`images[${i}]`, img.file));
  //       const resImgs = await fetchUploadImgs(formData);
  //       if (resImgs.status !== 200) {
  //         alert('이미지 업로드 실패');
  //         return;
  //       }
  //       //업로드한 이미지의 ids
  //       const uploadImgs = resImgs.data.images;
  //       post.imageIds = uploadImgs.map(e => e.F_ID).join(',');

  //       imgElements.forEach(img => {
  //         const matchingImage = innerImgs.find(innerImg => innerImg.base64 === img.src);
  //         if (matchingImage === undefined) return;
  //         const result = uploadImgs.find(uploadImg => uploadImg.F_NAME === matchingImage.file.name);
  //         img.src = result.F_PATH;
  //       });

  //       //DOMPurify로 다시 한 번 클리닝 업로드된 이미지로 교체후 content업데이트
  //       post.content = DOMPurify.sanitize(doc.body.innerHTML);
  //     }
  //     post.category = selected.value;

  //     const response = await fetchCreateNotice(post);

  //     if (response.status !== 200) {
  //       alert('작성 실패');
  //       return;
  //     }

  //     setNotices({ ...noitceInfo, notices: [response.data.notice, ...notices] });
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  return (
    <div className="App" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2>Using CKEditor&nbsp;5 build in React</h2>
      <div style={{ width: '1000px', height: '500px' }}>
        <Editor className={'w-full h-full '}
          post={post}
          setPost={setPost} />
      </div>
    </div>
  );
}

export default App;
