/**
 * GlassCard — theme-adaptive glass surface using the branch's `.glass-surface`.
 * Props: as (element), interactive (hover lift + pointer), className, ...rest
 */
const GlassCard = ({
  children,
  as = "div",
  interactive = false,
  className = "",
  ...rest
}) => {
  const Component = as;
  return (
    <Component
      className={`glass-surface rounded-2xl ${
        interactive
          ? "cursor-pointer transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
