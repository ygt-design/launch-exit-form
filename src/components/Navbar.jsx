import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logoUrl from '../assets/images/launch_exit_logo.svg'

const Bar = styled.nav`
  border-bottom: 1px solid var(--border);
  background: var(--background);
`

const Inner = styled.div`
  width: 100%;
  max-width: var(--container);
  margin: 0 auto;
  padding: 25px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Logo = styled.img`
  height: 15px;
  width: auto;
  display: block;

  @media (min-width: 480px) {
    height: 20px;
  }
`

export default function Navbar() {
  return (
    <Bar>
      <Inner>
        <Link to="/" aria-label="Go to homepage">
          <Logo src={logoUrl} alt="LaunchExit" />
        </Link>
      </Inner>
    </Bar>
  )
}


