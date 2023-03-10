import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UploadImage from "../services/imageUploadService";
import Spinner from "../components/common/spinner";

export default function ImageUpload({ onImageUploaded }) {
  const [file, setFile] = useState();
  const [fileDataUrl, setFileDataUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setFileDataUrl(e.target.result);
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  function handleOnChange(e) {
    const fileFromInput = e.target.files[0];
    setFile(fileFromInput);
  }

  async function handleUpload() {
    const image = {
      fileName: file.name,
      dataUrl: fileDataUrl,
    };

    setIsLoading(true);
    const { data: imageData } = await UploadImage(image);
    setImageData(imageData);
    setFile(null);
    toast.success("Photo uploaded successfully.", {
      theme: "colored",
    });
    setIsLoading(false);

    if (onImageUploaded) {
      onImageUploaded(imageData);
    }
  }

  function handleCopyUrl() {
    navigator.clipboard.writeText(imageData.fileUrl);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <h1>Image Upload</h1>
      <div className="mb-2">
        <input
          className="form-control"
          type="file"
          accept="img/*"
          onChange={handleOnChange}
        />
      </div>
      {imageData && !file && (
        <div>
          <label className="form-label">Uploaded file url:</label>
          <div className="input-group">
            <input
              className="form-control"
              readOnly={true}
              value={imageData.fileUrl}
            />
            <span
              style={{ cursor: "pointer" }}
              className="input-group-text"
              onClick={handleCopyUrl}
            >
              Copy
            </span>
          </div>
        </div>
      )}
      <div className="mb-2">
        {file && (
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload Photo
          </button>
        )}
      </div>
      <div>
        <img width="50%" height="50%" src={fileDataUrl} />
      </div>
    </React.Fragment>
  );
}
