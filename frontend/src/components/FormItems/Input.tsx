import React from "react";

const Input = ({
  classes = "",
  label = "",
  name,
  register,
  required = true,
  type = "text",
  error,
  ...props
}: {
  classes?: string;
  label?: string;
  name: string;
  register: any;
  required?: boolean;
  type?: string;
  [key: string | number]: any;
  error?: any;
}) => {
  return (
    <div className={`my-4 flex flex-col ${classes}`}>
      <label className="ml-2 text-sm capitalize" htmlFor={name}>
        {label || name}
      </label>
      {error?.type === "required" && (
        <label className="text-sm text-error  ml-2 mb-2">
          <span className="capitalize">{label || name} </span> is required
        </label>
      )}
      <input
        className="input input-bordered w-full"
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
