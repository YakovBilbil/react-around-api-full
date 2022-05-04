import headerImage from "../images/headerImage.svg";

function Header({ children }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerImage}
        alt="Title: Around the U.S."
      />
      {children}
    </header>
  );
}

export default Header;
