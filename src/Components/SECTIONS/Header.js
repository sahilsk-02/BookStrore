import LinkButton from "../UI/LinkButton";
import WhiteButton from "../UI/WhiteButton";
import "../CSS/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../STORE/auth";
import { adminActions } from "../STORE/admin";
function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.auth.auth);
  const roleId = useSelector((state) => state.auth.roleId);

  // const Admin = useSelector((state) => state.admin.admin);
  const clickLogin = (e) => {
    navigate("Login");
  };

  const clickRegister = (e) => {
    navigate(" ");
  };

  const clickLogout = (e) => {
    dispatch(authActions.logout());
    localStorage.removeItem("user");
    navigate("Login");
  };

  const clickBooks = (e) => {
    navigate("products-page");
  };

  const clickUsers = (e) => {
    navigate("users-page");
  };

  const clickCategories = (e) => {
    navigate("categories-page");
  };

  const clickCart = (e) => {
    navigate("cart-page");
  };

  const clickBookListing = (e) => {
    navigate("book-listing");
  };

  // const clickUpdateProfile = (e) => {
  //   navigate("update-profile");
  // };
  console.log(Auth);
  return (
    <>
      {/* Header Containing logo and Login/Register/cart Button */}
      <div className="header">
        <img
          src="https://image4.owler.com/logo/tatvasoft_owler_20160614_065459_original.png"
          alt="logo"></img>

        <div className="header-buttons">
          {Auth ? (
            roleId == 2 ? (
              <>
                <LinkButton
                  buttonText="Books"
                  onClick={clickBooks}></LinkButton>
                <LinkButton
                  buttonText="Users"
                  onClick={clickUsers}></LinkButton>
                <LinkButton
                  buttonText="Categories"
                  onClick={clickCategories}></LinkButton>
                <LinkButton
                  buttonText="Book Listing"
                  onClick={clickBookListing}></LinkButton>
                {/* <LinkButton
                                buttonText="Update Profile"
                                onClick={clickUpdateProfile}
                              ></LinkButton> */}
                <WhiteButton
                  buttonText="Logout"
                  click={clickLogout}></WhiteButton>{" "}
                <WhiteButton buttonText="Cart" click={clickCart} />
              </>
            ) : (
              <>
                <LinkButton
                  buttonText="Book Listing"
                  onClick={clickBookListing}></LinkButton>
                <WhiteButton
                  buttonText="Logout"
                  click={clickLogout}></WhiteButton>{" "}
                <WhiteButton buttonText="Cart" click={clickCart} />
              </>
            )
          ) : (
            <>
              <LinkButton buttonText="Login" onClick={clickLogin}></LinkButton>{" "}
              | <LinkButton buttonText="Register" onClick={clickRegister} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Header;
