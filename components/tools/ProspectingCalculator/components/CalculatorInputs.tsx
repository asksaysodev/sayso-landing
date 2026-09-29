/**
 * CalculatorInputs: the editable assumptions behind the prospecting calculator.
 */
import type { CalculatorInputs as Inputs } from '../types';
import { FIELDS } from '../data';

interface CalculatorInputsProps {
  values: Inputs;
  onChange: (key: keyof Inputs, value: number) => void;
}

export function CalculatorInputs({ values, onChange }: CalculatorInputsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {FIELDS.map((field) => (
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
              onChange={(e) => onChange(field.key, Number(e.target.value))}
              className="w-28 rounded-lg border-2 border-[#1D4871] bg-white px-3 py-2 text-[#1D4871] font-bold focus:outline-none focus:ring-2 focus:ring-[#2367EE]"
            />
            {field.suffix && <span className="text-[#1D4871] font-bold">{field.suffix}</span>}
          </span>
        </label>
      ))}
    </div>
  );
}
