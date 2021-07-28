import styled, { css } from "styled-components/macro";
import { stdBR } from "../variables/borders";
import { black, blue1, blue2, blue3, red1, white1 } from "../variables/colours";
import { medSpace, smlSpace, stdSpace } from "../variables/spacing";

// *************************************
// Variables
// *************************************

const paddingY = "13px";
const paddingX = "13px";

// *************************************
// Shared styles
// *************************************

const bg = css`
  background-color: ${white1};
`;

const fg = css`
  color: ${blue1};
`;

const border = css`
  border: 1px solid ${blue1};
`;

const fontSize = css`
  font-size: 1rem;
`;

const defaultInputStyle = css`
  ${bg}
  ${fg}
  ${border}
  ${fontSize}
  padding: ${paddingY} ${paddingX};
  border-radius: ${stdBR};
  width: 100%;

  ${({ isValid }) =>
    isValid === false &&
    css`
      border: 2px solid ${red1};
      padding: calc(${paddingY} - 1px) calc(${paddingX} - 1px);
    `}
  &:hover {
    border-width: 2px;
    padding: calc(${paddingY} - 1px) calc(${paddingX} - 1px);
  }

  &:focus,
  &:active {
    outline: 0;
    border-color: ${blue2};
    border-width: 2px;
    padding: calc(${paddingY} - 1px) calc(${paddingX} - 1px);
  }
`;

const defaultLabelPopulated = css`
  ${fg}
  transform: translate(5px, -15px) scale(0.75);
  padding: 5px;
  right: auto;
`;

// *************************************
// Styled components
// *************************************

export const InputContainer = styled.div`
  position: relative;
  margin: 5px 0px 20px 0px;
`;

export const Input = styled.input.attrs((props) => {
  return { type: props.type || "text" };
})`
  ${defaultInputStyle};
`;

export const Textarea = styled.textarea.attrs((props) => {
  return { type: props.rows || 5 };
})`
  ${defaultInputStyle};
`;

export const Select = styled.select`
  ${border}
  ${bg}
  ${fg}
  ${fontSize}
  padding: ${paddingY} ${paddingX};
  margin-bottom: ${smlSpace};
  border-radius: ${stdBR};
  position: relative;
  width: 100%;

  ${({ isValid }) =>
    isValid === false &&
    css`
      border: 2px solid ${red1};
    `};

  &:focus,
  &:active {
    outline: 0;
    border-color: ${blue2};
    padding: calc(${paddingY} - 1px) calc(${paddingX} - 1px);
    border-width: 2px;
  }

  &:hover {
    padding: calc(${paddingY} - 1px) calc(${paddingX} - 1px);
    border-width: 2px;
  }
`;

export const TextLabel = styled.label`
  ${fg}
  ${bg}
    ${fontSize}
  
    border-radius: ${stdBR};
  padding: calc(${paddingY} - 1px) calc(${paddingX} - 1px);
  pointer-events: none;

  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  margin: 2px;
  transition: 0.3s all;
  transform: translate(0px, 0px) scale(1);

  ${({ inputLength }) => {
    if (inputLength !== 0) {
      return css`
        ${defaultLabelPopulated};
      `;
    }
  }}

  ${Input}:active + &, ${Input}:focus + &, ${Textarea}:active + &, ${Textarea}:focus + &, ${Select}:active + &, ${Select}:focus + & {
    ${defaultLabelPopulated};
    color: ${blue2};
  }
`;
