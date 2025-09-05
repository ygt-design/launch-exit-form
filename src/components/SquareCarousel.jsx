import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
`

const Track = styled.div`
  display: flex;
  gap: 0;
  will-change: transform;
  animation: scroll 28s linear infinite;

  @keyframes scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
  }
`

const Strip = styled.div`
  display: flex;
  gap: 12px;
  flex: 0 0 auto;

  @media (min-width: 768px) { gap: 16px; }
  @media (min-width: 1024px) { gap: 24px; }
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
  const items = Array.from({ length: 10 })

  return (
    <Wrapper aria-label="image carousel">
      <Track>
        <Strip>
          {items.map((_, i) => (
            <Square key={`a-${i}`} />
          ))}
        </Strip>
        <Strip aria-hidden="true">
          {items.map((_, i) => (
            <Square key={`b-${i}`} />
          ))}
        </Strip>
      </Track>
    </Wrapper>
  )
}


