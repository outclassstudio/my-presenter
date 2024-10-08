import styled from "styled-components";
import { transitions } from "../lib/options";
import useDataStore from "../data/store";
import { useEffect, useState } from "react";
import { DefaultButton } from "../style/button-style";

export default function SingleImage({ data }) {
  const [background, setBackground] = useState(data.background);
  const [transition, setTranstion] = useState(data.transition);
  const [slideTime, setSlideTime] = useState(data.slideTime);
  const [subtitle, setSubtitle] = useState(data.subtitle);
  const { updateArray, deleteArray } = useDataStore();

  //todo 자막 업데이트...
  useEffect(() => {
    setSubtitle(data.subtitle);
  }, [data.subtitle]);

  const handleUpdate = () => {
    const updataData = {
      id: data.id,
      background,
      transition,
      slideTime,
      subtitle,
    };
    updateArray(updataData);
  };

  const handleDelete = () => {
    deleteArray(data.id);
  };

  const handleTransitionChange = (e) => {
    setTranstion(e.target.value);
  };

  const handleSlideTimeChange = (e) => {
    setSlideTime(e.target.value);
  };

  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };

  return (
    <SingleImageContainer>
      {background.type === "image" ? (
        <ThumbnailImage src={background.src} />
      ) : (
        <ThumbnailVideo src={background.src} />
      )}
      <SelectWrapper>
        <span>전환효과</span>
        <select onChange={handleTransitionChange}>
          {transitions.map((trans, idx) => (
            <option key={idx}>{trans}</option>
          ))}
        </select>
      </SelectWrapper>
      <SelectWrapper>
        <span>지속시간(ms)</span>
        <input
          type="number"
          value={slideTime}
          onChange={handleSlideTimeChange}
        />
      </SelectWrapper>
      <SelectWrapper>
        <span>자막</span>
        <input type="text" value={subtitle} onChange={handleSubtitleChange} />
      </SelectWrapper>
      <ButtonWrapper>
        <DefaultButton
          width={"50px"}
          height={"30px"}
          background={"#363636"}
          hover={"#575757"}
          active={"#7a7a7a"}
          onClick={handleUpdate}
        >
          수정
        </DefaultButton>
        <DefaultButton
          width={"50px"}
          height={"30px"}
          background={"#bf192c"}
          hover={"#c43747"}
          active={"#c24f5c"}
          onClick={handleDelete}
        >
          삭제
        </DefaultButton>
      </ButtonWrapper>
    </SingleImageContainer>
  );
}

const SingleImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  span {
    font-weight: bold;
  }

  select {
    height: 30px;
    /* border-radius: 5px; */
    padding: 2px;
  }

  input {
    height: 20px;
    /* border-radius: 5px; */
    padding: 5px;
    border: 1px solid #363636;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
`;

const ThumbnailVideo = styled.video`
  width: 100%;
  aspect-ratio: 16/9;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
