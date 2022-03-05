function Tag({ children, className, ...others }) {
  return (
    <span className={`px-3 py-1 rounded-md text-sm ${className}`} {...others}>
      {children}
    </span>
  );
}

export default Tag;
