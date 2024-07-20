import { inter } from "../../app/layout";
import { cn } from "../../lib/utils";

export const Input = ({ label, placeholder, type, value, onChange }) => {
  return (
    <input
      label={label}
      type={"text" | type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className={cn(
        "border-2 w-full bg-transparent h-[40px] p-5 rounded-full border-slate-100",
        inter.className
      )}
    />
  );
};
