import Link from "next/link";
import React from "react";
import { useAuthContext } from "../../contexts/authContext";
import useAnalitic from "../../utils/Hooks/useAnalitic";
import Loading from "../Shared/Loading";

function AdminIndex() {
  const context = useAuthContext();
  const { isLoading, analitic } = useAnalitic();

  if (isLoading || !analitic) {
    return <Loading />;
  }
  return (
    <>
      <div className="breadcrumb-area">
        <h1>Hi,{context.user?.name}</h1>
        <ol className="breadcrumb">
          <li className="item">
            <Link href="/dashboard">
              <a>Home</a>
            </Link>
          </li>
          <li className="item">Dashboard</li>
        </ol>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="stats-card-box">
            <div className="icon-box">
              <i className="bx bx-map-alt"></i>
            </div>
            <span className="sub-title">Schedule Visit Listing</span>
            <h3>{analitic?.numberOfScheduleVisit}</h3>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="stats-card-box">
            <div className="icon-box">
              <i className="bx bx-line-chart"></i>
            </div>
            <span className="sub-title">Number Of Comments</span>
            <h3>{analitic?.numberOfComment}</h3>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="stats-card-box">
            <div className="icon-box">
              <i className="bx bx-star"></i>
            </div>
            <span className="sub-title">Numbers of Adavance Booking</span>
            <h3>{analitic?.numberOfScheduleVisit}</h3>
          </div>
        </div>

        {/* <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="stats-card-box">
            <div className="icon-box">
              <i className="bx bx-heart"></i>
            </div>
            <span className="sub-title">Bookmarked</span>
            <h3>150</h3>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default AdminIndex;
