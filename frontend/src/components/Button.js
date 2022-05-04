function Button({ name, handleClick, children }) {
  return (
    <button
      type="button"
      className={`profile__${name}-button`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
