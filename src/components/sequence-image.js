import styled from "styled-components";

export default function SequenceImage({ src }) {
  return (
    <Container>
      <img src={src} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  img {
    aspect-ratio: 16/9;
    width: 100%;
  }
`;
