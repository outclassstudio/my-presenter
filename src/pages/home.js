import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SingleImage from "../components/single-image";
import useDataStore from "../data/store";
import { DefaultButton } from "../style/button-style";
import SequenceImage from "../components/sequence-image";
// import { getUploadUrl } from "../apis/images";

export default function Home() {
  const navigate = useNavigate();
  const { videoData, addArray } = useDataStore();
  let slideTime = 0;
  if (videoData.length) {
    for (let i = 0; i < videoData.length; i++) {
      slideTime += Number(videoData[i].slideTime);
    }
  }
  console.log(videoData);

  const handlePresentOn = () => {
    navigate("/reveal");
  };

  const handleImageSelect = async (e) => {
    const files = e.target.files;

    // const { success, result } = await getUploadUrl();
    // if (success) {
    //   const { id, uploadURL } = result;
    //   console.log(id, uploadURL);
    // }

    for (let i = 0; i < files.length; i++) {
      const background = URL.createObjectURL(files[i]);
      let id = i;
      if (videoData.length) {
        const [last] = videoData.slice(-1);
        console.log(last);
        const lastID = last.id + i + 1;
        id = lastID;
      }
      const data = {
        id,
        background,
        transition: "slide",
        slideTime: 5000,
        subtitle: "",
      };
      addArray(data);
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
  };

  return (
    <MainContainer>
      <Header>
        <div className="main">Outclass</div>
        <div className="sub">Video Generator</div>
      </Header>
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
          <AddImageButton htmlFor="subtitle">
            자막추가
            <ImageInput
              id="subtitle"
              type="file"
              multiple
              // onChange={handleImageSelect}
            />
          </AddImageButton>
          {videoData.length ? (
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
      </FormWrapper>
      {videoData.length ? (
        <FormWrapper>
          <div className="title">📺추가된 파일: {videoData.length}개</div>
          <PreloadWrapper>
            {videoData.map((data) => (
              <SequenceImage key={data.id} src={data.background} />
            ))}
          </PreloadWrapper>
          <div className="expected">
            ⚙예상소요시간: {slideTime ? slideTime : ""}ms
          </div>
        </FormWrapper>
      ) : (
        ""
      )}
      <PreviewContainer>
        {videoData.length
          ? videoData.map((data) => <SingleImage key={data.id} data={data} />)
          : ""}
      </PreviewContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: 25px;
  font-weight: bold;
  background-color: #242424;
  color: white;
  margin-bottom: 10px;

  div {
    &.main {
    }
    &.sub {
      font-size: 18px;
      color: #b8b8b8;
    }
  }
`;

const FormWrapper = styled.div`
  margin: 2px 20px;
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

    &.expected {
      display: flex;
      align-items: center;
      font-size: 13px;
    }
  }
`;

const PreloadWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  gap: 10px;
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
  padding: 0px 20px;
`;
