import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { IconCheck, IconStar, IconClock, IconTarget } from "../components/icons";
import { useLocation } from "react-router-dom";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const BuyerTheme = styled.div`
  --confirmation-primary: #00B4D8;
  --confirmation-primary-gradient: linear-gradient(135deg, #00B4D8 0%, #0077B6 100%);
  --confirmation-shadow-strong: rgba(0, 180, 216, 0.25);
`;

const SellerTheme = styled.div`
  --confirmation-primary: var(--primary);
  --confirmation-primary-gradient: var(--primary-gradient);
  --confirmation-shadow-strong: var(--primary-shadow-strong);
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--confirmation-primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  animation: ${pulse} 2s ease-in-out infinite;
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  background: var(--confirmation-primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: var(--muted);
  margin: 0;
  max-width: 600px;
  padding: 0 60px;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NextStepsCard = styled.div`
  background: #111315;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 35px 40px;
  width: 100%;
  max-width: 500px;
  margin-top: 16px;
`;



const CelebrationText = styled.div`
  font-size: 14px;
  color: var(--muted);
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  svg {
    width: 16px;
    height: 16px;
    animation: ${bounce} 1s ease-in-out;
  }
`;

export default function Confirmation() {
  const [showCelebration, setShowCelebration] = useState(false);
  const location = useLocation();
  
  // Detect if this is from buyer or seller form based on URL params
  const searchParams = new URLSearchParams(location.search);
  const isBuyer = searchParams.get('buyer') === '1';

  useEffect(() => {
    const timer = setTimeout(() => setShowCelebration(true), 1000);
    return () => clearTimeout(timer);
  }, []);


  const ThemeWrapper = isBuyer ? BuyerTheme : SellerTheme;

  return (
    <div className="container">
      <ThemeWrapper>
        <ConfirmationContainer>
        <SuccessIcon>
          <IconCheck />
        </SuccessIcon>
        
        <div>
          <Title> Thank You For Your Input! </Title> <br />
          <Subtitle>
            Welcome to the founding circle — the first members shaping our platform. We value your input and would like to optimize it to your needs.
          </Subtitle>
        </div>

        {/* <ActionButtons>
          <PrimaryButton to={isSeller ? "/buy" : "/sell"}>
            <IconTarget />
            {isSeller ? "Browse Buyers" : "List Your Startup"}
          </PrimaryButton>
          <SecondaryButton to="/">
            <IconStar />
            Back to Home
          </SecondaryButton>
        </ActionButtons> */}

        {showCelebration && (
          <CelebrationText>
            <IconStar />
            You&apos;re officially part of the future of startup exits!
          </CelebrationText>
        )}
        </ConfirmationContainer>
      </ThemeWrapper>
    </div>
  );
}
 
