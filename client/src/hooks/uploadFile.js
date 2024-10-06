import { useState } from 'react';

const useUploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const uploadFile = async (file) => {
    setLoading(true);
    setError(null);
    setData(null);
    console.log(file); // Log the file object for debugging

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      setError('Cloudinary cloud name is not set in environment variables.');
      setLoading(false);
      return;
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'connect-me-file');

    // Log formData for debugging
    for (var pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to upload file: ${errorResponse.error.message}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error, data };
};

export default useUploadFile;
