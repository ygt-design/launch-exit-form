import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
`

const Track = styled.div`
  display: flex;
  gap: 0;
  will-change: transform;
  animation: scrollReverse 32s linear infinite;

  @keyframes scrollReverse {
    from { transform: translateX(-50%); }
    to { transform: translateX(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
  }
`

const Strip = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 15px 0;
  flex: 0 0 auto;

  @media (min-width: 768px) { gap: 32px; padding: 14px 0; }
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
  const text = 'Exclusive Perks for Early Sellers & Buyers'
  const items = Array.from({ length: 8 })

  return (
    <Wrapper aria-label="text carousel">
      <Track>
        <Strip>
          {items.map((_, i) => (
            <React.Fragment key={`a-${i}`}>
              <Phrase>{text}</Phrase>
              <Dot aria-hidden="true" />
            </React.Fragment>
          ))}
        </Strip>
        <Strip aria-hidden="true">
          {items.map((_, i) => (
            <React.Fragment key={`b-${i}`}>
              <Phrase>{text}</Phrase>
              <Dot aria-hidden="true" />
            </React.Fragment>
          ))}
        </Strip>
      </Track>
    </Wrapper>
  )
}


