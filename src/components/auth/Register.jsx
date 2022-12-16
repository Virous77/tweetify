import React from "react";
import "./Auth.css";
import { useAction } from "../../store/actionContext";
import { AiOutlineClose } from "react-icons/ai";
import { months, year, days } from "../../utils/data";
import { BiChevronDown } from "react-icons/bi";

const Register = () => {
  const { setShowLogin } = useAction();
  return (
    <>
      <div className="overLay" onClick={() => setShowLogin(false)}></div>
      <main className="registerBar fixedIt ">
        <AiOutlineClose
          size={23}
          cursor={"pointer"}
          onClick={() => setShowLogin(false)}
        />
        <div className="contentRegister">
          <h1>Create your account</h1>

          <div className="registerForm">
            <div className="firstInput">
              <input type="text" placeholder="Name" />
            </div>

            <div className="firstInput">
              <input type="text" placeholder="Email" />
            </div>

            <div className="birth">
              <h4>Date of birth</h4>
              <span>
                This will not be shown publicly. Confirm your own age, even if
                this account is for a business, a pet, or something else.
              </span>

              <div className="selectBirth">
                <div className="month">
                  <div className="month">
                    <span>Month</span>
                    <p>October</p>
                  </div>
                  <BiChevronDown />

                  <select className="months">
                    <option disabled value="">
                      Month
                    </option>
                    {months?.map((li) => (
                      <option className="monthsList" key={li}>
                        <p>{li}</p>
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
