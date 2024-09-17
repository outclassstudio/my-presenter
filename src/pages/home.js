import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SingleImage from "../components/single-image";
import { getUploadUrl } from "../apis/images";

export default function Home() {
  const [images, setImages] = useState();
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  const handlePresentOn = () => {
    navigate("/reveal");
  };

  const handleImageSelect = async (e) => {
    // console.log(e.currentTarget.files);
    const files = e.target.files;
    console.log(files.length);

    // const { success, result } = await getUploadUrl();
    // if (success) {
    //   const { id, uploadURL } = result;
    //   console.log(id, uploadURL);
    // }
    let urls = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }

    setPreview(urls);
    console.log(urls);
    setPreview(urls);

    setImages(e.currentTarget.files);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
  };

  return (
    <MainContainer>
      <div>my presenter</div>
      <button onClick={handlePresentOn}>자동시작</button>
      <FileForm onSubmit={handleImageUpload}>
        <input type="file" multiple onChange={handleImageSelect} />
        <button>이미지 추가</button>
      </FileForm>
      {preview ? preview.map((url) => <SingleImage src={url} />) : ""}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileForm = styled.form`
  display: flex;
  flex-direction: column;
`;
