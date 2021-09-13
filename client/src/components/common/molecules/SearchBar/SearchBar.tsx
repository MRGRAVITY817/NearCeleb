import { InputHTMLAttributes, useState } from "react";
import { BsSearch } from "react-icons/bs";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  ...props
}) => {
  return (
    <div className="text-light flex items-center justify-start pl-4 laptop:pl-8 pr-1 laptop:pr-2 h-12 text-main text-lg laptop:text-xl bg-white rounded-full outline-none transition-colors">
      <BsSearch className="laptop:mr-16 mr-4 laptop:text-2xl text-xl" />
      <input
        type="text"
        id="query"
        placeholder={placeholder}
        className="placeholder-main placeholder-opacity-50 w-full bg-transparent outline-none"
        {...props}
      />
    </div>
  );
};
