import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  maxWidth: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, maxWidth, className }) => {
  return <div className={`mx-auto max-w-screen-${maxWidth} ${className}`}>{children}</div>;
};

export default Container;
