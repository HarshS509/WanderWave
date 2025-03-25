"use client";

import { useEffect, useState } from "react";
import { loginUser } from "../_lib/actions";
import EyeIcon from "@/app/_assets/svg/eye.svg";
import { useFormStatus, useFormState } from "react-dom";
import EyeOffIcon from "@/app/_assets/svg/eye-off.svg";
import { toast } from "react-toastify";
import userState from "../_utils/user-state";

// Function to store auth token in localStorage
const storeAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", token);
    console.log("Token stored in localStorage");
  }
};

const initialState = {
  errors: {
    userNameOrEmail: null,
    password: null,
  },
  success: null,
  data: null,
  message: null,
  resetKey: Date.now(),
};

function SigninForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [state, action] = useFormState(loginUser, initialState);
  const { pending } = useFormStatus();

  useEffect(
    function () {
      if (state.success) {
        toast.success(state.message);
        const userId = state.data?.data?.user?._id;
        const userRole = state.data?.data?.user?.role;
        userState.setUser({ _id: userId, role: userRole });

        // Store the token in localStorage if it exists in the response
        const token = state.data?.accessToken || state.data?.data?.accessToken;
        if (token) {
          storeAuthToken(token);
          console.log("Authentication token stored");
        } else {
          console.warn("No token found in login response");
        }

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
      if (state.success === false) {
        toast.error(state.message);
      }
    },
    [state]
  );

  return (
    <form
      action={action}
      key={state?.resetKey}
      className="w-full md:w-3/4 lg:w-2/5"
    >
      <div className="mb-2">
        <input
          name="userNameOrEmail"
          type="text"
          placeholder="Username or Email"
          className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
        />
        {state.errors?.userNameOrEmail && (
          <p className="p-3 text-xs text-red-500">{`${state.errors.userNameOrEmail}`}</p>
        )}
      </div>
      <div className="mb-4 flex flex-col">
        <div className="relative">
          <input
            name="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
          >
            <img
              src={passwordVisible ? "/eye.svg" : "/eye-off.svg"}
              alt="Toggle-visibility"
              className="h-5 w-5"
            />
          </button>
        </div>
        {state.errors?.password && (
          <p className="p-3 text-xs text-red-500">{`${state.errors.password}`}</p>
        )}
      </div>

      <button
        disabled={pending}
        type="submit"
        className="flex w-full items-center justify-center rounded-lg bg-neutral-800 p-3 text-base font-medium text-light disabled:bg-neutral-600  dark:bg-light dark:text-dark dark:hover:bg-dark-secondary/80 sm:text-lg sm:font-semibold"
      >
        Log In
      </button>
    </form>
  );
}

export default SigninForm;
