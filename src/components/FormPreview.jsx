import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
  IconCog, 
  IconBrain, 
  IconUsers, 
  IconEye,
  IconLock,
  IconStar,
  IconMessageCircle,
  IconBarChart,
  IconCheckSquare,
  IconPalette
} from './icons';

const PreviewContainer = styled.div`
  position: sticky;
  top: 80px;
  display: flex;
  justify-content: center;
  align-self: flex-start;
  height: fit-content;
  
  @media (max-width: 768px) {
    position: static;
    margin-bottom: 16px;
    align-self: stretch;
  }
`;

const PreviewCard = styled.div`
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: #111315;
  padding: 14px;
  width: clamp(280px, 90vw, 360px);
  opacity: ${props => props.hasContent ? 1 : 0.6};
  transition: opacity 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  @media (min-width: 1025px) {
    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
`;

const HLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

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
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.01em;
  font-size: clamp(16px, 2.6vw, 20px);
  color: ${props => props.isEmpty ? 'var(--muted)' : 'var(--foreground)'};
`;

const Price = styled.div`
  color: var(--primary);
  font-weight: 700;
  font-size: clamp(16px, 2.6vw, 20px);
  color: ${props => props.isEmpty ? 'var(--muted)' : 'var(--primary)'};
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
  margin: 12px 0;
`;

const Badge = styled.span`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: #171a1d;
  font-size: 12px;
  color: var(--foreground);
  &.premium { 
    background: rgba(255, 215, 0, 0.12); 
    border-color: rgba(255, 215, 0, 0.35); 
    color: #FFD700;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
`;

const Preview = styled.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: #0f1113;
  margin-bottom: 14px;
`;

const PreviewImg = styled.div`
  width: 100%;
  height: clamp(100px, 28vw, 120px);
  filter: blur(2px);
  background: linear-gradient(135deg, #181a1c, #0e1012);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-size: 12px;
`;

const Meta = styled.div`
  position: absolute;
  bottom: 4px;
  right: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(8px);
  font-size: 11px;
  line-height: 1;
  color: #fff;
  white-space: nowrap;
  max-width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LockWrap = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  
  svg { width: 28px; height: 28px; }
`;

const LockIcon = () => (<IconLock />);

const Description = styled.p`
  color: var(--foreground);
  margin: 6px 0 14px;
  font-size: 13px;
  line-height: 1.5;
  min-height: calc(1.5em * 2);
  color: ${props => props.isEmpty ? 'var(--muted)' : 'var(--foreground)'};
`;

const Footer = styled.div`
  display: grid;
  gap: 12px;
`;

const Tech = styled.div`
  display: grid;
  gap: 8px;
`;

const TechTitle = styled.div`
  font-weight: 600;
  font-size: 13px;
`;

const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  gap: 6px 6px;
`;

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
`;

const CTA = styled.button.attrs({ className: "button secondary" })`
  width: 100%;
  opacity: 0.6;
  cursor: not-allowed;
  font-size: 12px;
  padding: 8px 12px;
  height: 36px;
`;


// Seller form preview component
export function SellerFormPreview({ formData }) {
  const hasContent = formData.startupName || formData.category || formData.mrr;
  
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Team Chat': <IconMessageCircle />,
      'CRM': <IconUsers />,
      'HR': <IconUsers />,
      'Operations': <IconCog />,
      'Tasks': <IconCheckSquare />,
      'Analytics': <IconBarChart />,
      'Design': <IconPalette />,
      'AI Tools': <IconBrain />,
      'Other': <IconCog />
    };
    return iconMap[category] || <IconCog />;
  };

  const getMRRDisplay = (mrr) => {
    if (!mrr) return 'MRR TBD';
    return mrr;
  };


  const getDescription = () => {
    if (!formData.startupName) return 'Your startup description will appear here...';
    if (formData.description) return formData.description;
    return `A ${formData.category || 'promising'} startup${formData.stage ? ` in ${formData.stage}` : ''} looking for the right buyer.`;
  };

  return (
    <PreviewContainer>
      <PreviewCard hasContent={hasContent}>
          <Header>
            <HLeft>
              <IconCircle>{getCategoryIcon(formData.category)}</IconCircle>
              <Title isEmpty={!formData.startupName}>
                {formData.startupName || 'Your Startup Name'}
              </Title>
            </HLeft>
            <Price isEmpty={!formData.mrr}>
              {getMRRDisplay(formData.mrr)}
            </Price>
          </Header>

          <Badges>
            <Badge className="premium">
              <IconStar />
              Premium Listing
            </Badge>
            {formData.stage && (
              <Badge>{formData.stage}</Badge>
            )}
          </Badges>

          <Preview>
            <PreviewImg>
              {formData.productUrl ? 'Product Preview' : 'Product Screenshot'}
            </PreviewImg>
            <Meta><IconEye />Preview</Meta>
            <LockWrap><LockIcon /></LockWrap>
          </Preview>

          <Description isEmpty={!formData.startupName}>
            {getDescription()}
          </Description>

          <Footer>
            <Tech>
              <TechTitle>Tech Stack</TechTitle>
              <TagGrid>
                <Tag>{formData.category || 'Category'}</Tag>
                <Tag>Verified</Tag>
                <Tag>Active</Tag>
              </TagGrid>
            </Tech>
            <CTA disabled>Complete the Form to Get Premium Listing</CTA>
          </Footer>
      </PreviewCard>
    </PreviewContainer>
  );
}


SellerFormPreview.propTypes = {
  formData: PropTypes.shape({
    startupName: PropTypes.string,
    category: PropTypes.string,
    mrr: PropTypes.string,
    stage: PropTypes.string,
    productUrl: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
