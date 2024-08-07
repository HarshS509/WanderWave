"use client";
import { useEffect, useState } from "react";
import { createPost } from "../_lib/actions";
import { categories } from "../_utils/category-colors";
import ModalComponent from "./modal";
import { useFormStatus, useFormState } from "react-dom";
import CategoryPill from "./category-pill";
import { toast } from "react-toastify";

const initialState = {
  errors: {
    title: null,
    description: null,
    authorName: null,
    categories: null,
    imageLink: null,
  },
  message: null,
  success: null,
  resetKey: Date.now(),
};
function AddBlogForm() {
  const [selectedImage, setSelectedImage] = useState("");

  const [data, setData] = useState({
    imageLink: "",
    categories: [],
    isFeaturedPost: false,
  });
  const createPostWithData = createPost.bind(null, data);
  const [state, action] = useFormState(createPostWithData, initialState);
  const [modal, setModal] = useState(false);
  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const isValidCategory = (category) => {
    return (
      data?.categories?.length >= 3 && !data?.categories?.includes(category)
    );
  };
  const handleselector = () => {
    setData((data) => {
      return {
        ...data,
        imageLink: selectedImage,
      };
    });
    setModal(false);
  };
  const handleCategoryClick = (category) => {
    if (isValidCategory(category)) return;
    if (data.categories.includes(category)) {
      setData((data) => {
        return {
          ...data,
          categories: data.categories.filter((cat) => cat !== category),
        };
      });
    } else {
      setData((data) => {
        return {
          ...data,
          categories: [...data.categories, category],
        };
      });
    }
  };
  const handleImageLinkChange = (e) => {
    setData((data) => {
      return {
        ...data,
        imageLink: e.target.value,
      };
    });
  };
  useEffect(
    function () {
      if (state.success === false) {
        toast.error(state.message);
      }
      if (state.success === true) {
        toast.success("Blog created successfully!");
        setData(initialState);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    },
    [state]
  );
  return (
    <>
      <form action={action} className="sm:w-5/6 lg:w-2/3">
        <div className="mb-2 flex items-center">
          <label className="flex items-center">
            <span className="px-2 text-base font-medium text-light-secondary dark:text-dark-secondary">
              Is this a featured blog?
            </span>
            <input
              name="isFeaturedPost"
              type="checkbox"
              className="ml-2 h-5 w-5 cursor-pointer rounded-full accent-purple-400"
              // checked={formData.isFeaturedPost}
              // onChange={handleCheckboxChange}
            />
          </label>
        </div>

        <div className="mb-2">
          <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
            Blog title *
          </div>
          <input
            name="title"
            type="text"
            placeholder="Travel Bucket List for this Year"
            autoComplete="off"
            className="dark:text-textInField mb-1 w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-field dark:text-dark-textColor dark:placeholder:text-dark-tertiary"
          />
          {state.errors?.title && (
            <span className="p-2 text-sm text-red-500">{`${state.errors.title}`}</span>
          )}
        </div>

        <div className="mb-1">
          <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
            Blog content *
          </div>
          <textarea
            placeholder="Start writing here&hellip;"
            name="description"
            rows={5}
            className="dark:text-textInField w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-field dark:text-dark-textColor dark:placeholder:text-dark-tertiary"
          />
          {state.errors?.description && (
            <span className="p-2 text-sm text-red-500">{`${state.errors.description}`}</span>
          )}
        </div>
        <div className="mb-2">
          <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
            Author name *
          </div>
          <input
            name="authorName"
            type="text"
            placeholder="Shree Sharma"
            className="dark:text-textInField mb-1 w-full rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-field dark:text-dark-textColor dark:placeholder:text-dark-tertiary"
          />
          {state.errors?.authorName && (
            <span className="p-2 text-sm text-red-500">{`${state.errors.authorName}`}</span>
          )}
        </div>

        <div className="px-2 py-1 font-medium text-light-secondary dark:text-dark-secondary">
          Blog cover image
          <span className="text-xs tracking-wide text-dark-tertiary">
            &nbsp;(jpg/png/webp)&nbsp;
          </span>
          *
        </div>
        <div>
          <div className="mb-1 flex justify-between gap-2 sm:gap-4">
            <input
              type="url"
              id="imagelink"
              name="imageLink"
              placeholder="https://&hellip;"
              autoComplete="off"
              className="dark:text-textInField w-3/4 rounded-lg bg-slate-200 p-3 placeholder:text-sm placeholder:text-light-tertiary dark:bg-dark-field dark:text-dark-textColor dark:placeholder:text-dark-tertiary lg:w-10/12"
              value={data.imageLink}
              onChange={handleImageLinkChange}
            />
            <button
              type="button"
              className="lg:text-md active:scale-click w-1/4 rounded-lg bg-light-primary text-xs text-slate-50 hover:bg-light-primary/80 dark:bg-dark-primary dark:text-dark-card dark:hover:bg-dark-secondary/80 sm:text-sm lg:w-2/12 lg:px-4 lg:py-3"
              onClick={() => {
                setModal(true);
              }}
            >
              Pick image
            </button>
          </div>
          {state.errors?.imageLink && (
            <span className="p-2 text-sm text-red-500">{`${state.errors.imageLink}`}</span>
          )}
        </div>

        <div className="mb-4 flex flex-col">
          <label className="px-2 pb-1 font-medium text-light-secondary dark:text-dark-secondary sm:mr-4 sm:w-fit">
            Categories
            <span className="text-xs tracking-wide text-dark-tertiary">
              &nbsp;(max 3 categories)&nbsp;
            </span>
            *
          </label>
          <div>
            <div className="flex flex-wrap gap-3 rounded-lg p-2 dark:bg-dark-card dark:p-3">
              {categories.map((category, index) => (
                <span
                  key={`${category}-${index}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <CategoryPill
                    category={category}
                    selected={data?.categories?.includes(category)}
                    disabled={isValidCategory(category)}
                  />
                </span>
              ))}
            </div>
            {state.errors?.categories && (
              <span className="p-2 text-sm text-red-500">{`${state.errors.categories}`}</span>
            )}
          </div>
        </div>

        <button
          name="post-blog"
          type="submit"
          className="active:scale-click flex w-full items-center justify-center rounded-lg bg-light-primary px-12 py-3 text-base font-semibold text-light hover:bg-light-primary/80 dark:bg-dark-primary dark:text-dark-card dark:hover:bg-dark-secondary/80 sm:mx-1 sm:w-fit"
        >
          Post blog
        </button>
      </form>
      <ModalComponent
        selectedImage={selectedImage}
        handleImageSelect={handleImageSelect}
        handleSelector={handleselector}
        setModal={setModal}
        modal={modal}
      />
    </>
  );
}

export default AddBlogForm;
