/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";

import Footer from "../components/_App/Footer";
import useListing from "../utils/Hooks/useListing";
import Loading from "../components/Shared/Loading";

const Listing = () => {
  const router = useRouter();
  const query = router.query;
  const { listing, isLoading } = useListing(query?.city, query?.roomType);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="listings-area mt-lg-5">
          <div className="container-fluid">
            <div className="row m-0">
              <div className="col-xl-8 col-lg-12 col-md-12 p-0">
                <div className="row">
                  <div className="col-lg-4 col-md-12">
                    <aside className="listings-widget-area">
                      <section className="widget widget_filters">
                        <h3 className="widget-title">Filters</h3>

                        <ul>
                          <li>
                            <button type="button">$</button>
                          </li>
                          <li>
                            <button type="button">$$</button>
                          </li>
                          <li>
                            <button type="button">$$$</button>
                          </li>
                          <li>
                            <button type="button">$$$$</button>
                          </li>
                        </ul>
                      </section>

                      <section className="widget widget_categories">
                        <h3 className="widget-title">Categories</h3>
                        <ul>
                          {/* none hide list */}
                          {[
                            "Restaurant",
                            "Hotel",
                            "Beauty & Spa",
                            "Fitness",
                            "Shopping",
                          ].map((elm, index) => (
                            <li key={index}>
                              <input id="categories1" type="checkbox" />
                              <label htmlFor="categories1">{elm}</label>
                            </li>
                          ))}

                          {/* hide list */}
                          {["Hospital", "Events", "Clothing"].map(
                            (elm, index) => (
                              <li className="hide" key={index}>
                                <input id="categories6" type="checkbox" />
                                <label htmlFor="categories6">{elm}</label>
                              </li>
                            )
                          )}
                          <li className="see-all-btn">
                            <span>See All</span>
                          </li>
                        </ul>
                      </section>

                      <section className="widget widget_features">
                        <h3 className="widget-title">Features</h3>

                        <ul>
                          {/* none hide list */}
                          {[
                            "Restaurant",
                            "Hotel",
                            "Beauty & Spa",
                            "Fitness",
                            "Shopping",
                          ].map((elm, index) => (
                            <li key={index}>
                              <input
                                id="categories1"
                                type="checkbox"
                                key={elm}
                              />
                              <label htmlFor="categories1">{elm}</label>
                            </li>
                          ))}

                          {/* hide list */}
                          {["Hospital", "Events", "Clothing"].map(
                            (elm, index) => (
                              <li className="hide" key={elm}>
                                <input id="categories6" type="checkbox" />
                                <label htmlFor="categories6">{elm}</label>
                              </li>
                            )
                          )}
                          <li className="see-all-btn">
                            <span>See All</span>
                          </li>
                        </ul>
                      </section>

                      <section className="widget widget_distance">
                        <h3 className="widget-title">Distance</h3>

                        <ul>
                          {/* none hide list */}
                          {[
                            "Driving (5 mi.)",
                            "Walking (1 mi.)",
                            "Biking (2 mi.)",
                            "Within 4 blocks",
                            "Bicycle (6 mi.)",
                          ].map((elm) => (
                            <li key={elm}>
                              <input id="distance1" type="checkbox" />
                              <label htmlFor="distance1">{elm}</label>
                            </li>
                          ))}

                          {/* hide list */}
                          {["Driving (10 mi.)", "Walking (11 mi.)"].map(
                            (elm) => (
                              <li className="hide" key={elm}>
                                <input id="distance6" type="checkbox" />
                                <label htmlFor="distance6">{elm}</label>
                              </li>
                            )
                          )}
                          <li className="see-all-btn">
                            <span>See All</span>
                          </li>
                        </ul>
                      </section>
                    </aside>
                  </div>

                  <div className="col-lg-8 col-md-12">
                    <div className="all-listings-list">
                      <div className="listings-grid-sorting row align-items-center">
                        <div className="col-lg-5 col-md-6 result-count">
                          <p>
                            <span className="count">9</span> Results
                          </p>
                        </div>

                        <div className="col-lg-7 col-md-6 ordering">
                          <div className="d-flex justify-content-end">
                            <div className="select-box">
                              <label>Sort By:</label>
                              <select className="blog-select">
                                {[
                                  "Recommended",
                                  "Default",
                                  "Latest",
                                  "Price: low to high",
                                  "Price: high to low",
                                ].map((elm) => (
                                  <option key={elm}>{elm}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {listing.map(
                          ({
                            id,
                            name,
                            AvailAbility,
                            FeatureResident,
                            city,
                            roomPhotos,
                          }) => {
                            return (
                              <div key={id} className="col-lg-12 col-md-12">
                                <div className="single-listings-item">
                                  <div className="row m-0">
                                    <div className="col-lg-4 col-md-4 p-0">
                                      <div className="listings-image bg-img5">
                                        <img
                                          src={`${
                                            roomPhotos === 0
                                              ? "/images/listings/listings10.jpg"
                                              : roomPhotos[0].path
                                          }`}
                                          alt="image"
                                        />
                                        <a href="#" className="bookmark-save">
                                          <i className="flaticon-heart"></i>
                                        </a>
                                        <a href="#" className="category">
                                          <i className="flaticon-cooking"></i>
                                        </a>

                                        <Link
                                          href={{
                                            pathname: `/listing/${id}`,
                                            query: {
                                              roomType:
                                                AvailAbility[0]?.roomType
                                                  ?.typeOfRoom,
                                            },
                                          }}
                                        >
                                          <a className="link-btn"></a>
                                        </Link>
                                      </div>
                                    </div>

                                    <div className="col-lg-8 col-md-8 p-0">
                                      <div className="listings-content">
                                        {true ? (
                                          <span className="status">
                                            <i className="flaticon-save"></i>{" "}
                                            Open Now
                                          </span>
                                        ) : (
                                          <span className="status status-close">
                                            <i className="flaticon-save"></i>{" "}
                                            Close Now
                                          </span>
                                        )}

                                        <h3>
                                          <Link
                                            href={{
                                              pathname: `/listing/${id}`,
                                              query: {
                                                roomType:
                                                  AvailAbility[0]?.roomType
                                                    ?.typeOfRoom,
                                              },
                                            }}
                                          >
                                            <a>{name}</a>
                                          </Link>
                                        </h3>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="rating">
                                            <i className="bx bxs-star"></i>
                                            <i className="bx bxs-star"></i>
                                            <i className="bx bxs-star"></i>
                                            <i className="bx bxs-star"></i>
                                            <i className="bx bxs-star"></i>
                                            <span className="count">(55)</span>
                                          </div>
                                          <div className="price">
                                            Start From{" "}
                                            <span>
                                              Rs.{AvailAbility[0].price}
                                            </span>
                                          </div>
                                        </div>
                                        <ul className="listings-meta">
                                          {FeatureResident.map(
                                            ({ feature, featureId }, index) => {
                                              return (
                                                <li key={featureId}>
                                                  <a href="#">
                                                    <i className="flaticon-shopping-bags"></i>{" "}
                                                    {feature.feature_name}
                                                  </a>
                                                </li>
                                              );
                                            }
                                          )}
                                          <li>
                                            <a href="#">
                                              <i className="flaticon-pin"></i>{" "}
                                              {city.name}
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-12 col-md-12 p-0">
                <div className="map-container fw-map side-full-map">
                  <div id="main-full-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8385385572983!2d144.95358331584498!3d-37.81725074201705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4dd5a05d97%3A0x3e64f855a564844d!2s121%20King%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sbd!4v1612419490850!5m2!1sen!2sbd"></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer bgColor="bg-f5f5f5" />
    </>
  );
};

export default Listing;
