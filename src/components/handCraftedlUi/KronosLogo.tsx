import { LuAlarmClockMinus } from "react-icons/lu";

export default function KronosLogo() {
  return (
    <figure className="flex gap-x-2 justify-center items-center">
      <LuAlarmClockMinus style={{ color: "#ecececbd", fontSize: "2rem" }} />
      <h1 className="text-3xl uppercase text-[#ecececbd]">kronos</h1>
    </figure>
  );
}