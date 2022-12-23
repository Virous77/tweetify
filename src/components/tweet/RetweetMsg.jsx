import React from "react";
import { useAction } from "../../store/actionContext";

const RetweetMsg = () => {
  const { setShowRetweetType, showRetweetType, initialState } = useAction();

  console.log(showRetweetType);

  return (
    <>
      <div
        className="overLay"
        onClick={() => {
          setShowRetweetType({
            ...showRetweetType,
            retweetData: showRetweetType.retweetType,
          });
        }}
      ></div>
      <div>RetweetMsg</div>
    </>
  );
};

export default RetweetMsg;
