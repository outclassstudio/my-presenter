import styled from "styled-components";
import { DefaultButton } from "../style/button-style";
import { useState } from "react";
import useDataStore from "../data/store";

export default function AddSubtitlesModal({ handleModalOpen }) {
  const [subtitle, setSubtitle] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [subArray, setSubArray] = useState([]);
  const { videoData, updateSubs } = useDataStore();

  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };

  const handleSubtitleTrans = () => {
    if (videoData.length) {
      const subArrayTmp = subtitle.split("\n");
      setSubArray(subArrayTmp);
      setPreviewMode(true);
    } else {
      alert("자막을 매치할 슬라이드가 없어요");
    }
  };

  const modeChange = () => {
    setPreviewMode((prev) => !prev);
  };

  const updateSub = () => {
    const copied = videoData.slice();
    for (let i = 0; i < copied.length; i++) {
      copied[i].subtitle = subArray[i];
    }
    updateSubs(copied);
    handleModalOpen();
  };

  return (
    <ModalContainer>
      <Modal>
        <Title>
          텍스트 자동 입력
          <span>* 엔터로 슬라이드를 구분합니다</span>
        </Title>
        {previewMode ? (
          <>
            <PreviewWrapper>
              <SlideWrapper>
                {videoData.map((data, idx) =>
                  data.background.type === "image" ? (
                    <img key={idx} src={data.background.src} />
                  ) : (
                    <video key={idx} src={data.background.src} />
                  )
                )}
              </SlideWrapper>
              <SubArrayWrapper>
                {subArray.slice(0, videoData.length).map((sub, idx) => (
                  <div key={idx}>{sub}</div>
                ))}
                <span>※ 슬라이드 개수를 벗어난 자막은 생략됩니다</span>
              </SubArrayWrapper>
            </PreviewWrapper>
            <ButtonWrapper>
              <DefaultButton
                width={"100px"}
                height={"30px"}
                background={"#12c763"}
                onClick={updateSub}
              >
                설정
              </DefaultButton>
              <DefaultButton
                width={"100px"}
                height={"30px"}
                background={"#363636"}
                onClick={modeChange}
              >
                취소
              </DefaultButton>
            </ButtonWrapper>
          </>
        ) : (
          <>
            <TextArea value={subtitle} onChange={handleSubtitleChange} />
            <ButtonWrapper>
              <DefaultButton
                width={"100px"}
                height={"30px"}
                background={"#12c763"}
                onClick={handleSubtitleTrans}
              >
                미리보기
              </DefaultButton>
              <DefaultButton
                width={"100px"}
                height={"30px"}
                background={"#363636"}
                onClick={handleModalOpen}
              >
                닫기
              </DefaultButton>
            </ButtonWrapper>
          </>
        )}
      </Modal>
      <Background onClick={handleModalOpen} />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: black;
  opacity: 0.4;
  z-index: 10;
`;

const Modal = styled.div`
  background-color: white;
  width: 450px;
  height: 600px;
  z-index: 20;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-size: 16px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  padding: 10px;
  line-height: 1.2;
`;

const PreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  img {
    width: 64px;
    height: 36px;
  }

  video {
    width: 64px;
    height: 36px;
  }
`;

const SubArrayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    background-color: #575757;
    color: white;
    padding: 5px 10px;
    border-radius: 7px;
  }

  span {
    font-size: 12px;
    padding-left: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 7px;
`;
