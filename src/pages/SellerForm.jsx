import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import sellerData from "../data/seller.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IconCheck } from "../components/icons";
// import { SellerFormPreview } from "../components/FormPreview";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 14px;
  &.required::after {
    content: " *";
    color: var(--primary);
  }
`;

const Select = styled.select.attrs({ className: "select" })`
  &:focus-visible {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 76, 0, 0.15);
  }
`;
const Input = styled.input.attrs({ className: "input" })`
  &:focus-visible {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 76, 0, 0.15);
  }
`;


const Title = styled.h1`
  font-size: 32px;
  line-height: 1.2;
  padding: 16px 0;
  margin: 0;
  color: #ffffff;
  
  @media (max-width: 768px) {
    font-size: 24px;
    padding: 12px 0;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    padding: 10px 0;
  }
`;

const TitleBlue = styled.span`
  color: var(--primary);
  margin-right:5px;
`;

const Description = styled.p`
  margin: 6px 0 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 100%;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  
  @media (max-width: 1024px) {
    gap: 24px;
  }
`;


const Spinner = styled.span`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.6);
  border-top-color: #ffffff;
  animation: spin 700ms linear infinite;

  @keyframes spin { to { transform: rotate(360deg); } }
`;

const SubmitButton = styled.button.attrs({ className: "button primary" })`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 220px;
  width: 100%;
  
  @media (max-width: 480px) {
    min-width: auto;
  }
`;

const LabelText = styled.span`
  transition: opacity 160ms ease;
`;

const HelperText = styled.span`
  font-size: 12px;
  color: var(--muted);
`;

const SmallNote = styled.p`
  font-size: 12px;
  margin: 8px 0 0;
`;


const NavRow = styled.div`
  display: flex;
  gap: 12px;
`;

const InlineLink = styled.button`
  background: none;
  border: none;
  color: var(--accent);
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
`;

const StageProgressBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding: 0 8px;
  
  @media (max-width: 768px) {
    gap: 20px;
    margin-bottom: 32px;
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    gap: 16px;
    margin-bottom: 24px;
    padding: 0 8px;
  }
`;

const Stage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 12px 16px;
  border-radius: 8px;
  min-width: 80px;
  font-weight: 400;
  
  @media (max-width: 768px) {
    min-width: 60px;
  }
  
  @media (max-width: 480px) {
    min-width: 50px;
  }
  
  &:hover {
    background: rgba(255, 76, 0, 0.1);
  }
  
  &.completed {
    color: var(--primary);
    font-weight: 400;
  }
  
  &.current {
    color: var(--primary);
    font-weight: 400;
  }
  
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    
    &:hover {
      background: none;
    }
  }
`;

const StageNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  border: 2px solid var(--border);
  background: transparent;
  color: var(--muted);
  box-sizing: border-box;
  flex-shrink: 0;
  line-height: 1;
  position: relative;
  overflow: hidden;
  
  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
  
  ${Stage}.completed & {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    font-weight: 600;
  }
  
  ${Stage}.current & {
    border-color: var(--primary);
    color: var(--primary);
    background: transparent;
    font-weight: 600;
  }
`;

