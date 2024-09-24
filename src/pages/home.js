import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SingleImage from "../components/single-image";
import useDataStore from "../data/store";
import { DefaultButton } from "../style/button-style";
import SequenceImage from "../components/sequence-image";
import AddSubtitlesModal from "../components/add-subtitles-modal";
import { useState } from "react";
import { formatToMin } from "../lib/utils";
import Header from "../components/header";

export default function Home() {
  const [isSubtitleModalOpen, setIsSubtitleModalOpen] = useState(false);
  const navigate = useNavigate();
  const { videoData, addArray } = useDataStore();
  let slideTime = 0;
  if (videoData.length) {
    for (let i = 0; i < videoData.length; i++) {
      slideTime += Number(videoData[i].slideTime);
    }
  }
  // console.log(videoData);

  const handlePresentOn = () => {
    navigate("/reveal");
  };

  const handleImageSelect = async (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const type = files[i].type.split("/")[0];
      const src = URL.createObjectURL(files[i]);
      let id = i;
      if (videoData.length) {
        const [last] = videoData.slice(-1);
        const lastID = last.id + i + 1;
        id = lastID;
      }
      const data = {
        id,
        background: {
          type,
          src,
        },
        transition: "none",
        slideTime: 5000,
        subtitle: "",
      };
      addArray(data);
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
  };

  const handleModalOpen = () => {
    setIsSubtitleModalOpen((prev) => !prev);
  };

  return (
    <MainContainer>
      {isSubtitleModalOpen ? (
        <AddSubtitlesModal handleModalOpen={handleModalOpen} />
      ) : (
        ""
      )}
      <Header />
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
          <AddSubtitleButton onClick={handleModalOpen}>
            자막추가
          </AddSubtitleButton>
          {videoData.length ? (
            <DefaultButton
              width={"100px"}
              height={"35px"}
              fontSize={"16px"}
              background={"#12c763"}
              hover={"#16db6e"}
              active={"#53e092"}
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
              <SequenceImage key={data.id} data={data.background} />
            ))}
          </PreloadWrapper>
          <div className="expected">
            ⚙예상소요시간: {slideTime ? formatToMin(slideTime) : ""}
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

const AddImageButton = styled(DefaultButton).attrs({ as: "label" })`
  width: 80px;
  height: 25px;
  padding: 5px 10px;
  background: #363636;
  font-size: 16px;

  &:hover {
    background: #4f4e4e;
  }
  &:active {
    background: #706f6f;
  }
`;

const AddSubtitleButton = styled(AddImageButton).attrs({ as: "div" })``;

const ImageInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  gap: 10px;
  padding: 0px 20px;
`;
