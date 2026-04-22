import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-center">
      <Link href="/" className="p-4 text-2xl underline">
        Mini Projects by Yin Chu
      </Link>
    </nav>
  );
};

export default Navbar;
