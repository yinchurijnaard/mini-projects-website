import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-center">
      <Link href="/" className="p-4 text-4xl underline">
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
