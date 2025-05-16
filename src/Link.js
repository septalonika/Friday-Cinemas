import React, { useState } from "react";

/**
 * A Link component that changes appearance when hovered.
 *
 * @param {Object} props - Component props
 * @param {string} props.page - URL the link points to
 * @param {React.ReactNode} props.children - Content of the link
 * @returns {React.ReactElement} - Rendered link component
 */
const Link = ({ page, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a href={page} className={hovered ? "hovered" : "normal"} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {children}
    </a>
  );
};

export default Link;
