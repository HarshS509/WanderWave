function Skeleton({ className, ...props }) {
  return (
    <div
      className={`bg-muted animate-pulse rounded-md ${className}`}
      {...props}
    ></div>
  );
}

export default Skeleton;
