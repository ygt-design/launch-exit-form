import React, { useEffect, useRef, useState } from "react";
import sellerData from "../data/seller.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SellerFormPreview } from "../components/FormPreview";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const Textarea = styled.textarea.attrs({ className: "input" })`
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  padding: 12px;
  font-size: 14px;
  
  &::placeholder {
    font-size: 12px;
  }
  
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--primary-gradient);
  border-radius: 2px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const { stages, mrrBands, growthRates, churnRates, teamSizes, monthlyCosts, acquisitionChannels, priceRanges, sellingReasons, categories } = sellerData;

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

  // Calculate form completion progress
  const calculateProgress = () => {
    const requiredFields = ['fullName', 'email', 'startupName', 'productUrl', 'oneLiner', 'mrr', 'growth', 'churn', 'teamSize', 'monthlyCost', 'acquisition', 'priceRange', 'reason'];
    const filledFields = requiredFields.filter(field => form[field] && String(form[field]).trim() !== '');
    return Math.round((filledFields.length / requiredFields.length) * 100);
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
  const otherCategoryRef = useRef(null);

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
  }

  function markTouched(name) {
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const stepValid = {
      1: () => form.fullName && form.email && form.startupName && form.productUrl && form.oneLiner,
      2: () => form.mrr && form.growth && form.churn,
      3: () => form.teamSize && form.monthlyCost && form.acquisition,
      4: () => form.priceRange && form.reason,
      5: () => true,
    }[step]();
    if (!stepValid) {
      const map = {
        1: { fullName: true, email: true, startupName: true, productUrl: true, oneLiner: true },
        2: { mrr: true, growth: true, churn: true },
        3: { teamSize: true, monthlyCost: true, acquisition: true },
        4: { priceRange: true, reason: true },
        5: {},
      };
      setTouched(prev => ({ ...prev, ...map[step] }));
      if (step === 1) { if (!form.fullName && fullNameRef.current) fullNameRef.current.focus(); else if (!form.email && emailRef.current) emailRef.current.focus(); else if (!form.startupName && startupNameRef.current) startupNameRef.current.focus(); else if (!form.productUrl && productUrlRef.current) productUrlRef.current.focus(); else if (!form.oneLiner && oneLinerRef.current) oneLinerRef.current.focus(); }
      if (step === 2) { if (!form.mrr && mrrRef.current) mrrRef.current.focus(); else if (!form.growth && growthRef.current) growthRef.current.focus(); else if (!form.churn && churnRef.current) churnRef.current.focus(); }
      if (step === 3) { if (!form.teamSize && teamRef.current) teamRef.current.focus(); else if (!form.monthlyCost && costRef.current) costRef.current.focus(); else if (!form.acquisition && acquisitionRef.current) acquisitionRef.current.focus(); }
      if (step === 4) { if (!form.priceRange && priceRef.current) priceRef.current.focus(); else if (!form.reason && reasonRef.current) reasonRef.current.focus(); }
      return;
    }
    if (step < 4) { setStep(step + 1); return; }
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
          <Description className="subtitle">Share just the basics today — we’ll draft your unique deal snapshot, earn you a ‘verified seller’ badge that builds buyer trust, and match you instantly with the right leads.</Description>
        </div>
        <ProgressBar>
          <ProgressFill progress={calculateProgress()} />
        </ProgressBar>
        <FormLayout>
          <FormSection>
            <Form onSubmit={onSubmit} noValidate>
              {step === 1 && (
                <>
                  <Section className="control">
                    <Label htmlFor="fullName" className="required">Full Name</Label>
                    <Input id="fullName" ref={fullNameRef} name="fullName" type="text" placeholder="Alex Carter" required aria-invalid={touched.fullName && !form.fullName ? "true" : undefined} value={form.fullName} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                    {touched.fullName && !form.fullName && <span className="error-text">Please enter your name.</span>}
                  </Section>
                  <Section className="control">
                    <Label htmlFor="email" className="required">Email</Label>
                    <Input id="email" ref={emailRef} name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" required aria-invalid={touched.email && !form.email ? "true" : undefined} value={form.email} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                    {touched.email && !form.email && <span className="error-text">Please enter your email.</span>}
                  </Section>
                  <Section className="control">
                    <Label htmlFor="startupName" className="required">Startup Name</Label>
                    <Input id="startupName" ref={startupNameRef} name="startupName" type="text" autoComplete="organization" placeholder="Acme Inc." required aria-invalid={touched.startupName && !form.startupName ? "true" : undefined} value={form.startupName} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                    {touched.startupName && !form.startupName && <span className="error-text">Startup name is required.</span>}
                  </Section>
                  <Section className="control">
                    <Label htmlFor="productUrl" className="required">Website / URL</Label>
                    <Input id="productUrl" ref={productUrlRef} name="productUrl" type="url" inputMode="url" autoComplete="url" spellCheck={false} placeholder="https://…" required aria-invalid={touched.productUrl && !form.productUrl ? "true" : undefined} value={form.productUrl} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                    {touched.productUrl && !form.productUrl && <span className="error-text">Product link is required.</span>}
                  </Section>
                  <Section className="control">
                    <Label htmlFor="oneLiner" className="required">One-liner (8–12 words)</Label>
                    <Input id="oneLiner" ref={oneLinerRef} name="oneLiner" type="text" placeholder="What it does + who it's for" required aria-invalid={touched.oneLiner && !form.oneLiner ? "true" : undefined} value={form.oneLiner} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                    <HelperText>What does it do + who is it for?</HelperText>
                    {touched.oneLiner && !form.oneLiner && <span className="error-text">Please add a short one-liner.</span>}
                  </Section>
                </>
              )}
              {step === 2 && (
                <>
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
                    <Label htmlFor="churn" className="required">Churn (monthly, rough)</Label>
                    <Select id="churn" ref={churnRef} name="churn" required aria-invalid={touched.churn && !form.churn ? "true" : undefined} value={form.churn} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                      <option value="" disabled>Select churn</option>
                      {churnRates.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    {touched.churn && !form.churn && <span className="error-text">Please select churn.</span>}
                  </Section>
                </>
              )}
              {step === 3 && (
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
                    <Label htmlFor="monthlyCost" className="required">Monthly Costs (infra + tools)</Label>
                    <Select id="monthlyCost" ref={costRef} name="monthlyCost" required aria-invalid={touched.monthlyCost && !form.monthlyCost ? "true" : undefined} value={form.monthlyCost} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                      <option value="" disabled>Select costs</option>
                      {monthlyCosts.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    {touched.monthlyCost && !form.monthlyCost && <span className="error-text">Please select monthly costs.</span>}
                  </Section>
                  <Section className="control">
                    <Label htmlFor="acquisition" className="required">Primary Acquisition Channel</Label>
                    <Select id="acquisition" ref={acquisitionRef} name="acquisition" required aria-invalid={touched.acquisition && !form.acquisition ? "true" : undefined} value={form.acquisition} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                      <option value="" disabled>Select channel</option>
                      {acquisitionChannels.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    {touched.acquisition && !form.acquisition && <span className="error-text">Please select a channel.</span>}
                  </Section>
                </>
              )}
              {step === 4 && (
                <>
                  <Section className="control">
                    <Label htmlFor="priceRange" className="required">Asking Price Range</Label>
                    <Select id="priceRange" ref={priceRef} name="priceRange" required aria-invalid={touched.priceRange && !form.priceRange ? "true" : undefined} value={form.priceRange} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                      <option value="" disabled>Select price</option>
                      {priceRanges.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    {touched.priceRange && !form.priceRange && <span className="error-text">Please select a price range.</span>}
                  </Section>
                  <Section className="control">
                    <Label htmlFor="reason" className="required">Reason for Selling</Label>
                    <Select id="reason" ref={reasonRef} name="reason" required aria-invalid={touched.reason && !form.reason ? "true" : undefined} value={form.reason} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                      <option value="" disabled>Select reason</option>
                      {sellingReasons.map(s => <option key={s} value={s}>{s}</option>)}
                    </Select>
                    {touched.reason && !form.reason && <span className="error-text">Please select a reason.</span>}
                  </Section>
                </>
              )}
              {step === 5 && (
                <>
                  <Section className="control">
                    <Label htmlFor="techStack">Tech Stack (optional)</Label>
                    <Input id="techStack" name="techStack" type="text" placeholder="Next.js, Postgres, Cloudflare, Stripe" value={form.techStack} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  </Section>
                  <Section className="control">
                    <Label htmlFor="whyBuyerLikes">Why a buyer will like this (1 sentence)</Label>
                    <Input id="whyBuyerLikes" name="whyBuyerLikes" type="text" placeholder="E.g., strong retention, low churn, profitable with low overheads" value={form.whyBuyerLikes} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  </Section>
                  <Section className="control">
                    <Label htmlFor="linkedIn">LinkedIn (optional)</Label>
                    <Input id="linkedIn" name="linkedIn" type="url" inputMode="url" placeholder="https://www.linkedin.com/in/username" value={form.linkedIn} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  </Section>
                </>
              )}
              <NavRow>
                {step > 1 && (
                  <InlineLink type="button" onClick={() => setStep(step - 1)} aria-label="Go to previous step">Back</InlineLink>
                )}
              </NavRow>
              <div>
                <SubmitButton
                  type="submit"
                  aria-busy={modalState.status === 'loading'}
                  disabled={modalState.status === 'loading'}
                >
                  {modalState.status === 'loading' && (
                    <Spinner aria-hidden="true" />
                  )}
                  <LabelText style={{ opacity: modalState.status === 'loading' ? 0 : 1 }}>
                    {step < 4 ? 'Continue' : (modalState.status === 'success' ? 'Success! Redirecting…' : 'Join as a Founding Seller')}
                  </LabelText>
                </SubmitButton>
                {modalState.status === 'error' && (
                  <div className="error-text" style={{ marginTop: 8 }}>{modalState.message}</div>
                )}
                <SmallNote className="subtitle">We&apos;ll never share your email. ~60–90 seconds total.</SmallNote>
              </div>
            </Form>
          </FormSection>
          <SellerFormPreview formData={form} />
        </FormLayout>
      </FormContainer>
    </div>
  );
}
 
