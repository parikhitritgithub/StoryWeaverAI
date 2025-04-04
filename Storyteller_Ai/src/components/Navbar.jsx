import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full bg-transparent z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/" className="md:flex md:items-center gap-2">
              <span className="sr-only">Home</span>
              {/* <img className="block w-8 h-8" src="" alt="Gam" /> */}
              <span className="hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 text-2xl font-bold tracking-tight">
                Team_Game_Mind
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link 
                to="/dashboard" 
                className="block rounded-xl bg-yellow-600 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring transition-colors duration-200"
              >
                ABOUT US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;