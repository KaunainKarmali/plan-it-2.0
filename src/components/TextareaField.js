import { InputContainer, Textarea, TextLabel } from "./Inputs.styles";

const TextareaField = (props) => {
  const {
    id,
    name,
    value,
    onChange,
    isValid,
    inputLength,
    label,
    containerClass,
    inputClass,
    labelClass,
  } = props;

  return (
    <InputContainer className={containerClass}>
      <Textarea
        id={id}
        name={name}
        row="5"
        onChange={onChange}
        isValid={isValid}
        value={value}
        className={inputClass}
      />
      <TextLabel htmlFor={id} inputLength={inputLength} className={labelClass}>
        {label}
      </TextLabel>
    </InputContainer>
  );
};

export default TextareaField;
