import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { resolveIconFromEmoji } from './icons.jsx'
import { IconEye } from './icons.jsx'

const Card = styled.article`
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: #111315;
  padding: 14px;
  width: clamp(280px, 90vw, 360px);
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
`

const HLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const IconCircle = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #1b1e21;
  color: #fff;
  font-size: 13px;
  @media (min-width: 480px) { width: 26px; height: 26px; font-size: 15px; }
`

const Title = styled.h3`
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.01em;
  font-size: clamp(16px, 2.6vw, 20px);
`

const Price = styled.div`
  color: var(--primary);
  font-weight: 700;
  font-size: clamp(16px, 2.6vw, 20px);
`

const Badges = styled.div`
  display: flex;
  gap: 8px;
  margin: 12px 0;
`

const Badge = styled.span`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #171a1d;
  font-size: 12px;
  color: var(--foreground);
  &.hot { background: rgba(255, 76, 0, 0.12); border-color: rgba(255, 76, 0, 0.35); }
`

const Preview = styled.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: #0f1113;
  margin-bottom: 14px;
`

const PreviewImg = styled.div`
  width: 100%;
  height: clamp(100px, 28vw, 120px);
  filter: blur(2px);
  background: linear-gradient(135deg, #181a1c, #0e1012);
`

const Meta = styled.div`
  position: absolute;
  top: 10px;
  right: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 10px;
  background: rgba(0,0,0,0.5);
  box-shadow: 0 2px 8px rgba(0,0,0,0.35);
  backdrop-filter: blur(8px);
  font-size: 12px;
  line-height: 1;
  color: #fff;
  white-space: nowrap;
  max-width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  
  svg { width: 16px; height: 16px; display: inline-block; }
`


const LockWrap = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
`

const LockIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7 10V8a5 5 0 1 1 10 0v2h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2 0h6V8a3 3 0 1 0-6 0v2Z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
)

const Description = styled.p`
  color: var(--foreground);
  margin: 6px 0 14px;
  font-size: 13px;
  line-height: 1.5;
  min-height: calc(1.5em * 2);
`

const Footer = styled.div`
  display: grid;
  gap: 12px;
`

const Tech = styled.div`
  display: grid;
  gap: 8px;
`

const TechTitle = styled.div`
  font-weight: 600;
  font-size: 13px;
`

const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  gap: 6px 6px;
`

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 6px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #1a1d20;
  font-size: 11px;
`

const CTA = styled.button.attrs({ className: "button primary" })`
  width: 100%;
`

export default function ListingCard({ icon, title, price, badges = [], imageSrc, viewersText = '1 buyer discussing', description, techStack = [], ctaLabel = 'Message Founder', onCta }) {
  return (
    <Card>
      <Header>
        <HLeft>
          <IconCircle aria-hidden>{typeof icon === 'string' ? resolveIconFromEmoji(icon) : icon}</IconCircle>
          <Title className="title">{title}</Title>
        </HLeft>
        <Price>{price}</Price>
      </Header>

      {!!badges.length && (
        <Badges>
          {badges.map((b, i) => (
            <Badge key={i} className={b.variant === 'hot' ? 'hot' : undefined}>{b.label || b}</Badge>
          ))}
        </Badges>
      )}

      <Preview>
        <PreviewImg style={imageSrc ? { backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(2px) brightness(0.7)' } : undefined} />
        <Meta><IconEye />{viewersText}</Meta>
        <LockWrap><LockIcon /></LockWrap>
      </Preview>

      {description && (<Description>{description}</Description>)}

      <Footer>
        <Tech>
          <TechTitle>Tech Stack</TechTitle>
          <TagGrid>
            {techStack.map((t) => (<Tag key={t}>{t}</Tag>))}
          </TagGrid>
        </Tech>
        <CTA onClick={onCta}>{ctaLabel}</CTA>
      </Footer>
    </Card>
  )
}

ListingCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  badges: PropTypes.array,
  imageSrc: PropTypes.string,
  viewersText: PropTypes.string,
  description: PropTypes.string,
  techStack: PropTypes.array,
  ctaLabel: PropTypes.string,
  onCta: PropTypes.func,
}


