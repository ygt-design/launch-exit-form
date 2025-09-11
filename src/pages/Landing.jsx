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
  padding: 30px 0 70px 0;
  display: grid;
  gap: 12px;

  @media (max-width: 480px) {
    padding: 20px 6px 40px 6px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 20px;  
  align-items: center;
  margin-bottom: 0;
`;

const Note = styled.p`
  margin: 8px 0 0;
  color: var(--muted);
  text-align: center;
  font-size: 14px;
`;

const BlinkingCircle = styled.div`
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: blink 1.5s ease-in-out infinite;
  
  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0.3;
    }
  }
`;

const ComingSoonBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 20px;
  color: #22c55e;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const BackdropGlow = styled.div`
  position: absolute;
  left: 50%;
  top: 31%;
  transform: translate(-50%, -50%);
  width: clamp(420px, 60vw, 960px);
  height: clamp(420px, 60vw, 960px);
  border-radius: 50%;
  background: radial-gradient(circle, hsla(17.88235294117647, 100%, 50%, 0.5) 0%, rgba(255, 76, 0, 0.25) 45%, rgba(255, 76, 0, 0) 70%);
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
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <ComingSoonBadge>
              <BlinkingCircle />
              Coming Soon
            </ComingSoonBadge>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <Header className="title" $visible={isLoaded}>What you've created is valuable. <Emphasis>Let the right buyer see its worth.</Emphasis></Header>
            <SubHeader className="subtitle" $visible={isLoaded}> We’re building the only curated marketplace designed exclusively for bootstrapped SaaS startups. Founding sellers get 0% upfront fees, verified premium buyers, and fast, transparent exits — without brokers, lock-ins, or noise from non-SaaS listings.
            <br/> <Emphasis>Join the waitlist to be first in line.</Emphasis> </SubHeader>
          </div>
          <div style={{ marginTop: '8px' }}>
            <Row role="group" aria-label="Join waitlist">
              <button className="button primary" onClick={() => navigate("/sell")}>Join as a Founding Seller</button>
              <button className="button secondary" onClick={() => navigate("/buy")}>Join as a Buyer</button>
            </Row>
          </div>
        </HeaderSection>
        <div style={{ display: 'grid', gap: 6 }}>
          <ListingsCarousel />
          {/* <TextCarousel /> */}
        </div>
        <Note>Early access • Premium Listing perk • Priority visibility on launch</Note>
      </div>
    </div>
  );
}
 
