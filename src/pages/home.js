import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SingleImage from "../components/single-image";
import useDataStore from "../data/store";
// import { getUploadUrl } from "../apis/images";

export default function Home() {
  const [images, setImages] = useState();
  const [preview, setPreview] = useState();
  const navigate = useNavigate();
  const store = useDataStore((state) => state.array);
  console.log(store);

  const handlePresentOn = () => {
    navigate("/reveal");
  };

  const handleImageSelect = async (e) => {
    // console.log(e.target.files);
    const files = e.target.files;

    // const { success, result } = await getUploadUrl();
    // if (success) {
    //   const { id, uploadURL } = result;
    //   console.log(id, uploadURL);
    // }
    let urls = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));

      // if (files[i] instanceof File) {
      //   const photoData = await files[i].arrayBuffer();
      //   await fs.appendFile(
      //     `./public/${files[i].name}`,
      //     Buffer.from(photoData)
      //   );
      // }
    }

    setPreview(urls);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
  };

  return (
    <MainContainer>
      <div>my presenter</div>
      {store.length ? <button onClick={handlePresentOn}>재생</button> : ""}
      <FileForm onSubmit={handleImageUpload}>
        <input type="file" multiple onChange={handleImageSelect} />
        {/* <button>이미지 추가</button> */}
      </FileForm>
      <PreviewContainer>
        {preview
          ? preview.map((url, idx) => <SingleImage key={idx} src={url} />)
          : ""}
      </PreviewContainer>
      {store.length ? <div>추가된 파일{store.length}</div> : ""}
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

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  gap: 10px;
`;
