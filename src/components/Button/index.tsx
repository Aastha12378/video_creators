import React from "react";

const shapes = {
  round: "rounded-lg",
} as const;
const variants = {
  fill: {
    teal_100_01: "bg-teal-100_01 text-gray-900_01",
    blue_A700: "bg-blue-A700 text-white-A700",
  },
} as const;
const sizes = {
  xs: "h-[22px] px-[5px]",
  sm: "h-[25px] px-[15px] text-xs",
  md: "h-[30px] px-5 text-sm",
  xl: "h-[48px] px-5 text-sm",
} as const;

type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClick"
> &
  Partial<{
    className: string;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
    color: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
  }>;
const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "round",
  variant = "fill",
  size = "md",
  color = "blue_A700",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center ${
        (shape && shapes[shape]) || ""
      } ${(size && sizes[size]) || ""} ${
        (variant &&
          variants[variant]?.[
            color as keyof (typeof variants)[typeof variant]
          ]) ||
        ""
      }`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
