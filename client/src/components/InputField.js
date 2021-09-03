import {
  Input,
  InputContainer,
  TextLabel,
} from "./styledComponents/Inputs.styles";

const InputField = (props) => {
  const {
    type,
    id,
    name,
    value,
    onChange,
    isValid,
    inputLength,
    label,
    min,
    containerClass,
    inputClass,
    labelClass,
  } = props;

  return (
    <InputContainer className={containerClass}>
      <Input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        isValid={isValid}
        className={inputClass}
      />
      <TextLabel htmlFor={id} inputLength={inputLength} className={labelClass}>
        {label}
      </TextLabel>
    </InputContainer>
  );
};

export default InputField;
