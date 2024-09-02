import NavLink from "./NavLink";

const NavRouter = () => {
  return (
    <>
      <NavLink to="/" label="Home" />
      <NavLink to="/batches" />
      <NavLink to="/contact" />
      <NavLink to="/login" />
      <NavLink to="/signup" />
    </>
  );
};

export default NavRouter;
