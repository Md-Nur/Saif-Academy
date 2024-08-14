import React from "react";

const Input = ({
  classes = "",
  label = "",
  name,
  register,
  required = true,
  type = "text",
  ...props
}) => {
  return (
    <div className={`mb-4 ${classes}`}>
      <label
        className="block text-neutral-content text-sm font-bold mb-2 capitalize"
        htmlFor={name}
      >
        {label || name}
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-neutral-content leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        placeholder={label?.toUpperCase() || name.toUpperCase()}
        {...register(name, { required })}
        {...props}
      />
    </div>
  );
};

export default Input;
