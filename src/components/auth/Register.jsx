import React from "react";
import "./Auth.css";
import { useAction } from "../../store/actionContext";
import { AiOutlineClose } from "react-icons/ai";
import { months, year, days } from "../../utils/data";
import { BiChevronDown } from "react-icons/bi";
import { useAuthContext } from "../../store/authContext";

const Register = () => {
  const { setShowLogin } = useAction();
  const {
    initialState,
    showInfo,
    setUser: setInfoData,
    user: infoData,
    setShowInfo,
    handleChange,
    focus,
    setFocus,
    submitUser,
    loading,
  } = useAuthContext();

  const { month, day, years } = showInfo;
  const { monthInfo, dayInfo, yearInfo, name, email, passowrd, uniqueId } =
    infoData;

  return (
    <>
      <div className="overLay" onClick={() => setShowLogin(false)}></div>
      <section
        className="registerBar fixedIt "
        onClick={() => setShowInfo(initialState)}
      >
        <AiOutlineClose
          size={23}
          cursor={"pointer"}
          onClick={() => setShowLogin(false)}
        />
        <div className="contentRegister">
          <h1>Create your account</h1>

          <div className="registerForm">
            <div
              className={`firstInput ${
                focus === "name" ? "firstInputActive" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange}
                onFocus={() => setFocus("name")}
                onBlur={() => setFocus("")}
              />
            </div>

            <div
              className={`firstInput ${
                focus === "email" ? "firstInputActive" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
                onFocus={() => setFocus("email")}
                onBlur={() => setFocus("")}
              />
            </div>

            <div
              className={`firstInput ${
                focus === "uniqueId" ? "firstInputActive" : ""
              }`}
            >
              <input
                type="text"
                placeholder="UniqueId"
                name="uniqueId"
                value={uniqueId}
                maxLength={10}
                onChange={handleChange}
                onFocus={() => setFocus("uniqueId")}
                onBlur={() => setFocus("")}
              />
            </div>

            <div
              className={`firstInput ${
                focus === "password" ? "firstInputActive" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Password"
                name="password"
                value={passowrd}
                onChange={handleChange}
                onFocus={() => setFocus("password")}
                onBlur={() => setFocus("")}
              />
            </div>

            <div className="birth">
              <h4>Date of birth</h4>
              <span>
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </span>

              <div className="selectBirth">
                <div
                  className={`month ${month ? "activeBox" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo({ ...showInfo, month: true });
                  }}
                >
                  <div className="monthInfo">
                    <span>Month</span>
                    <p>{monthInfo}</p>
                  </div>
                  <BiChevronDown cursor={"pointer"} size={25} />

                  {month && (
                    <div className="months">
                      {months?.map((li) => (
                        <span
                          className={`monthsList ${
                            li === monthInfo ? "activeLine" : ""
                          }`}
                          key={li}
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfoData({ ...infoData, monthInfo: li });
                            setShowInfo({ ...showInfo, month: false });
                          }}
                        >
                          <p>{li}</p>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`month ${day ? "activeBox" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo({ ...showInfo, day: true });
                  }}
                >
                  <div className="monthInfo">
                    <span>Date</span>
                    <p>{dayInfo}</p>
                  </div>
                  <BiChevronDown cursor={"pointer"} size={25} />

                  {day && (
                    <div className="months days">
                      {days?.map((li) => (
                        <span
                          className={`monthsList dayList ${
                            li === dayInfo ? "activeLine" : ""
                          }`}
                          key={li}
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfoData({ ...infoData, dayInfo: li });
                            setShowInfo({ ...showInfo, day: false });
                          }}
                        >
                          <p>{li}</p>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`month ${years ? "activeBox" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo({ ...showInfo, years: true });
                  }}
                >
                  <div className="monthInfo">
                    <span>Year</span>
                    <p>{yearInfo}</p>
                  </div>
                  <BiChevronDown cursor={"pointer"} size={25} />

                  {years && (
                    <div className="months days">
                      {year?.map((li) => (
                        <span
                          className={`monthsList dayList ${
                            li === yearInfo ? "activeLine" : ""
                          }`}
                          key={li}
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfoData({ ...infoData, yearInfo: li });
                            setShowInfo({ ...showInfo, years: false });
                          }}
                        >
                          <p>{li}</p>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className="registerButton" onClick={submitUser}>
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
