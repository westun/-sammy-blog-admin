import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi";
import Input from "../components/common/input";
import Spinner from "../components/common/spinner";
import ImageUploadModal from "../components/image/imageUploadModal";
import { addAuthor, getAuthor, updateAuthor } from "../services/authorService";

export default function AuthorEdit() {
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [errors, setErrors] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id: authorId } = useParams();

  const schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
  };

  const schemaObj = Joi.object(schema);

  useEffect(() => {
    if (authorId === "new") {
      return;
    }

    setId(authorId);

    async function getAuthorData() {
      const { data: authorData } = await getAuthor(authorId);
      setFirstName(authorData.firstName);
      setLastName(authorData.lastName);
      setPhotoUrl(authorData.imageUrl);
    }

    getAuthorData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const author = {
      firstName,
      lastName,
    };

    const { error } = schemaObj.validate(author, { abortEarly: false });
    if (!error) {
      return doSubmit();
    }

    const errorsObj = {};
    for (let item of error.details) {
      errorsObj[item.path[0]] = item.message;
    }

    setErrors(errorsObj);
  }

  async function doSubmit() {
    const author = {
      firstName,
      lastName,
      imageUrl: photoUrl,
    };

    const editingAuthor = id;
    if (editingAuthor) {
      author.id = id;
      setIsLoading(true);
      await updateAuthor(author);
      showSuccessSavingToast();
      return navigate("/authors");
    }

    setIsLoading(true);
    const { data } = await addAuthor(author);
    showSuccessSavingToast();
    navigate("/authors");
    setIsLoading(false);
  }

  function handleOnImageUploaded(imgData) {
    setPhotoUrl(imgData.fileUrl);
    setIsModalOpen(false);
  }

  function showSuccessSavingToast() {
    toast.success("Author saved successfully", { theme: "colored" });
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="col-md-6">
          <Input
            name="firstName"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors["firstName"]}
          />
          <Input
            name="lastName"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors["lastName"]}
          />
          <Input
            name="photoUrl"
            label="Profile Photo Url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Upload a Photo
            </button>
          </p>
        </div>
        <p>
          <button className="btn btn-primary">Save</button>
        </p>
      </form>
      <ImageUploadModal
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        onImageUploaded={handleOnImageUploaded}
      />
    </>
  );
}
