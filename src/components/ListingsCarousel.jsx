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
`

export default function ListingsCarousel() {
  const listings = listingsData
  return (
    <Wrapper>
      <Marquee gradient={false} speed={40} pauseOnHover={false} direction="left" autoFill>
        {listings.map((l, i) => (
          <div key={i} style={{ width: 'min(360px, 86vw)', marginRight: 16 }}>
            <ListingCard {...l} ctaLabel="Message Founder" />
          </div>
        ))}
      </Marquee>
    </Wrapper>
  )
}


