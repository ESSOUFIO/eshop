import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";

const AdminOnlyRoute = ({ children }) => {
  const email = useSelector(selectEmail);
  if (email === "admin@gmail.com") {
    return children;
  } else
    return (
      <section style={{ height: "80vh" }}>
        <div className="container">
          <h2>Permssion Denied</h2>
          <p>This page can only be viewed by an Admin user.</p>
          <br />
          <Link to="/">
            <button className="--btn">
              <IoCaretBackOutline /> Back to Home
            </button>
          </Link>
        </div>
      </section>
    );
};

export const AdminOnlyLink = ({ children }) => {
  const email = useSelector(selectEmail);
  if (email === "admin@gmail.com") {
    return children;
  } else return null;
};

export default AdminOnlyRoute;
