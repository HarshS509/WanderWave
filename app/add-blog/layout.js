import RequireAuthBlog from "../_components/RequireAuthBlog";

export default function Layout({ children }) {
  return (
    <>
      <RequireAuthBlog allowedRole={["ADMIN", "USER"]}>
        {children}
      </RequireAuthBlog>
    </>
  );
}
