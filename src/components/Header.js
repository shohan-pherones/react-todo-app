import { FaReact } from "react-icons/fa";

const Header = () => {
  return (
    <header className="p-10 bg-gray-900 container mx-auto flex flex-col gap-5 justify-center items-center md:flex-row md:justify-between lg:max-w-4xl rounded-t-lg border-b border-teal-900 border-dashed">
      <h2 className="uppercase font-semibold text-teal-500 tracking-wider flex items-center gap-2">
        <span>
          <FaReact />
        </span>
        <span>React Todo App</span>
      </h2>
    </header>
  );
};

export default Header;
