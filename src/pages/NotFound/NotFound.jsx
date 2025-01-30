import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import not_found from "../../assets/images/404-error.jpg"
import "./NotFound.css"

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <main>
        <section>
          <div className="not-found-container">
            {/* <h2>Page not found</h2>{" "} */}
            <img src={not_found} alt="not_found" />
            <p> We could not find what you were looking for.</p>
            <Button size="small" onClick={() => navigate("/")}>Got to home </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFound;
