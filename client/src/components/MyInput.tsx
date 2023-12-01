import { CSSProperties, ChangeEventHandler } from "react";

type Props = {
  className?: string;
  htmlFor?: string;
  labelText?: string;
  type?: "text" | "password";
  inputClassName?: string;
  style?: CSSProperties;
  id?: string;
  name?: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
};

const MyInput = ({
  className,
  htmlFor,
  labelText,
  type,
  inputClassName,
  style,
  id,
  name,
  placeholder,
  autoComplete,
  value = "",
  onChange,
  onFocus,
  onBlur,
}: Props) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor}>{labelText}</label>
      <input
        type={type}
        className={inputClassName}
        style={style}
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default MyInput;
