import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {currentYear} <span className="text-blue-500 font-bold">Friday</span>
          <span className="text-red-500 underline font-bold">Cine</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
