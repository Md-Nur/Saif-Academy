"use client";
import Input from "@/components/FormItems/Input";
import SubmitBtn from "@/components/FormItems/SubmitBtn";
import Title from "@/components/FormItems/Title";
import { ReactNode, useState } from "react";
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
  const { register, handleSubmit } = useForm<IFormValues>();
  const onSubmit: SubmitHandler<IFormValues> = async (data: IFormValues) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center w-full">
      <form
        className="w-full max-w-md p-5 bg-base-200 rounded-lg m-5 md:m-10 md:p-10 md:rounded-3xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Title title="Sign Up" />
        <Input name="name" register={register} />
        <Input name="email" register={register} required={false} />
        <Input name="phone" register={register} />
        <Input name="password" register={register} type="password" />
        <Input name="s_class" register={register} type="number" label="class" />
        <Input
          name="edu_inst"
          register={register}
          label="Educational Instuite"
        />
        <SubmitBtn
          label="Sign Up"
          msg="Already have an account?"
          link="/login"
        />
      </form>
    </div>
  );
};

export default SignUp;
