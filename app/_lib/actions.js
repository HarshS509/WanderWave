"use server";

import axiosInstance from "../_utils/axiosInstance";
// import { toast } from "react-toastify";
// import userState from "../_utils/user-state";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AxiosError, isAxiosError } from "axios";
import { cookies } from "next/headers";

export async function createPost(bookingData, prevState, formData) {
  const description = formData.get("description");
  const title = formData.get("title");
  const authorName = formData.get("authorName");
  const imageLink = formData.get("imageLink");
  const { categories } = bookingData;

  const errors = {
    title: !title ? "Title is required" : null,
    description:
      !description || description.split(" ").length < 10
        ? "Oops! Description needs more detail. Give it at least 10 words"
        : null,
    authorName: !authorName ? "Author name is required" : null,
    imageLink: !imageLink ? "Image link is required" : null,
    categories:
      categories.length === 0 ? "At least one category is required" : null,
  };

  // Check if there are any errors
  if (Object.values(errors).some((error) => error !== null)) {
    return { errors };
  }

  try {
    // Get token from the client component
    const { accessToken } = bookingData;

    // Create the body object without the token
    const { accessToken: _, ...postData } = bookingData;
    const bodyObject = {
      ...postData,
      // other properties from formData if needed
    };

    console.log(
      "Using token for authorization:",
      accessToken ? "Token present" : "No token"
    );

    const response = await axiosInstance.post("/api/posts", bodyObject, {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });

    // console.log(response, "response");

    revalidatePath("/");
    return {
      message: "Blog post created successfully!",
      success: true,
      resetKey: Date.now(),
    };
  } catch (e) {
    console.log(e.message, e);
    return {
      message: "Blog creation failed :(",
      success: false,
      resetKey: prevState.resetKey,
    };
  }
  // If no errors, process the form data
}

export async function loginUser(prevState, formData) {
  const userNameOrEmail = formData.get("userNameOrEmail");
  const password = formData.get("password");
  const data = {
    userNameOrEmail,
    password,
  };
  const errors = {
    userNameOrEmail: !userNameOrEmail ? "Username or email is required" : null,
    password:
      !password || password.length < 8
        ? "Password must be at least 8 characters long"
        : null,
  };

  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, resetKey: prevState.resetKey };
  }
  const response = axiosInstance.post("/api/auth/login", data);

  try {
    const preData = await response;
    const { data } = preData;

    revalidatePath("/");

    return {
      data,
      success: true,
      resetKey: Date.now(),
      message: data?.message,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "Signin failed",
      resetKey: prevState.resetKey,
    };
  }
}

export async function signUpUser(prevState, formData) {
  const userName = formData.get("userName");
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const errors = {
    userName: !userName ? "Username is required" : null,
    fullName:
      !fullName || fullName.length < 3 || fullName.length > 15
        ? "Name is required and must be between 3 to 15 characters"
        : null,
    email:
      !email ||
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        email
      )
        ? "Invalid email"
        : null,
    password:
      !password ||
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password
      )
        ? "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, one digit, and one special character"
        : null,
    confirmPassword:
      confirmPassword !== password ? "Passwords do not match" : null,
  };

  if (Object.values(errors).some((error) => error !== null)) {
    return { errors, success: false, resetKey: prevState.resetKey };
  }
  const data = {
    userName,
    fullName,
    email,
    password,
  };

  try {
    const response = await axiosInstance.post("/api/auth/register", data);
    revalidatePath("/");
    return {
      success: true,
      data: response.data,
      message: response.data?.message,
      resetKey: Date.now(),
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message);
    } else {
      console.error(error);
    }
    return {
      errors,
      success: false,
      message: "Sign up failed",
      resetKey: prevState.resetKey,
    };
  }
}
