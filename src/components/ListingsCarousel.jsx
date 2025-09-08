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
  border-top: 1px solid var(--border);
  padding-top: 20px;
  margin-top: 14px;
  margin-bottom: 14px;
  position: relative;
  --fade-size: 500px;

  @media (min-width: 1024px) {
    border-top: none;
    &::before, &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--fade-size);
      pointer-events: none;
      z-index: 2;
    }
    &::before { left: 0; background: linear-gradient(to right, var(--background) 0%, var(--background) 45%, transparent 100%); }
    &::after { right: 0; background: linear-gradient(to left, var(--background) 0%, var(--background) 45%, transparent 100%); }
  }
`

export default function ListingsCarousel() {
  const listings = listingsData
  return (
    <Wrapper>
      <Marquee gradient={false} speed={12} pauseOnHover={false} direction="left" autoFill>
        {listings.map((l, i) => (
          <div key={i} style={{ width: 'min(320px, 90vw)', marginRight: 8 }}>
            <ListingCard {...l} ctaLabel="Message Founder" />
          </div>
        ))}
      </Marquee>
    </Wrapper>
  )
}


