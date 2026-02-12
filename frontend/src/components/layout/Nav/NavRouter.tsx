import NavLink from "./NavLink";
import UserDropdown from "./UserDropdown";

const NavRouter = ({ mode = "main", user }: { mode?: "main" | "auth", user?: any }) => {

  if (mode === "auth") {
    if (user) {
      return <UserDropdown user={user} onLogout={() => {}} />;
    }
    return (
      <>
        <NavLink to="/login" label="Sign In" />
        <NavLink to="/signup" label="Join Academy" variant="button" />
      </>
    );
  }

  return (
    <>
      <NavLink to="/" label="Home" />
      <NavLink to="/batches" label="All Batches" />
      <NavLink to="/courses" label="All Courses" />
      {user && (
        <>
          <NavLink 
            to={user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"} 
            label="Dashboard" 
            variant="button"
          />
          {user.role !== "teacher" && <NavLink to="/my-batch" label="My Learning" />}
        </>
      )}
    </>
  );
};

export default NavRouter;
