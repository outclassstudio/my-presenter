import styled from "styled-components";

export const DefaultButton = styled.button`
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
