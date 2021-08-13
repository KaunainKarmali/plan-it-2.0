import styled from "styled-components";
import { grey1, white2 } from "../variables/colours";
import { footerHeight } from "../variables/heights";
import { stdSpace } from "../variables/spacing";
import { FooterAnchor } from "./Anchor.styles";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const Wrapper = styled.div`
    font-size: 0.8rem;
    line-height: 0.8rem;
    height: ${footerHeight};
    margin: 0;
    padding: ${stdSpace};
    text-align: center;
    background-color: ${grey1};
    color: ${white2};
  `;

  return (
    <Wrapper>
      <p>
        Created by{" "}
        <FooterAnchor href="https://github.com/KaunainKarmali">
          Kaunain Karmali
        </FooterAnchor>{" "}
        &copy; at Juno College {year}
      </p>
    </Wrapper>
  );
};

export default Footer;
