import { IoMdInformationCircleOutline, IoMdInformationCircle } from "react-icons/io";

export default function Header() {
  return (
    <a href="/about">
      <div className="group sm:text-2xl md:text-3xl">
        <IoMdInformationCircle className="absolute top-4 right-4" />
        {/* <IoMdInformationCircleOutline className="absolute top-4 right-4 opacity-100 group-hover:opacity-0 duration-500" />
        <IoMdInformationCircle className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 duration-500" /> */}
      </div>
    </a>
  );
}
