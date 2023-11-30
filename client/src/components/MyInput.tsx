import { CSSProperties } from "react";

type Props = {
  className?: string;
  htmlFor?: string;
  labelText?: string;
  type?: "text" | "password";
  inputClassName?: string;
  style?: CSSProperties;
  id?: string;
  placeholder?: string;
  autoComplete?: string;
};

const MyInput = ({
  className,
  htmlFor,
  labelText,
  type,
  inputClassName,
  style,
  id,
  placeholder,
  autoComplete,
}: Props) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor}>{labelText}</label>
      <input
        type={type}
        className={inputClassName}
        style={style}
        id={id}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default MyInput;
