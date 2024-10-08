import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import styled from "styled-components";
import useDataStore from "../data/store";

export default function Main() {
  const deckDivRef = useRef(null);
  const deckRef = useRef(null);
  const documentRef = useRef(document);
  const { videoData } = useDataStore();

  const simulateFKeyPress = () => {
    const fullScreenEvent = new KeyboardEvent("keydown", {
      key: "f",
      keyCode: 70,
      which: 70,
      bubbles: true,
      cancelable: true,
    });
    const autoPlayEvent = new KeyboardEvent("keydown", {
      key: "a",
      keyCode: 65,
      which: 65,
      bubbles: true,
      cancelable: true,
    });
    documentRef.current.dispatchEvent(fullScreenEvent);
    documentRef.current.dispatchEvent(autoPlayEvent);
  };

  useEffect(() => {
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current, {
      transition: "none",
      embedded: false,
      autoSlide: 5000,
    });

    deckRef.current.initialize().then(() => {
      simulateFKeyPress();
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed.");
      }
    };
  }, []);

  return (
    <MainContainer>
      <RevealContainer className="reveal" ref={deckDivRef}>
        <div className="slides">
          <Section data-autoslide="4500">슬라이드쇼가 시작됩니다.</Section>
          {videoData.map((el, idx) =>
            el.background.type === "image" ? (
              <Section
                key={idx}
                data-background-image={`${el.background.src}`}
                data-transition={`${el.transition}`}
                data-autoslide={`${el.slideTime}`}
                data-background-transition={`${el.transition}`}
              >
                {el.subtitle ? <InSection>{el.subtitle}</InSection> : ""}
              </Section>
            ) : (
              <Section
                key={idx}
                data-background-video={`${el.background.src}`}
                data-transition={`${el.transition}`}
                data-autoslide={`${el.slideTime}`}
                data-background-transition={`${el.transition}`}
              >
                {el.subtitle ? <InSection>{el.subtitle}</InSection> : ""}
              </Section>
            )
          )}
          <Section>슬라이드쇼가 끝났습니다.</Section>
        </div>
      </RevealContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RevealContainer = styled.div`
  width: 1920px;
  height: 1080px;
`;

const Section = styled.section`
  display: flex;
  align-items: end;
  justify-content: center;
`;

const InSection = styled.div`
  margin-top: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: black;
  opacity: 0.85;
  font-size: 30px;
  width: 100%;
  font-family: "Hanna";
`;

// const Image = styled.img``;
