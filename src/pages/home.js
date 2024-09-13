import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const navigate = useNavigate();

  const handlePresentOn = () => {
    navigate("/reveal");
  };

  return (
    <MainContainer>
      <div>my presenter</div>
      <button onClick={handlePresentOn}>자동시작</button>
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
