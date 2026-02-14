"use client";

interface MultiSelectProps {
  label?: string;
  selected: number[];
  onChange: (selected: number[]) => void;
  options: number[];
}

export default function MultiSelect({ label, selected, onChange, options }: MultiSelectProps) {
  const toggleOption = (value: number) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value].sort((a, b) => a - b));
    }
  };

  const selectAll = () => onChange(options);
  const clearAll = () => onChange([]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-300">{label}</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={selectAll}
              className="text-xs text-cyan-500 hover:text-cyan-400"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-gray-300"
            >
              Clear
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-6 gap-2">
        {options.map((hour) => (
          <button
            key={hour}
            type="button"
            onClick={() => toggleOption(hour)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selected.includes(hour)
                ? "bg-cyan-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            {hour}
          </button>
        ))}
      </div>
    </div>
  );
}
