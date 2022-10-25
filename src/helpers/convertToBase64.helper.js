const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataURL = reader.result;
      const base64 = dataURL.replace("data:", "").replace(/^.+,/, "");
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export default toBase64;