const StageLabel = styled.span`
  font-size: 12px;
  text-align: center;
  line-height: 1.2;
  color: inherit;
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;


const { mrrBands, growthRates, churnRates, teamSizes, monthlyCosts, acquisitionChannels, priceRanges } = sellerData;

export default function SellerForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    // Step 1
    fullName: "",
    email: "",
    startupName: "",
    productUrl: "",
    oneLiner: "",
    // Step 2
    mrr: "",
    growth: "",
    churn: "",
    // Step 3
    teamSize: "",
    monthlyCost: "",
    acquisition: "",
    // Step 4
    priceRange: "",
    reason: "",
    // Optional
    techStack: "",
    whyBuyerLikes: "",
    linkedIn: "",
    // Legacy compatibility
    stage: "",
    category: "",
    otherCategory: "",
    description: ""
  });
  const [touched, setTouched] = useState({});
  const [modalState, setModalState] = useState({ status: "idle", message: "" });
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Stage definitions
  const stages = [
    { id: 1, label: "Company & Business", fields: ['fullName', 'email', 'startupName', 'productUrl', 'oneLiner', 'mrr', 'growth', 'churn'] },
    { id: 2, label: "Operations & Deal", fields: ['teamSize', 'monthlyCost', 'acquisition', 'priceRange', 'reason', 'techStack', 'whyBuyerLikes', 'linkedIn'] }
  ];

  // Check if a step is completed
  const isStepCompleted = (stepId) => {
    const stepFields = stages.find(s => s.id === stepId)?.fields || [];
    return stepFields.every(field => form[field] && String(form[field]).trim() !== '');
  };

  // Update completed steps when form changes
  useEffect(() => {
    const newCompletedSteps = new Set();
    stages.forEach(stage => {
      if (isStepCompleted(stage.id)) {
        newCompletedSteps.add(stage.id);
      }
    });
    setCompletedSteps(newCompletedSteps);
  }, [form]);

  // Scroll to top when step changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [step]);

  // Additional scroll to top with delay as fallback
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [step]);

  // Navigate to a specific step
  const handleStepClick = (targetStep) => {
    // Allow navigation to completed steps or the next uncompleted step
    const canNavigate = completedSteps.has(targetStep) || targetStep === Math.min(...stages.filter(s => !completedSteps.has(s.id)).map(s => s.id));
    
    if (canNavigate) {
      setStep(targetStep);
    }
  }; 

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const startupNameRef = useRef(null);
  const productUrlRef = useRef(null);
  const oneLinerRef = useRef(null);
  const mrrRef = useRef(null);
  const growthRef = useRef(null);
  const churnRef = useRef(null);
  const teamRef = useRef(null);
  const costRef = useRef(null);
  const acquisitionRef = useRef(null);
  const priceRef = useRef(null);
  const reasonRef = useRef(null);

  // Load draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sellerFormDraft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm(prev => ({ ...prev, ...parsed }));
      }
    } catch { /* ignore unavailable localStorage */ }
  }, []);

  // Persist draft
  useEffect(() => {
    try {
      localStorage.setItem("sellerFormDraft", JSON.stringify(form));
    } catch { /* ignore unavailable localStorage */ }
  }, [form]);

  function update(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && value !== 'Other' ? { otherCategory: '' } : null),
    }));
    
    // Mark field as touched when user starts typing
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  function markTouched(name) {
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value ? emailRegex.test(value) : false;
      }
      case 'productUrl':
        try {
          // Try with protocol first
          new URL(value);
          return true;
        } catch {
          // If that fails, try adding https://
          try {
            new URL(`https://${value}`);
            return true;
          } catch {
            return false;
          }
        }
      case 'oneLiner':
        return value && value.trim().length > 0;
      case 'fullName':
      case 'startupName':
        return value && value.trim().length > 0;
      default:
        return value && value.trim().length > 0;
    }
  };

  const getErrorMessage = (name, value) => {
    if (!touched[name] || !value) return null;
    
    switch (name) {
      case 'email':
        return !validateField(name, value) ? 'Please enter a valid email address' : null;
      case 'productUrl':
        return !validateField(name, value) ? 'Please enter a valid URL' : null;
      case 'oneLiner':
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    // Enhanced validation with proper field validation
    const stepValid = {
      1: () => {
        const fields = ['fullName', 'email', 'startupName', 'productUrl', 'oneLiner', 'mrr', 'growth', 'churn'];
        return fields.every(field => form[field] && validateField(field, form[field]));
      },
      2: () => {
        const requiredFields = ['teamSize', 'monthlyCost', 'acquisition', 'priceRange', 'reason'];
        return requiredFields.every(field => form[field] && validateField(field, form[field]));
      },
    }[step]();
    
    if (!stepValid) {
      const map = {
        1: { fullName: true, email: true, startupName: true, productUrl: true, oneLiner: true, mrr: true, growth: true, churn: true },
        2: { teamSize: true, monthlyCost: true, acquisition: true, priceRange: true, reason: true },
      };
      setTouched(prev => ({ ...prev, ...map[step] }));
      
      // Focus on first invalid field
      if (step === 1) {
        const fields = ['fullName', 'email', 'startupName', 'productUrl', 'oneLiner', 'mrr', 'growth', 'churn'];
        const firstInvalidField = fields.find(field => !form[field] || !validateField(field, form[field]));
        const refs = { fullName: fullNameRef, email: emailRef, startupName: startupNameRef, productUrl: productUrlRef, oneLiner: oneLinerRef, mrr: mrrRef, growth: growthRef, churn: churnRef };
        if (firstInvalidField && refs[firstInvalidField]?.current) {
          refs[firstInvalidField].current.focus();
        }
      } else if (step === 2) {
        const fields = ['teamSize', 'monthlyCost', 'acquisition', 'priceRange', 'reason'];
        const firstInvalidField = fields.find(field => !form[field] || !validateField(field, form[field]));
        const refs = { teamSize: teamRef, monthlyCost: costRef, acquisition: acquisitionRef, priceRange: priceRef, reason: reasonRef };
        if (firstInvalidField && refs[firstInvalidField]?.current) {
          refs[firstInvalidField].current.focus();
        }
      }
      return;
    }
    
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  function onSubmit(e) {
    e.preventDefault();
    
    // Only submit on the last step
    if (step !== 2) {
      handleNext();
      return;
    }
    setModalState({ status: "loading", message: "Submitting your details" });
    const formspreeId = import.meta.env.VITE_FORMSPREE_SELLER_ID;
    if (!formspreeId) {
      setModalState({ status: "error", message: "Missing VITE_FORMSPREE_SELLER_ID in .env" });
      return;
    }
    const endpoint = `https://formspree.io/f/${formspreeId}`;
    const fd = new FormData();
    // Step 1 — Basics
    fd.append("fullName", form.fullName);
    fd.append("email", form.email);
    fd.append("startupName", form.startupName);
    fd.append("productUrl", form.productUrl);
    fd.append("oneLiner", form.oneLiner);
    // Step 2 — Business Snapshot
    fd.append("mrr", form.mrr);
    fd.append("growth", form.growth);
    fd.append("churn", form.churn);
    // Step 3 — Operations
    fd.append("teamSize", form.teamSize);
    fd.append("monthlyCost", form.monthlyCost);
    fd.append("acquisition", form.acquisition);
    // Step 4 — Deal Info
    fd.append("priceRange", form.priceRange);
    fd.append("reason", form.reason);
    // Optional
    if (form.techStack) fd.append("techStack", form.techStack);
    if (form.whyBuyerLikes) fd.append("whyBuyerLikes", form.whyBuyerLikes);
    if (form.linkedIn) fd.append("linkedIn", form.linkedIn);
    // Legacy keys for compatibility
    if (form.stage) fd.append("stage", form.stage);
    const categoryToSend = form.category === 'Other' ? form.otherCategory : form.category;
    if (categoryToSend) fd.append("category", categoryToSend);
    if (form.description) fd.append("description", form.description);
    fd.append("_replyto", form.email);
    fd.append("_subject", "FormExit — Seller waitlist");
    fetch(endpoint, { method: "POST", headers: { "Accept": "application/json" }, body: fd })
      .then(async (r) => {
        if (!r.ok) {
          let msg = "Request failed";
          const ct = r.headers.get("content-type") || "";
          if (ct.includes("application/json")) {
            const data = await r.json();
            msg = (data.errors && data.errors.map(e => e.message).join(", ")) || data.error || msg;
          } else {
            const text = await r.text();
            msg = text || msg;
          }
          throw new Error(msg);
        }
        setModalState({ status: "success", message: "Submission received. Redirecting…" });
        try { localStorage.removeItem("sellerFormDraft"); } catch { /* ignore */ }
        setTimeout(() => navigate("/thanks?seller=1"), 600);
      })
      .catch((err) => {
        setModalState({ status: "error", message: err?.message || "Something went wrong. Please try again." });
      });
  }

  return (
    <div className="container">
      <FormContainer>
        <div>
          <Title className="title"><TitleBlue>Join as a Founding Seller.</TitleBlue> Access a private pool of verified, vetted buyers.</Title>
          <Description className="subtitle">Share just the basics today — we&apos;ll draft your unique deal snapshot, earn you a &apos;verified seller&apos; badge that builds buyer trust, and match you instantly with the right leads.</Description>
        </div>
        <StageProgressBar>
          {stages.map((stage) => {
            const isCompleted = completedSteps.has(stage.id);
            const isCurrent = step === stage.id;
            const canNavigate = isCompleted || stage.id === Math.min(...stages.filter(s => !completedSteps.has(s.id)).map(s => s.id));
            
            return (
              <React.Fragment key={stage.id}>
                <Stage
                  className={`${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${!canNavigate ? 'disabled' : ''}`}
                  onClick={() => handleStepClick(stage.id)}
                  role="button"
                  tabIndex={canNavigate ? 0 : -1}
                  aria-label={`Go to ${stage.label} step`}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && canNavigate) {
                      e.preventDefault();
                      handleStepClick(stage.id);
                    }
                  }}
                >
                  <StageNumber>{isCompleted ? <IconCheck /> : stage.id}</StageNumber>
                  <StageLabel>{stage.label}</StageLabel>
                </Stage>
              </React.Fragment>
            );
          })}
        </StageProgressBar>
        <FormLayout>
          <Form onSubmit={onSubmit} noValidate>
            {step === 1 && (
              <>
                <Section className="control">
                  <Label htmlFor="fullName" className="required">Full Name</Label>
                  <Input id="fullName" ref={fullNameRef} name="fullName" type="text" placeholder="Your Name" required aria-invalid={touched.fullName && !form.fullName ? "true" : undefined} value={form.fullName} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  {touched.fullName && !form.fullName && <span className="error-text">Please enter your name.</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="email" className="required">Email</Label>
                  <Input id="email" ref={emailRef} name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" required aria-invalid={touched.email && (!form.email || !validateField('email', form.email)) ? "true" : undefined} value={form.email} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  {touched.email && !form.email && <span className="error-text">Please enter your email.</span>}
                  {getErrorMessage('email', form.email) && <span className="error-text">{getErrorMessage('email', form.email)}</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="startupName" className="required">Startup Name</Label>
                  <Input id="startupName" ref={startupNameRef} name="startupName" type="text" autoComplete="organization" placeholder="Startup Name" required aria-invalid={touched.startupName && !form.startupName ? "true" : undefined} value={form.startupName} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  {touched.startupName && !form.startupName && <span className="error-text">Startup name is required.</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="productUrl" className="required">Website / URL</Label>
                  <Input id="productUrl" ref={productUrlRef} name="productUrl" type="url" inputMode="url" autoComplete="url" spellCheck={false} placeholder="https://…" required aria-invalid={touched.productUrl && (!form.productUrl || !validateField('productUrl', form.productUrl)) ? "true" : undefined} value={form.productUrl} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  {touched.productUrl && !form.productUrl && <span className="error-text">Product link is required.</span>}
                  {getErrorMessage('productUrl', form.productUrl) && <span className="error-text">{getErrorMessage('productUrl', form.productUrl)}</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="oneLiner" className="required">One-liner</Label>
                  <Input id="oneLiner" ref={oneLinerRef} name="oneLiner" type="text" placeholder="What it does + who it's for" required aria-invalid={touched.oneLiner && (!form.oneLiner || !validateField('oneLiner', form.oneLiner)) ? "true" : undefined} value={form.oneLiner} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  <HelperText>What does it do + who is it for?</HelperText>
                  {touched.oneLiner && !form.oneLiner && <span className="error-text">Please add a short one-liner.</span>}
                  {getErrorMessage('oneLiner', form.oneLiner) && <span className="error-text">{getErrorMessage('oneLiner', form.oneLiner)}</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="mrr" className="required">Monthly Recurring Revenue (MRR)</Label>
                  <Select id="mrr" ref={mrrRef} name="mrr" required aria-invalid={touched.mrr && !form.mrr ? "true" : undefined} value={form.mrr} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                    <option value="" disabled>Select MRR</option>
                    {mrrBands.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  {touched.mrr && !form.mrr && <span className="error-text">Please select MRR.</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="growth" className="required">Growth (last 6–12 months)</Label>
                  <Select id="growth" ref={growthRef} name="growth" required aria-invalid={touched.growth && !form.growth ? "true" : undefined} value={form.growth} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                    <option value="" disabled>Select growth</option>
                    {growthRates.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  {touched.growth && !form.growth && <span className="error-text">Please select growth.</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="churn" className="required">Churn (last 6–12 months)</Label>
                  <Select id="churn" ref={churnRef} name="churn" required aria-invalid={touched.churn && !form.churn ? "true" : undefined} value={form.churn} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                    <option value="" disabled>Select churn</option>
                    {churnRates.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  {touched.churn && !form.churn && <span className="error-text">Please select churn.</span>}
                </Section>
              </>
            )}
            {step === 2 && (
              <>
                <Section className="control">
                  <Label htmlFor="teamSize" className="required">Team Size</Label>
                  <Select id="teamSize" ref={teamRef} name="teamSize" required aria-invalid={touched.teamSize && !form.teamSize ? "true" : undefined} value={form.teamSize} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                    <option value="" disabled>Select team size</option>
                    {teamSizes.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  {touched.teamSize && !form.teamSize && <span className="error-text">Please select team size.</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="monthlyCost" className="required">Monthly Operating Costs</Label>
                  <Select id="monthlyCost" ref={costRef} name="monthlyCost" required aria-invalid={touched.monthlyCost && !form.monthlyCost ? "true" : undefined} value={form.monthlyCost} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                    <option value="" disabled>Select monthly costs</option>
                    {monthlyCosts.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  {touched.monthlyCost && !form.monthlyCost && <span className="error-text">Please select monthly costs.</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="acquisition" className="required">Customer Acquisition</Label>
                  <Select id="acquisition" ref={acquisitionRef} name="acquisition" required aria-invalid={touched.acquisition && !form.acquisition ? "true" : undefined} value={form.acquisition} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                    <option value="" disabled>Select acquisition method</option>
                    {acquisitionChannels.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  {touched.acquisition && !form.acquisition && <span className="error-text">Please select acquisition method.</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="priceRange" className="required">Asking Price Range</Label>
                  <Select id="priceRange" ref={priceRef} name="priceRange" required aria-invalid={touched.priceRange && !form.priceRange ? "true" : undefined} value={form.priceRange} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                    <option value="" disabled>Select price</option>
                    {priceRanges.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                  {touched.priceRange && !form.priceRange && <span className="error-text">Please select a price range.</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="reason" className="required">Why Selling?</Label>
                  <Input id="reason" ref={reasonRef} name="reason" type="text" placeholder="Brief reason for selling" required aria-invalid={touched.reason && !form.reason ? "true" : undefined} value={form.reason} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  {touched.reason && !form.reason && <span className="error-text">Please provide a reason for selling.</span>}
                </Section>
                <Section className="control">
                  <Label htmlFor="techStack">Tech Stack (optional)</Label>
                  <Input id="techStack" name="techStack" type="text" placeholder="Next.js, Postgres, Cloudflare, Stripe" value={form.techStack} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                </Section>
                <Section className="control">
                  <Label htmlFor="whyBuyerLikes">Why a buyer will like this (1 sentence)</Label>
                  <Input id="whyBuyerLikes" name="whyBuyerLikes" type="text" placeholder="E.g., strong retention, low churn, profitable with low overheads" value={form.whyBuyerLikes} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                </Section>
                <Section className="control">
                  <Label htmlFor="linkedIn">LinkedIn Profile (optional)</Label>
                  <Input id="linkedIn" name="linkedIn" type="url" placeholder="https://linkedin.com/in/yourname" value={form.linkedIn} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                </Section>
              </>
            )}
            <NavRow>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {step > 1 ? (
                  <InlineLink type="button" onClick={handleBack} aria-label="Go to previous step">Back</InlineLink>
                ) : (
                  <div></div>
                )}
                
                {step < 2 ? (
                  <SubmitButton
                    type="submit"
                    aria-busy={modalState.status === 'loading'}
                    disabled={modalState.status === 'loading'}
                    style={{ minWidth: '120px', width: 'auto' }}
                  >
                    {modalState.status === 'loading' && (
                      <Spinner aria-hidden="true" />
                    )}
                    <LabelText style={{ opacity: modalState.status === 'loading' ? 0 : 1 }}>
                      Next
                    </LabelText>
                  </SubmitButton>
                ) : (
                  <SubmitButton
                    type="submit"
                    aria-busy={modalState.status === 'loading'}
                    disabled={modalState.status === 'loading'}
                    style={{ minWidth: '120px', width: 'auto' }}
                  >
                    {modalState.status === 'loading' && (
                      <Spinner aria-hidden="true" />
                    )}
                    <LabelText style={{ opacity: modalState.status === 'loading' ? 0 : 1 }}>
                      {modalState.status === 'success' ? 'Success! Redirecting…' : 'Join as a Founding Seller'}
                    </LabelText>
                  </SubmitButton>
                )}
              </div>
            </NavRow>
            {modalState.status === 'error' && (
              <div className="error-text" style={{ marginTop: 8 }}>{modalState.message}</div>
            )}
            <SmallNote className="subtitle">We&apos;ll never share your email. ~60–90 seconds total.</SmallNote>
          </Form>
        </FormLayout>
      </FormContainer>
    </div>
  );
}
 
