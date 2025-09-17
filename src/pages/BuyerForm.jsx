import React, { useEffect, useState } from "react";
import buyerData from "../data/buyer.json";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  
  .control {
    transition: all 0.2s ease;
  }
  
  .checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 8px;
    
    margin-top: 8px;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 6px;
    }
    
    @media (max-width: 480px) {
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
      gap: 4px;
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
  font-weight: 500;
  
  &.required::after { 
    content: " *"; 
    color: var(--primary); 
  }
`;

const Input = styled.input.attrs({ className: "input" })`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--foreground);
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15);
  }
  
  &::placeholder {
    color: var(--muted);
  }
  
  @media (max-width: 480px) {
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

const Select = styled.select.attrs({ className: "select" })`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  color: var(--foreground);
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15);
  }
  
  @media (max-width: 480px) {
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: var(--primary);
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
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

const CategoryOption = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background);
  cursor: pointer;
  user-select: none;
  color: var(--foreground);
  font-size: 14px;
  text-align: center;
  transition: all 0.2s ease;
  min-height: 48px;
  word-break: break-word;
  
  &:hover { 
    border-color: rgba(0, 180, 216, 0.35); 
  }
  
  &:focus-within { 
    border-color: var(--primary); 
    box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15); 
  }
  
  &[data-checked="true"] {
    border-color: var(--primary);
    background: rgba(0, 180, 216, 0.1);
    color: var(--primary);
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 0;
    height: 0;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 13px;
    min-height: 44px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 12px;
    min-height: 40px;
  }
`;


const SubmitButton = styled.button.attrs({ className: "button primary" })`
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 8px;
  background: var(--primary-gradient);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 480px) {
    padding: 14px 20px;
    font-size: 15px;
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;



const { buyerTypes, dealSizes, categories, timelines } = buyerData;

export default function BuyerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    buyerType: "",
    dealSize: "",
    timeline: "",
    categories: [],
    otherCategory: "",
  });
  const [touched, setTouched] = useState({});
  const [modalState, setModalState] = useState({ status: "idle", message: "" });

  // Calculate form completion progress
  const calculateProgress = () => {
    const requiredFields = ['email', 'buyerType', 'dealSize', 'timeline'];
    const filledFields = requiredFields.filter(field => form[field] && form[field].trim() !== '');
    const categoriesFilled = form.categories.length > 0;
    const otherSelected = form.categories.includes('Other');
    const otherCategoryFilled = !otherSelected || (form.otherCategory && form.otherCategory.trim() !== '');

    const totalFields = requiredFields.length + 1 + (otherSelected ? 1 : 0);
    const filledTotal = filledFields.length + (categoriesFilled ? 1 : 0) + (otherCategoryFilled ? 1 : 0);

    return Math.round((filledTotal / totalFields) * 100);
  };

  // Load draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("buyerFormDraft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm(prev => ({ ...prev, ...parsed }));
      }
    } catch { /* ignore */ }
  }, []);

  // Persist draft
  useEffect(() => {
    try {
      localStorage.setItem("buyerFormDraft", JSON.stringify(form));
    } catch { /* ignore */ }
  }, [form]);

  const update = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const markTouched = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const toggleCategory = (value) => {
    setForm(prev => {
      const exists = prev.categories.includes(value);
      const next = exists ? prev.categories.filter(v => v !== value) : [...prev.categories, value];
      const clearedOther = value === 'Other' && exists ? { otherCategory: '' } : {};
      return { ...prev, categories: next, ...clearedOther };
    });
    setTouched(prev => ({ ...prev, categories: true }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['email', 'buyerType', 'dealSize', 'timeline'];
    const missingFields = requiredFields.filter(field => !form[field] || form[field].trim() === '');
    
    if (missingFields.length > 0) {
      const fieldMap = {};
      missingFields.forEach(field => { fieldMap[field] = true; });
      setTouched(prev => ({ ...prev, ...fieldMap }));
      return;
    }
    
    if (form.categories.length === 0) {
      setTouched(prev => ({ ...prev, categories: true }));
      return;
    }
    
    if (form.categories.includes('Other') && (!form.otherCategory || form.otherCategory.trim() === '')) {
      setTouched(prev => ({ ...prev, otherCategory: true }));
      return;
    }

    setModalState({ status: "loading", message: "Submitting your details" });
    
    const formspreeId = import.meta.env.VITE_FORMSPREE_BUYER_ID;
    if (!formspreeId) {
      setModalState({ status: "error", message: "Missing VITE_FORMSPREE_BUYER_ID in .env" });
      return;
    }

    const endpoint = `https://formspree.io/f/${formspreeId}`;
    const formData = new FormData();
    
    // Add all form fields
    Object.keys(form).forEach(key => {
      if (key === 'categories') {
        form.categories.forEach(category => formData.append('categories[]', category));
      } else if (form[key]) {
        formData.append(key, form[key]);
      }
    });
    
    formData.append("_replyto", form.email);
    formData.append("_subject", "FormExit — Buyer Verification");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setModalState({ status: "success", message: "Success! Redirecting..." });
      
      // Clear draft
      try {
        localStorage.removeItem("buyerFormDraft");
      } catch { /* ignore */ }
      
      setTimeout(() => navigate("/thanks?buyer=1"), 1000);
      
    } catch (error) {
      setModalState({ status: "error", message: error.message || "Something went wrong. Please try again." });
    }
  };

  const isFormValid = () => {
    const requiredFields = ['email', 'buyerType', 'dealSize', 'timeline'];
    const basicValid = requiredFields.every(field => form[field] && form[field].trim() !== '');
    const categoriesValid = form.categories.length > 0;
    const otherValid = !form.categories.includes('Other') || (form.otherCategory && form.otherCategory.trim() !== '');
    
    return basicValid && categoriesValid && otherValid;
  };

  return (
    <div className="container">
      <ThemeScope>
        <FormContainer>
          <div>
            <Title className="title">Acquire proven SaaS, without any surprises.</Title>
            <p className="subtitle" style={{ margin: "6px 0 0" }}>Unlock premium access to vetted micro-SaaS deals. Carefully reviewed listings with transparent, verified metrics.</p>
          </div>
          
          <Form onSubmit={onSubmit} noValidate>
          
            <Section className="control">
              <Label htmlFor="email" className="required">E‑mail</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                placeholder="you@example.com" 
                required 
                value={form.email} 
                onChange={update} 
                onBlur={() => markTouched('email')}
              />
              {touched.email && !form.email && <span className="error-text">Please enter your email.</span>}
            </Section>
            
            <Section className="control">
              <Label htmlFor="buyerType" className="required">Buyer type</Label>
              <Select 
                id="buyerType" 
                name="buyerType" 
                required 
                value={form.buyerType} 
                onChange={update} 
                onBlur={() => markTouched('buyerType')}
              >
                <option value="" disabled>Select type</option>
                {buyerTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
              {touched.buyerType && !form.buyerType && <span className="error-text">Please select a buyer type.</span>}
            </Section>
            
            <Section className="control">
              <Label htmlFor="dealSize" className="required">Target deal size</Label>
              <Select 
                id="dealSize" 
                name="dealSize" 
                required 
                value={form.dealSize} 
                onChange={update} 
                onBlur={() => markTouched('dealSize')}
              >
                <option value="" disabled>Select size</option>
                {dealSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </Select>
              {touched.dealSize && !form.dealSize && <span className="error-text">Please select a target deal size.</span>}
            </Section>
            
            <Section className="control">
              <Label htmlFor="timeline" className="required">Acquisition timeline</Label>
              <Select 
                id="timeline" 
                name="timeline" 
                required 
                value={form.timeline} 
                onChange={update} 
                onBlur={() => markTouched('timeline')}
              >
                <option value="" disabled>Select timeline</option>
                {timelines?.map(timeline => (
                  <option key={timeline} value={timeline}>{timeline}</option>
                ))}
              </Select>
              {touched.timeline && !form.timeline && <span className="error-text">Please select a timeline.</span>}
            </Section>
            
            <Section className="control">
              <Label>Preferred categories</Label>
              <div className="checkbox-group">
                {categories.map(category => {
                  const id = `cat-${category}`;
                  const checked = form.categories.includes(category);
                  return (
                    <CategoryOption 
                      key={category} 
                      htmlFor={id} 
                      data-checked={checked}
                    >
                      <input
                        id={id}
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(category)}
                      />
                      <span>{category}</span>
                    </CategoryOption>
                  );
                })}
              </div>
              {touched.categories && form.categories.length === 0 && (
                <span className="error-text">Select at least one category.</span>
              )}
              
              {form.categories.includes('Other') && (
                <div style={{ marginTop: '8px' }}>
                  <Label htmlFor="otherCategory" className="required">Other category</Label>
                  <Input 
                    id="otherCategory" 
                    name="otherCategory" 
                    type="text" 
                    placeholder="Describe your category" 
                    required 
                    value={form.otherCategory} 
                    onChange={update} 
                    onBlur={() => markTouched('otherCategory')}
                  />
                  {touched.otherCategory && !form.otherCategory && (
                    <span className="error-text">Please enter your category.</span>
                  )}
                </div>
              )}
            </Section>
            
            <div>
              <SubmitButton
                type="submit"
                disabled={modalState.status === 'loading' || !isFormValid()}
              >
                {modalState.status === 'loading' && <Spinner />}
                {modalState.status === 'success' ? 'Success! Redirecting…' : 'Join as a Buyer'}
              </SubmitButton>
              
              {modalState.status === 'error' && (
                <div className="error-text" style={{ marginTop: '8px' }}>
                  {modalState.message}
                </div>
              )}
              
              <p className="subtitle" style={{ fontSize: '12px', margin: '8px 0 0' }}>
                Your privacy matters to us. Takes about 30 seconds to complete.
              </p>
            </div>
          </Form>
        </FormContainer>
      </ThemeScope>
    </div>
  );
}