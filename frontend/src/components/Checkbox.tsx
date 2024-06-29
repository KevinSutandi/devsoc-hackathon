import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <div className="flex items-center gap-x-3 justify-start">
      <div
        className="w-5 h-5 border border-black flex justify-center items-center"
        onClick={onChange}
      >
        <div>{checked && <CheckIcon className="w-5 h-5 animate-fadeIn" />}</div>
      </div>
      <div className="w-[80%]">{label}</div>
    </div>
  );
};

export default Checkbox;
