"use client";
import { ReactNode, useState } from "react";

const SignupLoginComponent = () => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [classNo, setClassNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        method="POST"
        action={`${process.env.NEXT_PUBLIC_HOST}/sign-up`}
        className="2xl:w-1/3 md:w-2/3 bg-base-300 shadow-md rounded-lg p-8"
        onSubmit={handleFormSubmit}
      >
        <h2 className="text-2xl mb-4">{isSignup ? "Sign Up" : "Log In"}</h2>
        <div className={`${isSignup ? "block" : "hidden"}  mb-4 `}>
          <label
            className="block text-neutral-content text-sm font-bold mb-2"
            htmlFor="full-name"
          >
            Full Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-neutral-content leading-tight focus:outline-none focus:shadow-outline"
            id="full-name"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className={`${isSignup ? "block" : "hidden"}  mb-4 `}>
          <label
            className="block text-neutral-content text-sm font-bold mb-2"
            htmlFor="class"
          >
            Class
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-neutral-content leading-tight focus:outline-none focus:shadow-outline"
            id="class"
            type="number"
            placeholder="Class"
            value={classNo}
            onChange={(e) => setClassNo(e.target.value)}
          />
        </div>
        <div className={`${isSignup ? "hidden" : "block"}  mb-4 `}>
          <label
            className="block text-neutral-content text-sm font-bold mb-2"
            htmlFor="id"
          >
            Registration Id
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-neutral-content leading-tight focus:outline-none focus:shadow-outline"
            id="id"
            type="number"
            placeholder="Registration Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className={`${isSignup ? "block" : "hidden"}  mb-4 `}>
          <label
            className="block text-neutral-content text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-neutral-content leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-neutral-content text-sm font-bold mb-2"
            htmlFor="password"
          >
            {isSignup ? "Password (min 8 characters)" : "Password"}
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-neutral-content leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder={isSignup ? "Create a password" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="btn btn-info" type="submit">
            {isSignup ? "Sign Up" : "Log In"}
          </button>
          <button
            className="text-info font-bold"
            type="button"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Log in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupLoginComponent;
