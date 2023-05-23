import "./text-input.style.scss";

interface TextInputProps {
  label?: string;
  onChangeText?: (e: any) => void;
  labelClass?: string;
  inputClass?: string;
  isHidden?: boolean;
  onKeyDown?: (e: any) => void;
}

export const TextInput = (props?: TextInputProps) => {
  return (
    <>
      <div className={`text-label ${props?.labelClass}`}>{props?.label}</div>
      <input
        className={`text-input ${props?.inputClass}`}
        onChange={props?.onChangeText}
        type={props?.isHidden ? "password" : "text"}
        onKeyDown={props?.onKeyDown}
      />
    </>
  );
};
