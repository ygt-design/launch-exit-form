import React, { useRef } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import ListingCard from './ListingCard.jsx'
import listingsData from '../data/listings.json'

const Wrapper = styled.div`
  width: 100svw;
  max-width: 100svw;
  margin-left: calc(50% - 50svw);
  margin-right: calc(50% - 50svw);
  overflow: hidden;
  .swiper-wrapper { transition-timing-function: linear !important; }
  .swiper-slide { width: auto !important; }
`

export default function ListingsCarousel() {
  const swiperRef = useRef(null)
  const listings = listingsData
  // Repeat to guarantee overflow for smooth continuous scrolling
  const repeatedListings = Array.from({ length: 3 }).flatMap(() => listings)

  return (
    <Wrapper>
      <Swiper
        modules={[Autoplay]}
        loop
        speed={500000}
        slidesPerView={'auto'}
        spaceBetween={16}
        observer
        observeParents
        allowTouchMove={false}
        simulateTouch={false}
        preventClicks={true}
        preventClicksPropagation={true}
        slideToClickedSlide={false}
        noSwiping={true}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false, stopOnLastSlide: false, waitForTransition: false }}
        loopAdditionalSlides={50}
        loopedSlides={repeatedListings.length}
        loopPreventsSliding={false}
        centeredSlides={false}
        breakpoints={{ 768: { spaceBetween: 20 }, 1024: { spaceBetween: 24 } }}
        style={{ padding: '8px 20px' }}
        onSwiper={(s) => { swiperRef.current = s; s.autoplay.start(); }}
        onTouchStart={(s) => { s.params.autoplay.disableOnInteraction = false; s.autoplay.start(); }}
        onTouchEnd={(s) => { s.params.autoplay.disableOnInteraction = false; s.autoplay.start(); }}
        onClick={(s) => { s.params.autoplay.disableOnInteraction = false; s.autoplay.start(); }}
      >
        {repeatedListings.map((l, i) => (
          <SwiperSlide key={i} style={{ width: 'min(360px, 86vw)' }}>
            <ListingCard {...l} ctaLabel="Message Founder" />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  )
}


