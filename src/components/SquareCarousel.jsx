import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
`

const Square = styled.div`
  flex: 0 0 auto;
  width: 150px;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: transparent;

  @media (min-width: 768px) { width: 160px; }
  @media (min-width: 1024px) { width: 200px; }
`

export default function SquareCarousel() {
  const items = Array.from({ length: 14 })

  return (
    <Wrapper aria-label="image carousel">
      <Swiper
        modules={[Autoplay]}
        loop
        speed={30000}
        slidesPerView={'auto'}
        spaceBetween={12}
        allowTouchMove={false}
        simulateTouch={false}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
        loopAdditionalSlides={20}
        observer={true}
        observeParents={true}
        breakpoints={{ 768: { spaceBetween: 16 }, 1024: { spaceBetween: 24 } }}
        style={{ padding: '0 0 0 0' }}
      >
        {items.map((_, i) => (
          <SwiperSlide key={i} style={{ width: 'auto' }}>
            <Square />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  )
}


