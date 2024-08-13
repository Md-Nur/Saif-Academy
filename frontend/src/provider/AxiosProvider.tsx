"use client";
import axios from "axios";
import { ReactNode } from "react";

const AxiosProvider = ({ children }: { children: ReactNode }) => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_HOST;
  axios.defaults.withCredentials = true;

  return children;
};

export default AxiosProvider;
