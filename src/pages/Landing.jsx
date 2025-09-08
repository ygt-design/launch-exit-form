import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ListingsCarousel from "../components/ListingsCarousel.jsx";
import TextCarousel from "../components/TextCarousel.jsx";

const Hero = styled.div`
  position: relative;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    left: -16vw;
    top: -200px;
    width: 72vw;
    max-width: 820px;
    height: 420px;
    background: radial-gradient(closest-side at 35% 50%, rgba(255, 124, 0, 0.55) 0%, rgba(255, 76, 0, 0.24) 30%, rgba(255, 124, 0, 0) 85%);
    filter: blur(100px);
    opacity: 0.9;
    pointer-events: none;
    z-index: -1;
  }

  @media (max-width: 480px) {
    &::before {
      left: -40vw;
      top: -65px;
      width: 150vw;
      max-width: none;
      height: 420px;
      filter: blur(75px);
    }
  }
`;

const Header = styled.h1`
  font-size: 2rem;
  margin: 0 0 18px;
  padding: 10px 10px 0 10px;
  font-weight: 500;
  letter-spacing: -0.02em;

  @media (max-width: 480px) {
    font-size: 1.85rem;
  }
`;

const SubHeader = styled.p`
  margin: 0 0 10px;
  line-height: 1.5;
  color: var(--muted);
  padding: 0 10px 0px 10px;
`;

const Emphasis = styled.span`
  color: var(--primary);
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  margin: 10px 0 2px 0;
`;

const Note = styled.p`
  margin: 8px 0 0;
  color: var(--muted);
  text-align: center;
  font-size: 14px;
`;

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="stack" style={{ gap: 12 }}>
        <Hero>
          <Header className="title">What you’ve created is valuable. <Emphasis>Let the right buyer see its worth.</Emphasis></Header>
          <SubHeader className="subtitle">Buy and sell profitable bootstrapped micro-SaaS. Premium-Vetted listings, clear metrics, human review.</SubHeader>
        </Hero>
        <Row role="group" aria-label="Choose form">
          <button className="button primary" onClick={() => navigate("/sell")}>I am selling</button>
          <button className="button secondary" onClick={() => navigate("/buy")}>I am buying</button>
        </Row>
        <div style={{ display: 'grid', gap: 6 }}>
          <ListingsCarousel />
          <TextCarousel />
        </div>
      </div>
    </div>
  );
}
 
