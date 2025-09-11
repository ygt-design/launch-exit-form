import React, { useEffect, useRef, useState } from "react";
import buyerData from "../data/buyer.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// Inline feedback, no modal

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  
  .control {
    transition: all 0.2s ease;
    
    &:focus-within {
      transform: translateY(-1px);
    }
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  &.required::after { content: " *"; color: var(--primary); }
`;

const Select = styled.select.attrs({ className: "select" })`
  &:focus-visible {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15);
  }
`;
const Input = styled.input.attrs({ className: "input" })`
  &:focus-visible {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15);
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


const ThemeScope = styled.div`
  /* Override primary locally to a more subtle blue-green */
  --primary: #00B4D8;
  --primary-gradient: linear-gradient(135deg, #00B4D8 0%, #0077B6 100%);
  --primary-shadow-strong: rgba(0, 180, 216, 0.25);
  --primary-shadow-weak: rgba(0, 180, 216, 0.15);
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

// Contemporary multi-select chip
const CategoryOption = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #111315;
  cursor: pointer;
  user-select: none;
  color: var(--foreground);
  font-size: 14px;
  text-align: center;
  transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease, color 180ms ease;
  
  &:hover { border-color: rgba(0, 180, 216, 0.35); }
  &:focus-within { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15); }
  
  &[data-checked="true"] {
    border-color: rgba(0, 180, 216, 0.65);
    background: #0a1a2e;
    color: #ffffff;
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
  }

  @media (max-width: 768px) {
    text-align: center;
    justify-content: center;
  }
`;

const Description = styled.p`
  margin: 6px 0 0;
`;

const OptionalNote = styled.span`
  opacity: 0.6;
`;

const ConsentRow = styled.label`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const ConsentSection = styled(Section)`
  margin-top: 4px;
`;

const ExtraField = styled.div`
  margin-top: 8px;
`;

const ErrorBelow = styled.div`
  margin-top: 8px;
`;

const SmallNote = styled.p`
  font-size: 12px;
  margin: 8px 0 0;
