import { RiRobot2Line } from "react-icons/ri";
import LogoPage from "./LogoPage";

export default function Hero() {
  return (
    <div className="flex absolute items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center mb-10">
          <LogoPage />
          <p className="text-4xl font-bold">NgawurGPT</p>
        </div>

        <div className="flex flex-row items-center bg-slate-400/10 rounded-lg py-2 px-5">
          <RiRobot2Line className="fill-black/60" />
          <p className="ml-2 text-sm text-black/60">What can I help you today?</p>
        </div>
      </div>
    </div>
  );
}
