import '../../assets/styles/footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <h4>© {new Date().getFullYear()} Quiz App. All rights reserved.</h4>
      </div>
    </footer>
  );
};

export default Footer;
