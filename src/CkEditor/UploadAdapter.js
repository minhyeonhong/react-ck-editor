export default class UploadAdapter {
    constructor(loader, setImages) {
        this.loader = loader;
        this.setImages = setImages;
    }

    async upload() {
        try {
            const file = await this.loader.file;
            const reader = new FileReader();

            const readPromise = new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });

            reader.readAsDataURL(file);

            const base64Data = await readPromise;

            //이미지 상태관리
            this.setImages(prevImages => [...prevImages, { id: Date.now(), file, base64: base64Data }]);

            return { default: base64Data };
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
};