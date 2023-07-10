"use client"
import { useState } from "react";

const SignupLoginComponent: React.FC = () => {
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(true);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="lg:w-1/3 md:w-1/2   bg-white shadow-md rounded-lg p-8" onSubmit={handleFormSubmit}>
                <h2 className="text-2xl mb-4">{isSignup ? "Sign Up" : "Log In"}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                        Registration Id
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="id"
                        type="number"
                        placeholder="Registration Id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className={`${isSignup ? "block" : "hidden"}  mb-4 `}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                       {isSignup ? "Password (min 8 characters)" : "Password"}
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                       
                       placeholder={isSignup ? "Create a password" : "Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {isSignup ? "Sign Up" : "Log In"}
                    </button>
                    <button
                        className="text-blue-500 hover:text-blue-700 font-bold"
                        type="button"
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignupLoginComponent;
