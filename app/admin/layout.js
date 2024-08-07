import AdminSidebar from "../_components/AdminSidebar";
import RequireAuthBlog from "../_components/RequireAuthBlog";

export default function Layout({ children }) {
  return (
    <>
      <RequireAuthBlog allowedRole={["ADMIN"]}>
        <div className="relative flex flex-grow flex-col bg-light dark:bg-dark sm:flex-row">
          <AdminSidebar />
          {children}
        </div>
      </RequireAuthBlog>
    </>
  );
}
