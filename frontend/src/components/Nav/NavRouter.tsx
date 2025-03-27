import NavLink from "./NavLink";

const NavRouter = () => {
  return (
    <>
      <NavLink to="/" label="Home" />
      <NavLink to="/batches" />
      <NavLink to="/chat" />
      <NavLink to="/login" />
      <NavLink to="/signup" />
    </>
  );
};

export default NavRouter;
