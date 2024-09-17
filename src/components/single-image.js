import styled from "styled-components";
import { transitions } from "../lib/options";

export default function SingleImage({ src }) {
  console.log(src);
  return (
    <SingleImageContainer>
      <Image src={src} />
      <SelectWrapper>
        <span>전환효과</span>
        <select>
          {transitions.map((trans, idx) => (
            <option key={idx}>{trans}</option>
          ))}
        </select>
      </SelectWrapper>
      <SelectWrapper>
        <span>지속시간</span>
        <input type="number" />
      </SelectWrapper>
    </SingleImageContainer>
  );
}

const SingleImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Image = styled.img`
  width: 400px;
  height: 300px;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
