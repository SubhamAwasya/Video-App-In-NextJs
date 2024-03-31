import { AiFillHome } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { LuHistory } from "react-icons/lu";

export const sideBarLinks = [
  {
    title: "Home",
    url: "/",
    icon: <AiFillHome />,
  },
  {
    title: "Trending",
    url: "/trending",
    icon: <BiTrendingUp />,
  },
  {
    title: "Subscription",
    url: "/subscription",
    icon: <MdOutlineSubscriptions />,
  },
  {
    title: "History",
    url: "/history",
    icon: <LuHistory />,
  },
];
