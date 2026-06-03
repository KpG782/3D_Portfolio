import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-reveal wrapper. Fades + lifts children into view once.
 * Honors prefers-reduced-motion (renders static, no transform/opacity anim).
 *
 * Props: as ("div"|"section"|"li"...), y, delay, duration, once, amount, className
 */
const EASE = [0.22, 1, 0.36, 1];

const RevealOnScroll = ({
  children,
  as = "div",
  y = 24,
  delay = 0,
  duration = 0.55,
  once = true,
  amount = 0.2,
  className = "",
  ...rest
}) => {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default RevealOnScroll;
