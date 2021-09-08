import {
  InputContainer,
  Select,
  TextLabel,
} from "./styledComponents/Inputs.styles";

const Dropdown = (props) => {
  const {
    type,
    id,
    name,
    value,
    onChange,
    isValid,
    inputLength,
    label,
    options,
    containerClass,
    selectClass,
    optionClass,
    labelClass,
  } = props;

  return (
    <InputContainer className={containerClass}>
      <Select
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        isValid={isValid}
        value={value.toLowerCase()}
        className={selectClass}
      >
        <option value="" disabled className={optionClass}>
          {label}
        </option>
        {options.map((option, index) => {
          return (
            <option
              key={index}
              value={option.value.toLowerCase()}
              className={optionClass}
            >
              {option.name}
            </option>
          );
        })}
      </Select>
      <TextLabel htmlFor={id} inputLength={inputLength} className={labelClass}>
        {label}
      </TextLabel>
    </InputContainer>
  );
};

export default Dropdown;
