"use client";
// components/FormComponent.js

import { createPost } from "../_lib/actions";
// import { useActionState } from "react";
import { useFormStatus, useFormState } from "react-dom";
const initialState = {
  message: "",
};
const FormComponent = () => {
  const [state, action] = useFormState(createPost, initialState);

  return (
    <form
      action={action}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
      {state.errorMessage && <div>{state.errorMessage}</div>}
    </form>
  );
};

export default FormComponent;
