import { InputHTMLAttributes, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  className? : string
}

const Input = forwardRef<HTMLInputElement, IProps>(({ className ,...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={className}
      {...rest}
    />
  );
});


Input.displayName = "Input";

export default Input;
