"use client";
import axios from "axios";
import { useState } from "react";

const UploadImagePage = () => {
  const [file, setFile]: any = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage]: any = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUploadImage = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axios.post(
        "http://localhost:1337/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileId = response.data[0].id;
      console.log(fileId);
      setUploadedImage(response.data[0]);
      setUploading(false);
      // Update the user avatar field with the uploaded file ID
      const updateUserAvatar = async () => {
        try {
          const response = await axios.put(
            `http://localhost:1337/api/users/3?populate=*`,
            {
              avatar: fileId,
            }
          );

          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      updateUserAvatar();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload Image to Strapi</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadImage}>Upload Image</button>
      {uploading ? (
        <p>Uploading...</p>
      ) : (
        uploadedImage && (
          <img src={uploadedImage.url} alt={uploadedImage.name} />
        )
      )}
    </div>
  );
};

export default UploadImagePage;
