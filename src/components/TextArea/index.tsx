import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded",
} as const;
const variants = {
  tarFillGray50: "bg-gray-50",
} as const;
const sizes = {
  xs: "h-[45px] p-3 text-sm",
  sm: "h-[134px] p-3 text-sm",
} as const;
type TextAreaProps = Omit<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  "size" | "prefix" | "type" | "onChange"
> &
  Partial<{
    className: string;
    name: string;
    placeholder: string;
    onChange: Function;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
  }>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      children,
      shape = "round",
      size = "sm",
      variant = "tarFillGray50",
      onChange,
      ...restProps
    },
    ref,
  ) => {
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <textarea
          ref={ref}
          className={`${className} ${shapes[shape] || ""} ${
            sizes[size] || ""
          } ${variants[variant] || ""}`}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          {...restProps}
        />
        {children}
      </>
    );
  },
);

TextArea.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["tarFillGray50"]),
};

export { TextArea };
