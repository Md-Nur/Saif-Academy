"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { IoMenu } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

const NavRouter = () => {
  return (
    <>
      <Link href="/" className="btn btn-sm">
        Home
      </Link>
      <Link href="./batch" className="btn btn-sm ">
        All Batches
      </Link>
      <Link href="./signup" className="btn btn-sm ">
        Sign Up
      </Link>
      <Link href="./signup" className="btn btn-sm ">
        Login
      </Link>
      <Link href="/my-batch" className="btn btn-sm">
        My Batches
      </Link>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-base-300 sticky top-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0">
              <Link href="#" className="text-white text-lg font-semibold">
                <Image src={logo} alt="Saif Academy" className="w-12" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavRouter />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              className="btn btn-ghost btn-outline"
            >
              {/* Icon when the navbar is closed */}
              <IoMenu className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`} />

              {/* Icon when the navbar is open */}
              <IoMdCloseCircleOutline
                className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${
          isOpen
            ? "flex flex-col gap-2 transition-opacity"
            : "hidden"
        } md:hidden p-3 `}
      >
        <NavRouter />
      </div>
    </nav>
  );
};

export default Navbar;
