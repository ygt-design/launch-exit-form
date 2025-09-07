import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ListingsCarousel from "../components/ListingsCarousel.jsx";
import TextCarousel from "../components/TextCarousel.jsx";

const Header = styled.h1`
  font-size: 40px;
  margin: 0 0 18px;

  @media (max-width: 480px) {
    font-size: 35px;
  }
`;

const SubHeader = styled.p`
  margin: 0 0 10px;
  line-height: 1.5;
  color: var(--muted);
`;

const Emphasis = styled.span`
  color: var(--primary);
`;

const Row = styled.div`
  display: flex;
  gap: 12px;  
  align-items: center;
  margin-bottom: 15px;
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
        <div>
          <Header className="title">What you’ve created is valuable. <Emphasis>Let the right buyer see its worth.</Emphasis></Header>
          <SubHeader className="subtitle">Buy and sell profitable bootstrapped micro-SaaS. Premium-Vetted listings, clear metrics, human review.</SubHeader>
        </div>
        <Row role="group" aria-label="Choose form">
          <button className="button primary" onClick={() => navigate("/sell")}>I am selling</button>
          <button className="button secondary" onClick={() => navigate("/buy")}>I am buying</button>
        </Row>
        <div style={{ display: 'grid', gap: 6 }}>
          <ListingsCarousel />
          <TextCarousel />
        </div>
        <Note>Curated only • Transparent metrics • Human review</Note>
      </div>
    </div>
  );
}
 
