import React from 'react'
import styled from 'styled-components'
import Marquee from 'react-fast-marquee'
import ListingCard from './ListingCard.jsx'
import listingsData from '../data/listings.json'

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: clamp(96px, 12vw, 480px);
    pointer-events: none;
    z-index: 3;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(11,11,12, 1) 0%,
      rgba(11,11,12, 0.85) 35%,
      rgba(11,11,12, 0.0) 100%
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      to left,
      rgba(11,11,12, 1) 0%,
      rgba(11,11,12, 0.85) 35%,
      rgba(11,11,12, 0.0) 100%
    );
  }

  @media (max-width: 480px) {
    &::before,
    &::after {
      width: 0;
      background: none;
    }
  }
`

export default function ListingsCarousel() {
  const listings = listingsData
  return (
    <Wrapper>
      <Marquee gradient={false} speed={40} pauseOnHover={false} direction="left" autoFill>
        {listings.map((l, i) => (
          <div key={i} style={{ width: 'min(360px, 94vw)', marginRight: 8 }}>
            <ListingCard {...l} ctaLabel="Message Founder" />
          </div>
        ))}
      </Marquee>
    </Wrapper>
  )
}


