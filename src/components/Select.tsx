import React from "react";
interface Option {
  value: string;
  label: string;
}
interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
}
export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label
        htmlFor={name}
        className="text-sm font-medium text-slate-
700"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm
shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="">Seleccione una opción</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
