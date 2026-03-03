'use client';

import { useState } from 'react';

interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  company: string;
}

interface WindowsComingSoonScreenProps {
  value: ContactInfo;
  onChange: (value: ContactInfo) => void;
  onValidationChange: (isValid: boolean) => void;
  onSwitchToApple: () => void;
}

interface FieldErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

export function WindowsComingSoonScreen({
  value,
  onChange,
  onValidationChange,
  onSwitchToApple,
}: WindowsComingSoonScreenProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateAll = (info: ContactInfo) => {
    const newErrors: FieldErrors = {};
    if (!info.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!info.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(info.email)) newErrors.email = 'Enter a valid email';
    if (!info.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!validatePhone(info.phone)) newErrors.phone = 'Enter a valid phone number';
    if (!info.company.trim()) newErrors.company = 'Company is required';
    return newErrors;
  };

  const handleChange = (field: keyof ContactInfo, fieldValue: string) => {
    const updated = { ...value, [field]: fieldValue };
    onChange(updated);

    const newErrors = validateAll(updated);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
    onValidationChange(Object.keys(newErrors).length === 0);
  };

  const handleBlur = (field: keyof ContactInfo) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateAll(value);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    onValidationChange(Object.keys(newErrors).length === 0);
  };

  const fields: { key: keyof ContactInfo; label: string; type: string; placeholder: string }[] = [
    { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Jane Smith' },
    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
    { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(555) 123-4567' },
    { key: 'company', label: 'Company Name', type: 'text', placeholder: 'Acme Realty' },
  ];

  return (
    <div className="text-center">
      {/* Disclaimer banner */}
      <div className="bg-[#FFDE59] border-2 border-[#1D4871]/10 rounded-xl px-4 py-3 mb-5 flex items-center gap-2 justify-center">
        <span className="text-lg">⚠️</span>
        <p className="text-sm font-semibold text-[#1D4871]">
          SaySo isn&apos;t available for Windows yet — sign up to get early access when it launches.
        </p>
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-[#1D4871]">
        SaySo is coming soon to Windows
      </h1>
      <p className="text-base text-[#1D4871]/60 mt-1">
        Create your account to be the first to access it when it&apos;s live.
      </p>

      <div className="max-w-md mx-auto mt-6 flex flex-col gap-3.5">
        {fields.map((field) => (
          <div key={field.key} className="text-left">
            <label className="text-xs font-bold text-[#1D4871] mb-1 block">
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={value[field.key]}
              onChange={(e) => handleChange(field.key, e.target.value)}
              onBlur={() => handleBlur(field.key)}
              className={`w-full rounded-xl border-2 px-4 py-2.5 text-base text-[#1D4871] placeholder:text-[#1D4871]/30 font-sans transition-all duration-200 focus:outline-none focus:border-[#2367EE] focus:ring-2 focus:ring-[#2367EE]/20 ${
                errors[field.key] && touched[field.key]
                  ? 'border-red-400'
                  : 'border-[#D7DEE1]'
              }`}
            />
            {errors[field.key] && touched[field.key] && (
              <p className="text-sm text-red-500 mt-1">{errors[field.key]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Apple redirect */}
      <div className="mt-5">
        <button
          onClick={onSwitchToApple}
          className="text-sm text-[#1D4871]/60 hover:text-[#2367EE] underline underline-offset-2 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 rounded"
        >
          Do you actually use Apple?
        </button>
      </div>
    </div>
  );
}
