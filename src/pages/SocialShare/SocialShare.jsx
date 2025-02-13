import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import insta_icon from "../../assets/images/instagram icon.png";
import "./SocialShare.css";
import share_social_media from "../../assets/images/share_social_media.png";
import PropTypes from "prop-types";
import { useContext } from "react";
import UserContext from "../../context/userContext";

const SocialShare = () => {
  const { pdfPublicUrl } = useContext(UserContext);

  console.log(pdfPublicUrl, "Pdf Public Url");

  const shareUrl = pdfPublicUrl || "https://yourwebsite.com/your-page";
  const title = "Check out my quiz results!";

  return (
    <div className="share-container">
      <div className="content-wrapper">
        <div className="image-wrapper">
          <img
            src={share_social_media}
            alt="Share on Social Media"
            className="bg-img"
          />
        </div>
        <div className="share-btn-icons-container">
          <p>share on social media</p>
          <div className="icons-wrapper">
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              hashtag="#AwesomeWebsite"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TelegramShareButton url={shareUrl} title={title}>
              <TelegramIcon size={40} round />
            </TelegramShareButton>

            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            <EmailShareButton
              url={shareUrl}
              subject={title}
              // body={`I thought you might like this: ${shareUrl}`}
              body={`I thought you might like this: ${encodeURIComponent(shareUrl)}`}
            >
              <EmailIcon size={40} round />
            </EmailShareButton>

            <div title={title}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={insta_icon} alt="" width={40} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SocialShare.propTypes = {
  pdfUrl: PropTypes.string,
};
export default SocialShare;
