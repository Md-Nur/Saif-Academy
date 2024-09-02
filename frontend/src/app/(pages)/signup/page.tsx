"use client";
import File from "@/components/FormItems/File";
import Input from "@/components/FormItems/Input";
import SubmitBtn from "@/components/FormItems/SubmitBtn";
import Title from "@/components/FormItems/Title";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  s_class: number;
  edu_inst: string;
  avatar: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const imgBBUrl = async (file: any) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      formData
    );
    // toast.dismiss();
    return response.data.data.url;
  };

  const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    try {
      axios.post("/signup", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-full md:flex-row-reverse justify-around">
      <div className="m-2 flex flex-col items-center justify-center">
        <File
          imgUrl="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
          name="avatar"
          register={register}
          errors={errors.avatar}
        />
      </div>
      <form
        className="w-full max-w-md p-5 bg-base-200 rounded-lg md:m-5 md:m-10 md:p-10 md:rounded-3xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title title="Sign Up" />
        <Input error={errors.name} name="name" register={register} />
        <Input
          error={errors.email}
          name="email"
          register={register}
          required={false}
        />
        <Input error={errors.phone} name="phone" register={register} />
        <Input
          error={errors.password}
          name="password"
          register={register}
          type="password"
        />
        <Input
          error={errors.s_class}
          name="s_class"
          register={register}
          type="number"
          label="class"
          min={1}
          max={12}
        />
        <Input
          error={errors.edu_inst}
          required={false}
          name="edu_inst"
          register={register}
          label="Educational Instuite"
        />
        <SubmitBtn
          label="Sign Up"
          msg="Already have an account? Login"
          link="/login"
        />
      </form>
    </div>
  );
};

export default SignUp;
