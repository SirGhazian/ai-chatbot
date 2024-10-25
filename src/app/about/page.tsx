import Header from "@/components/Header";
import Image from "next/image";
import { GrGithub } from "react-icons/gr";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function page() {
  return (
    <main className="w-svw h-svh flex items-center justify-center px-4">
      <Header />
      <div className="relative w-96 bg-black p-6 rounded-lg">
        <Image
          src="/img/about_banner.png"
          width={500}
          height={500}
          alt="pp"
          className="w-full h-28 object-cover invert rounded-lg"
        />
        <div className="mt-5 mb-16">
          <p className="text-white text-2xl font-bold">SirGhazian</p>
          <p className="text-white/50">Junior dev.</p>
        </div>
        <a href="https://github.com/SirGhazian" target="_blank">
          <div className="bg-black w-10 h-10 rounded-full absolute bottom-0 left-0 m-4 flex justify-center items-center hover:ring-4 ring-white hover:transition duration-700 ease-in-out">
            <GrGithub className="text-2xl fill-white" />
          </div>
        </a>
        <a href="/">
          <div className="bg-black w-10 h-10 rounded-full absolute bottom-0 right-0 m-4 flex justify-center items-center hover:ring-4 ring-white hover:transition duration-700 ease-in-out">
            <IoMdArrowRoundBack className="fill-white text-2xl" />
          </div>
        </a>
      </div>
    </main>
  );
}
