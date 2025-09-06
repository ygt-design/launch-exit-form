import React, { useRef } from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const Wrapper = styled.div`
  width: 100svw;
  max-width: 100svw;
  margin-left: calc(50% - 50svw);
  margin-right: calc(50% - 50svw);
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  
  /* Ensure perfectly constant velocity */
  .swiper-wrapper { transition-timing-function: linear !important; }
`

/* movement handled by Swiper */

const Strip = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 0;

  @media (min-width: 768px) { gap: 28px; padding: 14px 0; }
  @media (min-width: 1024px) { gap: 40px; padding: 16px 0; }
`

const Phrase = styled.span`
  color: var(--foreground);
  white-space: nowrap;
  font-weight: 500;
  letter-spacing: 0.01em;
`

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  display: inline-block;

  @media (min-width: 768px) { width: 8px; height: 8px; }
  @media (min-width: 1024px) { width: 10px; height: 10px; }
`

export default function TextCarousel() {
  const swiperRef = useRef(null)
  const text = 'Exclusive Perks for Early Sellers & Buyers'
  const items = Array.from({ length: 14 })

  return (
    <Wrapper aria-label="text carousel">
      <Swiper
        modules={[Autoplay]}
        loop
        speed={22000}
        slidesPerView={'auto'}
        spaceBetween={24}
        allowTouchMove={false}
        simulateTouch={false}
        preventClicks={true}
        preventClicksPropagation={true}
        slideToClickedSlide={false}
        noSwiping={true}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false, reverseDirection: true, stopOnLastSlide: false, waitForTransition: false }}
        loopAdditionalSlides={50}
        loopedSlides={14}
        centeredSlides={false}
        breakpoints={{ 768: { spaceBetween: 32 }, 1024: { spaceBetween: 40 } }}
        style={{ padding: '0 0 0 0' }}
        onSwiper={(s) => { swiperRef.current = s; s.autoplay.start(); }}
        onTouchStart={(s) => { s.params.autoplay.disableOnInteraction = false; s.autoplay.start(); }}
        onTouchEnd={(s) => { s.params.autoplay.disableOnInteraction = false; s.autoplay.start(); }}
        onClick={(s) => { s.params.autoplay.disableOnInteraction = false; s.autoplay.start(); }}
      >
        {items.map((_, i) => (
          <SwiperSlide key={i} style={{ width: 'auto' }}>
            <Strip>
              <Phrase>{text}</Phrase>
              <Dot aria-hidden="true" />
            </Strip>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  )
}


