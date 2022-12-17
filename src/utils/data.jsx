import { BsJournalBookmark } from "react-icons/bs";
import { BiHomeSmile } from "react-icons/bi";
import { FaHashtag, FaUserAlt } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { MdNotificationsActive } from "react-icons/md";

export const menulinks = [
  {
    id: 1,
    name: "home",
    icon: <BiHomeSmile className="logoIcon" />,
    route: "/",
  },
  {
    id: 2,
    name: "explore",
    icon: <FaHashtag className="logoIcon" />,
  },
  {
    id: 3,
    name: "notifications",
    icon: <MdNotificationsActive className="logoIcon" />,
  },
  {
    id: 4,
    name: "message",
    icon: <FiMail className="logoIcon" />,
  },
  {
    id: 5,
    name: "bookmarks",
    icon: <BsJournalBookmark className="logoIcon" />,
  },
  {
    id: 6,
    name: "profile",
    icon: <FaUserAlt className="logoIcon" />,
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export let year = [];

for (let i = 1965; i <= 2000; i++) {
  year.push(i);
}

for (let i = 2001; i <= 2023; i++) {
  year.push(i);
}

export function convertTimestamp(timestamp) {
  let date = timestamp?.toDate();
  let mm = months[date?.getMonth()];
  let yyyy = date?.getFullYear();

  date = mm + " " + yyyy;
  return date;
}
