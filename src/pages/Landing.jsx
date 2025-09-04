import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = styled.h1`
  font-size: 28px;
  margin: 0 0 8px;
`;

const SubHeader = styled.p`
  margin: 0 0 24px;
  color: var(--muted);
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
`;

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="stack">
        <div>
          <Header className="title">What you’ve created is valuable. Let the right buyer see its worth.</Header>
          <SubHeader className="subtitle">A carefully selected marketplace for SaaS startups valued between $10K and $100K.</SubHeader>
        </div>
        <Row role="group" aria-label="Choose form">
          <button className="button" onClick={() => navigate("/sell")}>I am selling</button>
          <button className="button secondary" onClick={() => navigate("/buy")}>I am buying</button>
        </Row>
      </div>
    </div>
  );
}
 
