import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logoUrl from '../assets/images/launch_exit_logo.svg'

const Bar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 12px 0 auto 0;
  z-index: 1000;
  background: transparent;
  pointer-events: none;

`

const Inner = styled.div`
  width: 100%;
  max-width: var(--container);
  text-align: center;
  margin: 0 auto;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`

const Island = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 15px 20px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgba(17, 19, 21, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  pointer-events: auto;
  width: 100%;

  @media (max-width: 480px) {
    padding: 18px 16px;
  }
`


const Logo = styled.img`
  height: 12px;
  width: auto;
  display: block;

  @media (min-width: 480px) {
    height: 18px;
  }

`

const RightLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  padding: 6px 0px;
  border-radius: 6px;
  opacity: 0.9;
  transition: all 160ms ease;
  
  &:hover {
    background: rgba(255, 76, 0, 0.15);
    padding: 6px 12px;
    border-color: rgba(255, 76, 0, 0.4);
  }
`

const Spacer = styled.div`
  height: 64px;
  @media (min-width: 480px) { height: 68px; }
`

export default function Navbar() {
  return (
    <>
      <Bar>
        <Inner>
          <Island>
            <Link to="/" aria-label="Go to homepage">
              <Logo src={logoUrl} alt="LaunchExit" />
            </Link>
            <RightLink href="mailto:hello@launchexit.com">Contact Us</RightLink>
          </Island>
        </Inner>
      </Bar>
      <Spacer aria-hidden="true" />
    </>
  )
}


