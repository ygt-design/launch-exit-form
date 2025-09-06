import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logoUrl from '../assets/images/launch_exit_logo.svg'

const Bar = styled.nav`
  position: fixed;
  inset: 12px 0 auto 0;
  z-index: 1000;
  background: transparent;
  pointer-events: none;
`

const Inner = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Island = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 14px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgba(17, 19, 21, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  pointer-events: auto;
  width: min(700px, 100% - 20px);
`

const Logo = styled.img`
  height: 15px;
  width: auto;
  display: block;

  @media (min-width: 480px) {
    height: 20px;
  }
`

const RightLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.9;
  transition: opacity 160ms ease, transform 160ms ease;
  will-change: opacity, transform;
  
  &:hover { opacity: 1; transform: translateY(-0.5px); }
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
            <RightLink href="#" onClick={(e) => e.preventDefault()}>Join our team →</RightLink>
          </Island>
        </Inner>
      </Bar>
      <Spacer aria-hidden="true" />
    </>
  )
}


