import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SingleImage from "../components/single-image";
import useDataStore from "../data/store";
import { DefaultButton } from "../style/button-style";
// import { getUploadUrl } from "../apis/images";

export default function Home() {
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
      <FormWrapper>
        <div className="title">⚒️실행도구</div>
        <FileForm onSubmit={handleImageUpload}>
          <AddImageButton htmlFor="photo">
            이미지추가
            <ImageInput
              id="photo"
              type="file"
              multiple
              onChange={handleImageSelect}
            />
          </AddImageButton>
          {store.length ? (
            <DefaultButton
              width={"100px"}
              height={"35px"}
              fontSize={"16px"}
              background={"#12c763"}
              onClick={handlePresentOn}
            >
              재생하기
            </DefaultButton>
          ) : (
            ""
          )}
        </FileForm>
        {store.length ? <div>추가된 파일 {store.length}</div> : ""}
      </FormWrapper>
      <PreviewContainer>
        {preview
          ? preview.map((url, idx) => (
              <SingleImage
                key={idx}
                src={url}
                id={idx}
                preview={preview}
                setPreview={setPreview}
              />
            ))
          : ""}
      </PreviewContainer>
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

const FormWrapper = styled.div`
  margin: 10px;
  border: 1px dashed;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  div {
    &.title {
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const FileForm = styled.form`
  display: flex;
  gap: 10px;
`;

const AddImageButton = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 25px;
  background: #363636;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 10px;
  font-size: 16px;
`;

const ImageInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  gap: 10px;
`;
