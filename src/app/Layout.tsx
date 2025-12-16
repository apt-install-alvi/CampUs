import { Outlet } from "react-router";
import { TopNav } from "../components/TopNav";
import { BotNav } from "../components/BotNav";

export function Layout()
{
  return (
    <>
      <TopNav />
      <BotNav />
      <Outlet />
    </>
  );
}