`;

const { buyerTypes, dealSizes, geographies, mrrRanges, categories } = buyerData;

export default function BuyerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    linkedInUrl: "",
    buyerType: "", // Role
    company: "", // optional
    geography: "",
    dealSize: "",
    mrrRange: "",
    categories: [],
    otherCategory: "",
    consentDigest: false,
    // keep for backwards compatibility, though not collected explicitly
    timeline: ""
  });
  const [touched, setTouched] = useState({});
  const [modalState, setModalState] = useState({ status: "idle", message: "" });

  // Calculate form completion progress
  const calculateProgress = () => {
    const requiredFields = ['fullName', 'email', 'linkedInUrl', 'buyerType', 'geography', 'dealSize', 'mrrRange'];
    const filledFields = requiredFields.filter(field => {
      const value = form[field];
      if (typeof value === 'string') return value.trim() !== '';
      return !!value;
    });
    const otherSelected = form.categories.some(c => c.toLowerCase().startsWith('other'));
    const categoriesFilled = form.categories.length > 0;
    const otherCategoryFilled = !otherSelected || (form.otherCategory && form.otherCategory.trim() !== '');

    const totalFields = requiredFields.length + 1 + (otherSelected ? 1 : 0); // +1 for categories
    const filledTotal = filledFields.length + (categoriesFilled ? 1 : 0) + (otherCategoryFilled ? 1 : 0);

    return Math.round((filledTotal / totalFields) * 100);
  };

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const linkedInRef = useRef(null);
  const buyerTypeRef = useRef(null);
  const dealSizeRef = useRef(null);
  const geographyRef = useRef(null);
  const mrrRangeRef = useRef(null);
  const otherCategoryRef = useRef(null);

  // Draft load
  useEffect(() => {
    try {
      const saved = localStorage.getItem("buyerFormDraft");
      if (saved) setForm(prev => ({ ...prev, ...JSON.parse(saved) }));
    } catch { /* ignore */ }
  }, []);

  // Draft persist
  useEffect(() => {
    try { localStorage.setItem("buyerFormDraft", JSON.stringify(form)); } catch { /* ignore */ }
  }, [form]);

  function update(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function markTouched(name) { setTouched(prev => ({ ...prev, [name]: true })); }

  function toggleCategory(value) {
    setForm(prev => {
      const exists = prev.categories.includes(value);
      const next = exists ? prev.categories.filter(v => v !== value) : [...prev.categories, value];
      const isOther = value.toLowerCase().startsWith('other');
      const clearedOther = isOther && exists ? { otherCategory: '' } : {};
      return { ...prev, categories: next, ...clearedOther };
    });
    setTouched(prev => ({ ...prev, categories: true }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const includesOther = form.categories.some(c => c.toLowerCase().startsWith('other'));
    const isValid = (
      form.fullName &&
      form.email &&
      form.linkedInUrl &&
      form.buyerType &&
      form.geography &&
      form.dealSize &&
      form.mrrRange &&
      form.categories.length > 0 &&
      (!includesOther || !!form.otherCategory)
    );
    if (!isValid) {
      setTouched({
        fullName: true,
        email: true,
        linkedInUrl: true,
        buyerType: true,
        geography: true,
        dealSize: true,
        mrrRange: true,
        categories: true,
        ...(includesOther ? { otherCategory: true } : {})
      });
      if (!form.fullName && fullNameRef.current) fullNameRef.current.focus();
      else if (!form.email && emailRef.current) emailRef.current.focus();
      else if (!form.linkedInUrl && linkedInRef.current) linkedInRef.current.focus();
      else if (!form.buyerType && buyerTypeRef.current) buyerTypeRef.current.focus();
      else if (!form.geography && geographyRef.current) geographyRef.current.focus();
      else if (!form.dealSize && dealSizeRef.current) dealSizeRef.current.focus();
      else if (!form.mrrRange && mrrRangeRef.current) mrrRangeRef.current.focus();
      else if (includesOther && !form.otherCategory && otherCategoryRef.current) otherCategoryRef.current.focus();
      return;
    }
    setModalState({ status: "loading", message: "Submitting your details" });
    const formspreeId = import.meta.env.VITE_FORMSPREE_BUYER_ID;
    if (!formspreeId) {
      setModalState({ status: "error", message: "Missing VITE_FORMSPREE_BUYER_ID in .env" });
      return;
    }
    const endpoint = `https://formspree.io/f/${formspreeId}`;
    const fd = new FormData();
    // Required + compatibility fields
    fd.append("fullName", form.fullName);
    fd.append("email", form.email);
    fd.append("linkedInUrl", form.linkedInUrl);
    fd.append("buyerType", form.buyerType); // Role
    fd.append("company", form.company || "");
    fd.append("geography", form.geography);
    fd.append("dealSize", form.dealSize); // Check Size Range (USD)
    fd.append("mrrRange", form.mrrRange);
    // Keep timeline for backwards compatibility even if empty
    fd.append("timeline", form.timeline || "");
    const otherIs = (c) => c.toLowerCase().startsWith('other');
    form.categories.forEach((c) => fd.append("categories[]", otherIs(c) ? (form.otherCategory || c) : c));
    fd.append("consentDealsDigest", form.consentDigest ? "yes" : "no");
    fd.append("_replyto", form.email);
    fd.append("_subject", "FormExit — Buyer waitlist");
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
        try { localStorage.removeItem("buyerFormDraft"); } catch { /* ignore */ }
        setTimeout(() => navigate("/thanks?buyer=1"), 600);
      })
      .catch((err) => {
        setModalState({ status: "error", message: err?.message || "Something went wrong. Please try again." });
      });
  }

  return (
    <div className="container">
      <ThemeScope>
        <FormContainer>
          <div>
            <Title className="title"><TitleBlue>Get your buyer status verified</TitleBlue> — access curated SaaS listings tailored to your acquisition criteria.</Title>
            <Description className="subtitle">Founders value qualified, credible buyers. Verifying your buyer status shows sellers you're credible, helps us filter listings to fit your buy box, and ensures the opportunities you see are highly relevant.</Description>
          </div>
          <Form onSubmit={onSubmit} noValidate>
            <ProgressBar>
              <ProgressFill progress={calculateProgress()} />
            </ProgressBar>
            <Section className="control">
              <Label htmlFor="fullName" className="required">Full Name</Label>
              <Input id="fullName" ref={fullNameRef} name="fullName" type="text" autoComplete="name" placeholder="Alex Carter" required aria-invalid={touched.fullName && !form.fullName ? "true" : undefined} value={form.fullName} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
              {touched.fullName && !form.fullName && <span className="error-text">Please enter your full name.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="email" className="required">Email Address</Label>
              <Input id="email" ref={emailRef} name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" required aria-invalid={touched.email && !form.email ? "true" : undefined} value={form.email} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
              {touched.email && !form.email && <span className="error-text">Please enter your email.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="linkedInUrl" className="required">LinkedIn Profile</Label>
              <Input id="linkedInUrl" ref={linkedInRef} name="linkedInUrl" type="url" inputMode="url" placeholder="https://www.linkedin.com/in/username" required aria-invalid={touched.linkedInUrl && !form.linkedInUrl ? "true" : undefined} value={form.linkedInUrl} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
              {touched.linkedInUrl && !form.linkedInUrl && <span className="error-text">Please add your LinkedIn URL.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="buyerType" className="required">Role</Label>
              <Select id="buyerType" ref={buyerTypeRef} name="buyerType" required aria-invalid={touched.buyerType && !form.buyerType ? "true" : undefined} value={form.buyerType} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select role</option>
                {buyerTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.buyerType && !form.buyerType && <span className="error-text">Please select a role.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="company">Firm / Company <OptionalNote>(optional)</OptionalNote></Label>
              <Input id="company" name="company" type="text" placeholder="Company or fund name" value={form.company} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
            </Section>
            <Section className="control">
              <Label htmlFor="geography" className="required">Geography / Time Zone</Label>
              <Select id="geography" ref={geographyRef} name="geography" required aria-invalid={touched.geography && !form.geography ? "true" : undefined} value={form.geography} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select region</option>
                {geographies.map(r => <option key={r} value={r}>{r}</option>)}
              </Select>
              {touched.geography && !form.geography && <span className="error-text">Please select a region.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="dealSize" className="required">Check Size Range (USD)</Label>
              <Select id="dealSize" ref={dealSizeRef} name="dealSize" required aria-invalid={touched.dealSize && !form.dealSize ? "true" : undefined} value={form.dealSize} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select range</option>
                {dealSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.dealSize && !form.dealSize && <span className="error-text">Please select a check size.</span>}
            </Section>
            <Section className="control">
              <Label htmlFor="mrrRange" className="required">Preferred MRR Range</Label>
              <Select id="mrrRange" ref={mrrRangeRef} name="mrrRange" required aria-invalid={touched.mrrRange && !form.mrrRange ? "true" : undefined} value={form.mrrRange} onChange={update} onBlur={(e) => markTouched(e.target.name)}>
                <option value="" disabled>Select MRR</option>
                {mrrRanges.map(s => <option key={s} value={s}>{s}</option>)}
              </Select>
              {touched.mrrRange && !form.mrrRange && <span className="error-text">Please select an MRR range.</span>}
            </Section>
            <Section className="control">
              <Label> SaaS Deal Preferences</Label>
              <div className="checkbox-group">
                {categories.map(c => {
                  const id = `cat-${c}`;
                  const checked = form.categories.includes(c);
                  return (
                    <CategoryOption key={c} htmlFor={id} data-checked={checked ? "true" : undefined}>
                      <input
                        id={id}
                        type="checkbox"
                        className="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(c)}
                      />
                      <span>{c}</span>
                    </CategoryOption>
                  );
                })}
              </div>
              {touched.categories && form.categories.length === 0 && <span className="error-text">Select at least one preference.</span>}
              {form.categories.some(c => c.toLowerCase().startsWith('other')) && (
                <ExtraField className="control">
                  <Label htmlFor="otherCategory" className="required">Other (write-in)</Label>
                  <Input id="otherCategory" ref={otherCategoryRef} name="otherCategory" type="text" placeholder="Describe your preference" required aria-invalid={touched.otherCategory && !form.otherCategory ? "true" : undefined} value={form.otherCategory} onChange={update} onBlur={(e) => markTouched(e.target.name)} />
                  {touched.otherCategory && !form.otherCategory && <span className="error-text">Please enter your category.</span>}
                </ExtraField>
              )}
            </Section>
            <ConsentSection className="control">
              <ConsentRow className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={!!form.consentDigest}
                  onChange={() => setForm(prev => ({ ...prev, consentDigest: !prev.consentDigest }))}
                />
                <span>Yes, add me to the weekly Deals Digest and send me early SaaS listings.</span>
              </ConsentRow>
            </ConsentSection>
            <div>
              <SubmitButton
                type="submit"
                aria-busy={modalState.status === 'loading'}
                disabled={
                  modalState.status === 'loading' ||
                  !(
                    form.fullName &&
                    form.email &&
                    form.linkedInUrl &&
                    form.buyerType &&
                    form.geography &&
                    form.dealSize &&
                    form.mrrRange &&
                    form.categories.length > 0
                  )
                }
              >
                {modalState.status === 'loading' && (<Spinner aria-hidden="true" />)}
                <LabelText style={{ opacity: modalState.status === 'loading' ? 0 : 1 }}>
                  {modalState.status === 'success' ? 'Success! Redirecting…' : 'Join as a Verified Buyer'}
                </LabelText>
              </SubmitButton>
              {modalState.status === 'error' && (
                <ErrorBelow className="error-text">{modalState.message}</ErrorBelow>
              )}
              <SmallNote className="subtitle">Your privacy matters to us. Takes about 30 seconds to complete.</SmallNote>
            </div>
          </Form>
        </FormContainer>
      </ThemeScope>
    </div>
  );
}
 
