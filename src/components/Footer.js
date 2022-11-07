import React from "react";

const Footer = () => {
  return (
    <footer className="p-10 bg-gray-900 container mx-auto lg:max-w-4xl rounded-b-lg border-t border-teal-900 border-dashed">
      <p className="text-center text-sm text-teal-600">
        &copy; {new Date().getFullYear()} React Todo App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
