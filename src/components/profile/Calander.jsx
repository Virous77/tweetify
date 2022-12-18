import React from "react";
import { months, year, days } from "../../utils/data";
import { useProfile } from "../../store/profileContext";
import { BiChevronDown } from "react-icons/bi";

const Calander = () => {
  const { setShowInfo, showInfo, infoData, setInfoData } = useProfile();

  const { month, day, years } = showInfo;
  const { monthInfo, dayInfo, yearInfo } = infoData;

  return (
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
                className={`monthsList ${li === monthInfo ? "activeLine" : ""}`}
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
  );
};

export default Calander;
