import styled from "styled-components";

export const DefaultButton = styled.button`
  /* padding: 5px 10px; */
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  /* font-size: 16px; */

  &:disabled {
    background: #949494;
    cursor: not-allowed;
  }

  &:hover {
    background: ${(props) => props.hover};
  }

  &:active {
    background: ${(props) => props.active};
  }
`;
