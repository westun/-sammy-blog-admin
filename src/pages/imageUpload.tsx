import React, { useEffect, useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import UploadImage from "../services/imageUploadService";
import Spinner from "../components/common/spinner";
import { ImageUploadDTO } from "../services/types";

interface Props {
  onImageUploaded: (imageData: any) => void;
}

export default function ImageUpload({ onImageUploaded }: Props) {
  const [file, setFile] = useState<File | null>();
  const [fileDataUrl, setFileDataUrl] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState<any>();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target != null) {
        setFileDataUrl(e.target.result);
      }
    };

    fileReader.readAsDataURL(file);
  }, [file]);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target !== null && e.target.files !== null) {
      const fileFromInput = e.target.files[0];
      setFile(fileFromInput);
    }
  }

  async function handleUpload() {
    const image: ImageUploadDTO = {
      fileName: file ? file.name : "",
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
