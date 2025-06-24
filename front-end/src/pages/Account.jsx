import React from "react";
import { Link, useParams } from "react-router-dom";
import AccProfile from "../components/AccProfile";

const Account = () => {
  const { subpage } = useParams();

  const buttonClass = (button) => {
    return `cursor-pointer rounded-full px-4 py-2 transition
      hover:bg-primary-400 hover:text-white 
      ${button === subpage ? "bg-primary-400 text-white" : "bg-gray-100 text-gray-800"}`;
  };
  return (
    <section className="p-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
        <div className="flex gap-4">
          <Link to="/account/profile" className={buttonClass("profile")}>
            Perfil
          </Link>
          <Link to="/account/bookings" className={buttonClass("bookings")}>
            Reservas
          </Link>

          <Link to="/account/places" className={buttonClass("places")}>
            Lugares
          </Link>
        </div>

        {subpage === "profile" && <AccProfile />}
      </div>
    </section>
  );
};

export default Account;
