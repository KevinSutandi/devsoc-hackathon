import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  onDelete: () => void;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-x-3 justify-start">
      <button onClick={onDelete}>
        <TrashIcon className="w-5 h-5" color="red" />
      </button>

      <button
        className="w-5 h-5 border border-black flex justify-center items-center"
        onClick={onChange}
      >
        <div>{checked && <CheckIcon className="w-5 h-5 animate-fadeIn" />}</div>
      </button>
      <div className="w-[80%]">{label}</div>
    </div>
  );
};

export default Checkbox;
