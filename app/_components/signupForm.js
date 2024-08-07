"use client";
import { useFormStatus, useFormState } from "react-dom";
import { signUpUser } from "../_lib/actions";
import { useEffect, useState } from "react";
import userState from "../_utils/user-state";
import { toast } from "react-toastify";

const initialState = {
  errors: {
    userName: null,
    fullName: null,
    email: null,
    password: null,
    confirmPassword: null,
  },
  message: null,
  success: null,
  resetKey: Date.now(),
};
function SignupForm() {
  const [state, action] = useFormState(signUpUser, initialState);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { pending } = useFormStatus();
  useEffect(
    function () {
      if (state?.success) {
        const userId = state.data?.data?.user?._id;
        const userRole = state.data?.data?.user?.role;
        toast.success("Signup successful!");
        userState.setUser({ _id: userId, role: userRole });

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
      if (state?.success === false) {
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
          name="userName"
          type="text"
          placeholder="Username"
          className="dark:placholder w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
        />
        {state?.errors?.userName && (
          <p className="p-3 text-xs text-red-500">{`${state?.errors?.userName}`}</p>
        )}
      </div>
      <div className="mb-2">
        <input
          name="fullName"
          type="text"
          placeholder="Name"
          className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
        />
        {state?.errors?.fullName && (
          <p className="p-3 text-xs text-red-500">{`${state.errors.fullName}`}</p>
        )}
      </div>
      <div className="mb-2">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
        />
        {state?.errors?.email && (
          <p className="p-3 text-xs text-red-500">{`${state.errors.email}`}</p>
        )}
      </div>

      {/*password*/}
      <div className="relative mb-2">
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
            src={passwordVisible ? "/eye-off.svg" : "/eye.svg"}
            alt="Toggle Password Visibility"
            className="h-5 w-5"
          />
        </button>
        {state?.errors?.password && (
          <p className="p-3 text-xs text-red-500">{`${state.errors.password}`}</p>
        )}
      </div>

      <div className="relative mb-4">
        <input
          name="confirmPassword"
          type={passwordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full rounded-lg bg-zinc-100 p-3 font-normal placeholder:text-sm dark:bg-dark-field dark:text-dark-textInField"
        />
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
        >
          <img
            src={passwordVisible ? "/eye-off.svg" : "/eye.svg"}
            alt="Toggle Confirm Password Visibility"
            className="h-5 w-5"
          />
        </button>
        {state?.errors?.confirmPassword && (
          <p className="p-3 text-xs text-red-500">{`${state?.errors?.confirmPassword}`}</p>
        )}
      </div>
      <button
        disabled={pending}
        type="submit"
        className="flex w-full items-center justify-center rounded-lg bg-neutral-800 p-3 text-base font-medium text-light disabled:bg-neutral-600  dark:bg-light dark:text-dark dark:hover:bg-dark-secondary/80 sm:text-lg sm:font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
