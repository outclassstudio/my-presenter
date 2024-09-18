import styled from "styled-components";
import { transitions } from "../lib/options";
import useDataStore, { useStore } from "../data/store";
import { useState } from "react";

export default function SingleImage({ src }) {
  const [background, setBackground] = useState(src);
  const [transition, setTranstion] = useState("slide");
  const [slideTime, setSlideTime] = useState(5000);
  const { addArray } = useDataStore();

  const handleUpdate = () => {
    const data = {
      background,
      transition,
      slideTime,
      subtitle: "",
    };
    addArray(data);
  };

  const handleTransitionChange = (e) => {
    setTranstion(e.target.value);
  };

  const handleSlideTimeChange = (e) => {
    setSlideTime(e.target.value);
  };

  return (
    <SingleImageContainer>
      <Image src={src} />
      <SelectWrapper>
        <span>전환효과</span>
        <select onChange={handleTransitionChange}>
          {transitions.map((trans, idx) => (
            <option key={idx}>{trans}</option>
          ))}
        </select>
      </SelectWrapper>
      <SelectWrapper>
        <span>지속시간 ms</span>
        <input
          type="number"
          value={slideTime}
          onChange={handleSlideTimeChange}
        />
      </SelectWrapper>
      <button onClick={handleUpdate}>update</button>
    </SingleImageContainer>
  );
}

const SingleImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Image = styled.img`
  width: 100%;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
