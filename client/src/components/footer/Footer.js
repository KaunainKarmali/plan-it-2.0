import { FooterAnchor } from "../generalStyledComponents/Anchor.styles";
import { FooterWrapper } from "./Footer.styles";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <FooterWrapper>
      <p>
        Created by{" "}
        <FooterAnchor target="_blank" href="https://github.com/KaunainKarmali">
          Kaunain Karmali
        </FooterAnchor>{" "}
        &copy; at Juno College {year}
      </p>
    </FooterWrapper>
  );
};

export default Footer;
