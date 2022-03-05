function Button({ children, className, type = "button", name, id, ...others }) {
  return (
    <button
      className={`px-4 py-1.5 rounded-full inline-block ${className}`}
      type={type}
      name={name}
      id={id}
      {...others}
    >
      {children}
    </button>
  );
}

export default Button;
