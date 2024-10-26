
import TopBanner from "./TopBanner";
import Navbar from "./Navbar";


const Header = () => {
  return (
    <header className="bg-white shadow-md w-full sticky top-0 left-0 z-30  ">
      
       <TopBanner/>
       <Navbar/>
      
    </header>
  );
};

export default Header;
