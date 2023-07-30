import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/authSlice";

export const ShowOnLogin = ({ children }) => {
  const loggedIn = useSelector(selectIsLoggedIn);
  if (loggedIn) {
    return children;
  } else return null;
};

export const ShowOnLogout = ({ children }) => {
  const loggedIn = useSelector(selectIsLoggedIn);
  if (!loggedIn) {
    return children;
  } else return null;
};
