import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import insta_icon from "../../assets/images/instagram icon.png";
import "./SocialShare.css";
import share_social_media from "../../assets/images/share_social_media.png";
import PropTypes from "prop-types";

const SocialShare = ({pdfUrl}) => {
    console.log(pdfUrl, 'pdfUrl');

    console.log(typeof pdfUrl, 'Type');

    const title = "Check out my quiz results!";
        
  return (
    <div className="share-container">
      <div className="content-wrapper">
        <div className="image-wrapper">
          <img src={share_social_media} alt="Share on Social Media" className="bg-img" />
        </div>
        <div className="share-btn-icons-container">
          <p>share on social media</p>
          <div className="icons-wrapper">
            <FacebookShareButton
              url={pdfUrl}
              quote={title}
              hashtag="#AwesomeWebsite"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TelegramShareButton url={pdfUrl} title={title}>
              <TelegramIcon size={40} round />
            </TelegramShareButton>

            <WhatsappShareButton url={pdfUrl} title={title}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

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

SocialShare.propTypes={
    pdfUrl: PropTypes.string
}
export default SocialShare;
