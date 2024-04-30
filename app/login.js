"use client"
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BiLockOpen } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { debounce } from "./utils/Debounce";
import Link from "next/link";
import IsValidEmail from "./utils/IsEmailValid";
import "./style/login.css"



function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(true);
  // const [login, { data: loginUser, isError, isLoading, error }] = useLoginMutation();
  // const userData = useSelector(state => state.auth) || {};
  // const navigate = useNavigate();

  const handleFormData = (event) => {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));

    if (event.target.name === "email") {
      emailValidityChecking(event.target.value)
    }
  }

  const handleEmail = (email) => {
    const emailValidity = IsValidEmail(email);
    setValid(emailValidity);
  }
  const emailValidityChecking = debounce(handleEmail, 700);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData?.email && formData?.password) {
      login({ data: { ...formData } })
    }
  }


  return (
    <form onSubmit={handleSubmit} className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-12">
        <div className="relative">
          {
            formData?.email !== "" ||
            <div className="absolute top-5 left-4 flex items-center space-x-1 text-sm opacity-60">
              <MdOutlineAlternateEmail className="placeHolderIcon" />
              <span className="label">Your Email</span>
            </div>
          }

          <input type="text"
            className={`inputBox ${valid || "invalidEmailInput"} min-w-[260px] sm:min-w-[400px] md:min-w-[540px]`}
            name="email"
            onChange={(event) => handleFormData(event)}
            required
          />
          {valid || <small className="invalidEmailError block text-start">Please enter a valid email address.</small>}
        </div>

        {/* Password */}
        <div className="relative">
          {formData?.password !== "" ||
            <div className="absolute top-4 left-4 flex items-center space-x-1 text-sm opacity-60">
              <BiLockOpen className="placeHolderIcon" />
              <span className="label">Password</span>
            </div>
          }

          <input type={open ? "text" : "password"}
            className="inputBox min-w-[260px] sm:min-w-[400px] md:min-w-[540px]"
            name="password"
            onChange={(event) => handleFormData(event)}
            required
          />

          {/* password be showed or not be showed */}
          <p className="absolute top-4 right-5 cursor-pointer">
            {open ? <BiSolidShow className="eye" onClick={() => setOpen(!open)} /> : <BsEyeSlash className="eye" onClick={() => setOpen(!open)} />}
          </p>

          {/* Form button */}
          <div>
            <button type="submit" className="signInBtn w-[260px] sm:w-[400px] md:w-[540px]">Login </button>
          </div>

        </div>
      </div>
      {/* {loginError !== "" && <Error message={loginError} />} */}
    </form>
  );
}

export default LoginForm;