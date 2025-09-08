import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
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
  padding: 20px 20px;
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
  height: 15px;
  width: auto;
  display: block;
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

const SwitchBtn = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1;
  opacity: 0.95;
  transition: opacity 160ms ease, transform 160ms ease;
  &:hover { opacity: 1; transform: translateY(-0.5px); }
`

const Spacer = styled.div`
  height: 64px;
  @media (min-width: 480px) { height: 68px; }
`

export default function Navbar() {
  const location = useLocation()
  const pathname = location.pathname || '/'
  const isSeller = pathname.startsWith('/sell')
  const isBuyer = pathname.startsWith('/buy')
  const isForm = isSeller || isBuyer
  const switchToPath = isSeller ? '/buy' : '/sell'
  const switchLabel = isSeller ? 'Switch to buyer' : 'Switch to seller'
  return (
    <>
      <Bar>
        <Inner>
          <Island>
            <Link to="/" aria-label="Go to homepage">
              <Logo src={logoUrl} alt="LaunchExit" />
            </Link>
            {isForm ? (
              <SwitchBtn to={switchToPath}>{switchLabel}</SwitchBtn>
            ) : (
              <RightLink href="#" onClick={(e) => e.preventDefault()}>Join our team →</RightLink>
            )}
          </Island>
        </Inner>
      </Bar>
      <Spacer aria-hidden="true" />
    </>
  )
}


