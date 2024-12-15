"use client";

import React, { MouseEventHandler } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "primary" | "destructive" | "secondary"; // Use a union type for variants
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Use a union type for type
  customStyles?: string;
}

export function Button({
  onClick,
  variant = "default", // Default variant is "default"
  children,
  type = "button",
  customStyles,
}: ButtonProps) {
  let styles = "";

  switch (variant) {
    case "primary":
      styles =
        "bg-blue-400 py-2 px-4 transition-opacity duration-300 hover:opacity-85  hover:bg-blue-500  text-white font-medium rounded-2xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300";
      break;
    case "secondary":
      styles =
        "bg-gray-200 py-2 px-4 transition-opacity duration-300 hover:opacity-85 hover:bg-gray-300 text-gray-700 font-medium rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300";
      break;
    case "destructive":
      styles =
        "bg-red-600 py-2 px-4 transition-opacity duration-300 hover:opacity-85 hover:bg-red-700 text-white font-medium rounded-2xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300";
      break;

    default:
      styles =
        "bg-blue-400 py-2 px-4 transition-opacity duration-300 hover:opacity-85 hover:bg-blue-500 text-white font-medium rounded-2xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300";

      break;
  }

  return (
    <button
      type={type}
      className={`${customStyles} ${styles} `} // Combine styles and handle disabled state
      onClick={onClick}
    >
      {children}
    </button>
  );
}
