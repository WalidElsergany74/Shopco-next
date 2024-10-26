import { HTMLAttributes, ReactNode } from "react";

interface Iprops extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; 
}

const ButtonIcon = ({ children, type = "button", ...props }: Iprops) => {
  return (
    <button type={type} className="cursor-pointer" {...props}>
      {children}
    </button>
  );
};

export default ButtonIcon;
