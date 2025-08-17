'use client';

export default function InputField({
  label,
  id,
  value,
  onChange,
  type = 'text',
  disabled = false,
}) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
