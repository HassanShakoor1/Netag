// src/utils/cropImage.js

export default async function getCroppedImg(imageSrc, croppedAreaPixels) {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.setAttribute('crossOrigin', 'anonymous'); // for cross-origin issues
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(file); // return the cropped image as a Blob
      } else {
        reject(new Error('Canvas is empty'));
      }
    }, 'image/jpeg');
  });
}
