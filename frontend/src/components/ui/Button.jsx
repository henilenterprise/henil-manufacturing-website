import "./Button.css";

/**
 * variant: "solid" (primary gold CTA) | "ghost" (outline) | "glass" (translucent panel-style CTA)
 */
export default function Button({
  children,
  variant = "solid",
  size = "md",
  href,
  icon: Icon,
  iconPosition = "right",
  className = "",
  ...rest
}) {
  const Tag = href ? "a" : "button";
  const classes = ["btn", `btn--${variant}`, `btn--${size}`, className].filter(Boolean).join(" ");

  return (
    <Tag className={classes} href={href} {...rest}>
      {Icon && iconPosition === "left" && <Icon size={16} strokeWidth={2} />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon size={16} strokeWidth={2} />}
    </Tag>
  );
}
