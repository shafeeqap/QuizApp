import blocked from "../../assets/images/blocked.png";
import "./BlockedPage.css";
const BlockedPage = () => {
  return (
    <>
      <main>
        <section>
          <div className="container-block">
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h3>Your account has been blocked.</h3>
              <p>Please contact support for assistance.</p>
            </div>
            <div className="image-container" style={{ display: "flex", justifyContent: "center" }}>
              <img src={blocked} alt="" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlockedPage;
