import '../../assets/styles/footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <h4>Copyright© {new Date().getFullYear()} Quizio. All rights reserved.</h4>
      </div>
    </footer>
  );
};

export default Footer;
