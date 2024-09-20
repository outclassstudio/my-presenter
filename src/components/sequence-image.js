import styled from "styled-components";

export default function SequenceImage({ data }) {
  return (
    <Container>
      {data.type === "image" ? (
        <img src={data.src} />
      ) : (
        <video src={data.src} />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  img {
    aspect-ratio: 16/9;
    width: 100%;
  }

  video {
    aspect-ratio: 16/9;
    width: 100%;
  }
`;
