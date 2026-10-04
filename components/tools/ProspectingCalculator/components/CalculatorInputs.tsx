/**
 * CalculatorInputs: the editable assumptions behind the prospecting calculator.
 */
import type { CalculatorDraft } from '../types';
import { FIELDS, parseField } from '../data';

interface CalculatorInputsProps {
  values: CalculatorDraft;
  onChange: (key: keyof CalculatorDraft, value: string) => void;
}

export function CalculatorInputs({ values, onChange }: CalculatorInputsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {FIELDS.map((field) => {
        const invalid = parseField(values[field.key], field) === null;
        return (
          <label key={field.key} htmlFor={`calc-${field.key}`} className="flex flex-col gap-1">
            <span className="text-sm font-bold text-[#1D4871]">{field.label}</span>
            <span className="text-xs text-[#1D4871]/60">{field.hint}</span>
            <span className="flex items-center gap-2 mt-1">
              <input
                id={`calc-${field.key}`}
                type="number"
                inputMode="decimal"
                min={field.min}
                max={field.max}
                step={field.step}
                value={values[field.key]}
                onChange={(e) => onChange(field.key, e.target.value)}
                aria-invalid={invalid}
                aria-describedby={invalid ? `calc-${field.key}-error` : undefined}
                className="w-28 rounded-lg border-2 border-[#1D4871] aria-[invalid=true]:border-red-600 bg-white px-3 py-2 text-[#1D4871] font-bold focus:outline-none focus:ring-2 focus:ring-[#2367EE]"
              />
              {field.suffix && <span className="text-[#1D4871] font-bold">{field.suffix}</span>}
            </span>
            {invalid && (
              <span id={`calc-${field.key}-error`} className="text-xs font-bold text-red-600">
                Enter a number from {field.min} to {field.max}.
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}
