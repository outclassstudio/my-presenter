import styled from "styled-components";

export default function Header() {
  return (
    <HeaderContainer>
      <TitleWrapper>
        <div className="main">Outclass</div>
        <div className="sub">Video Generator</div>
      </TitleWrapper>
      <Guide
        href="https://github.com/outclassstudio/my-presenter?tab=readme-ov-file#-%EC%82%AC%EC%9A%A9%EA%B0%80%EC%9D%B4%EB%93%9C"
        target="_blank"
      >
        📘사용가이드
      </Guide>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  padding: 10px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  background-color: #242424;
  color: white;
  margin-bottom: 12px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: 25px;

  div {
    &.main {
    }
    &.sub {
      font-size: 18px;
      color: #b8b8b8;
    }
  }
`;

const Guide = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;
