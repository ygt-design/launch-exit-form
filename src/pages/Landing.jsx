import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ListingsCarousel from "../components/ListingsCarousel.jsx";
// import TextCarousel from "../components/TextCarousel.jsx";

const Header = styled.h1`
  font-size: 40px;
  margin: 0;
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: translateY(${props => (props.$visible ? '0' : '6px')});
  transition: opacity 600ms ease 0ms, transform 600ms ease 0ms;

  @media (max-width: 480px) {
    font-size: 35px;
  }
`;

const SubHeader = styled.p`
  margin: 0;
  line-height: 1.5;
  color: var(--muted);
  opacity: ${props => (props.$visible ? 1 : 0)};
  transform: translateY(${props => (props.$visible ? '0' : '8px')});
  transition: opacity 700ms ease 120ms, transform 700ms ease 120ms;
`;

const Emphasis = styled.span`
  color: var(--primary);
`;


const HeaderSection = styled.div`
  padding: 55px 0;
  display: grid;
  gap: 18px;

  @media (max-width: 480px) {
    padding: 28px 6px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 12px;  
  align-items: center;
  margin-bottom: 0;
`;

const Note = styled.p`
  margin: 8px 0 0;
  color: var(--muted);
  text-align: center;
  font-size: 14px;
`;

const BackdropGlow = styled.div`
  position: absolute;
  left: 50%;
  top: 31%;
  transform: translate(-50%, -50%);
  width: clamp(420px, 60vw, 960px);
  height: clamp(420px, 60vw, 960px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 76, 0, 0.5) 0%, rgba(255, 76, 0, 0.25) 45%, rgba(255, 76, 0, 0) 70%);
  filter: blur(80px);
  opacity: 0.45;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 480px) {
    width: 320px;
    height: 320px;
    filter: blur(60px);
    opacity: 0.55;
    left: 20%;
    top: 20%;
  }
`;

export default function Landing() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const onLoad = () => setIsLoaded(true);
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        setIsLoaded(true);
        return;
      }
      window.addEventListener('load', onLoad, { once: true });
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  return (
    <div className="container">
      <div className="stack" style={{ gap: 12 }}>
        <BackdropGlow />
        <HeaderSection>
          <div style={{ display: 'grid', gap: 12 }}>
            <Header className="title" $visible={isLoaded}>What you’ve created is valuable. <Emphasis>Let the right buyer see its worth.</Emphasis></Header>
            <SubHeader className="subtitle" $visible={isLoaded}>Buy and sell profitable bootstrapped micro-SaaS. Premium-Vetted listings, clear metrics, human review.</SubHeader>
          </div>
          <Row role="group" aria-label="Choose form">
            <button className="button primary" onClick={() => navigate("/sell")}>I am selling</button>
            <button className="button secondary" onClick={() => navigate("/buy")}>I am buying</button>
          </Row>
        </HeaderSection>
        <div style={{ display: 'grid', gap: 6 }}>
          <ListingsCarousel />
          {/* <TextCarousel /> */}
        </div>
        <Note>Curated only • Transparent metrics • Human review</Note>
      </div>
    </div>
  );
}
 
