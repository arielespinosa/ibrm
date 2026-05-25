"use client";

interface InputFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'time' | 'url';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  error?: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#c9a55a]/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? 'border-red-500' : 'border-white/10'
        }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  error,
}: TextareaFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#c9a55a]/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-none ${
          error ? 'border-red-500' : 'border-white/10'
        }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Seleccionar...',
  required = false,
  disabled = false,
  error,
}: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-white/80">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-3 py-2 bg-white/5 border rounded-lg text-white text-sm focus:outline-none focus:border-[#c9a55a]/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? 'border-red-500' : 'border-white/10'
        }`}
      >
        <option value="" className="bg-[#111111]">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#111111]">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  checked,
  onChange,
  disabled = false,
}: CheckboxFieldProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#c9a55a] focus:ring-[#c9a55a]/50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <span className="text-sm text-white/80">{label}</span>
    </label>
  );
}

export function FormActions({
  onCancel,
  onSubmit,
  isLoading = false,
  submitLabel = 'Guardar',
  cancelLabel = 'Cancelar',
}: {
  onCancel: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}) {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-6">
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className="px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className="px-4 py-2 text-sm bg-[#c9a55a] hover:bg-[#b8944a] text-black font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {isLoading && (
          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
        )}
        {submitLabel}
      </button>
    </div>
  );
}
