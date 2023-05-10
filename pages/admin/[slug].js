import { useRouter } from "next/router";
import React, { useEffect } from "react";

import AdminIndex from "../../components/AdminDashBoard";
import Booking from "../../components/AdminDashBoard/Booking";
import AddListing from "../../components/AdminDashBoard/AddListing";
import AdminNavbar from "../../components/AdminDashBoard/AdminNavbar";
import MyListing from "../../components/AdminDashBoard/MyListing";
import Reviews from "../../components/AdminDashBoard/Reviews";
import AddCity from "../../components/AdminDashBoard/AddCity";
import AddRoomType from "../../components/AdminDashBoard/AddRoomType";
import AddAminities from "../../components/AdminDashBoard/AddAminities";
import ProfileComponent from "../../components/CommonDashBoard/Profile";
import { useAuthContext } from "../../contexts/authContext";
import UserList from "../../components/AdminDashBoard/UsersList";
import ScheduleVisit from "../../components/AdminDashBoard/ScduleVisits";
import AdvanceBooking from "../../components/AdminDashBoard/AdvanceBooking";
import RentPaymentComponent from "../../components/AdminDashBoard/RentPaymentComponent";
import ComplainListAdmin from "../../components/AdminDashBoard/ComplainAdmin";
import TeamMember from "../../components/AdminDashBoard/TeamMember";

const Template = ({ children, value }) => {
  return (
    <>
      <AdminNavbar value={value ?? ""} />
      {children}
    </>
  );
};

const RenderComponent = ({ slug }) => {
  if (slug === undefined) {
    return <AdminIndex />;
  } else if (slug === "bookings") {
    return <Booking />;
  } else if (slug === "add-listing") {
    return <AddListing />;
  } else if (slug === "my-listing") {
    return <MyListing />;
  } else if (slug === "reviews") {
    return <Reviews />;
  } else if (slug === "add-city") {
    return <AddCity />;
  } else if (slug === "add-room-type") {
    return <AddRoomType />;
  } else if (slug === "add-aminities") {
    return <AddAminities />;
  } else if (slug === "profile") {
    return <ProfileComponent admin="admin" />;
  } else if (slug === "users") {
    return <UserList />;
  } else if (slug === "scheduleVisit") {
    return <ScheduleVisit />;
  } else if (slug === "advanceBooking") {
    return <AdvanceBooking />;
  } else if (slug === "rentPayment") {
    return <RentPaymentComponent />;
  } else if (slug === "complains") {
    return <ComplainListAdmin />;
  } else if (slug === "teamMember") {
    return <TeamMember />;
  }
};
function Dynamic() {
  const router = useRouter();
  const authState = useAuthContext();
  const ruter = useRouter();
  useEffect(() => {
    if (!authState?.user || authState?.user?.role !== "admin") {
      router.push("/");
    }
  }, [authState.user, router]);

  const slug = ruter.query.slug;

  return (
    <Template value={slug}>
      <RenderComponent slug={slug} />
    </Template>
  );
}

export default Dynamic;
