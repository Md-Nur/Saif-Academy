import Image from "next/image";
import ImgUpload from "@/assets/image-upload.png";
import { useState } from "react";

const File = ({
  name,
  imgUrl,
  register,
  required = false,
  classes,
  errors,
  ...props
}: {
  name: string;
  label?: string;
  register: any;
  required?: boolean;
  classes?: string;
  [key: string]: any;
  errors?: any;
}) => {
  const [error, setError] = useState<string | null>(
    errors?.type === "required" ? "This field is required" : null
  );
  const [preview, setPreview] = useState<string | any>(null);

  const handleImg = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const size = file.size / 1024 / 1024;
      if (size > 2) {
        setError("File size should be less than 2MB");
      } else {
        setError(null);
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className={`my-4 ${classes}`}>
      {error && <p className="my-5 text-error">{error}</p>}
      <label htmlFor={name}>
        <Image
          src={preview || imgUrl || ImgUpload}
          alt={name}
          width={500}
          height={500}
          className="mx-auto w-full rounded-xl max-w-md max-h-[500px] object-cover"
        />
      </label>
      <input
        className="w-full file-input file-input-bordered"
        name={name}
        id={name}
        type="file"
        {...register(name, { required })}
        {...props}
        onChange={handleImg}
      />
    </div>
  );
};

export default File;
