import React from "react";
import styled from "styled-components";
import logoImage from "../assets/images/launch_exit_logo.svg";
import { IconMail } from "./icons.jsx";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  padding: 0 12px 32px;
  
  @media (max-width: 768px) {
    margin-top: 60px;
    padding: 0 16px 24px;
  }
  
  @media (max-width: 480px) {
    margin-top: 40px;
    padding: 0 16px 20px;
  }
`;

const FooterContent = styled.div`
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterIsland = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  gap: 32px;
  padding: 24px 24px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    padding: 20px 16px;
    gap: 16px;
  }
`;

const BrandSection = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    order: 1;
  }
`;

const Logo = styled.img`
  height: 24px;
  width: auto;
  display: block;
  
  @media (max-width: 480px) {
    height: 20px;
  }
`;

const JoinTeamLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.9;
  transition: opacity 160ms ease, transform 160ms ease;
  will-change: opacity, transform;
  
  &:hover { 
    opacity: 1; 
    transform: translateY(-0.5px); 
  }
  
  &:focus {
    outline: none;
    opacity: 1;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  text-align: right;
  
  @media (max-width: 768px) {
    align-items: flex-start;
    text-align: left;
    order: 2;
    margin-top: 20px;
  }
`;



const JoinTeamSection = styled.div`
  display: flex;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const ContactEmail = styled.a`
  font-size: 15px;
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 0px;
  border-radius: 6px;
  transition: all 160ms ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255, 76, 0, 0.15);
    padding: 6px 12px;
    border-color: rgba(255, 76, 0, 0.4);
  }
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 4px 8px;
  }
`;




const CopyrightText = styled.p`
  margin: 35px 0 0 0;
  font-size: 12px;
  color: #ffffff;
  opacity: 0.5;
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;


export default function Footer() {
  const handleJoinTeamClick = (e) => {
    e.preventDefault();
    // Placeholder for join team functionality
    console.log("Join team clicked");
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterIsland>
          <BrandSection>
            <Logo src={logoImage} alt="LaunchExit" />
          </BrandSection>
          
          <RightSection>
            <ContactEmail 
              href="mailto:hello@launchexit.com"
              aria-label="Send email to hello@launchexit.com"
            >
              <IconMail />
              hello@launchexit.com
            </ContactEmail>
            
            <JoinTeamSection>
              <JoinTeamLink 
                href="#" 
                onClick={handleJoinTeamClick}
                aria-label="Join our team"
              >
                Join our team →
              </JoinTeamLink>
            </JoinTeamSection>
            
            <CopyrightText>
              © {new Date().getFullYear()} LaunchExit. All rights reserved.
            </CopyrightText>
          </RightSection>
        </FooterIsland>
      </FooterContent>
    </FooterContainer>
  );
}

