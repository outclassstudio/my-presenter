import { useEffect, useRef, useState } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import styled from "styled-components";
import { slideData } from "../data/data";

export default function Main() {
  const deckDivRef = useRef(null);
  const deckRef = useRef(null);
  const documentRef = useRef(document);

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
      transition: "slide",
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
          {slideData.map((el, idx) => (
            <Section
              key={idx}
              data-background-image={`${el.background}`}
              data-transition={`${el.trainsition}`}
              data-autoslide={`${el.slideTime}`}
            >
              {el.subtitle}
            </Section>
          ))}
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
  font-size: 100px;
`;
