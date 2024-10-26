
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import Loading from "../loading";
import NavAdmin from "../components/NavAdmin";
import { SlChart } from "react-icons/sl";
import { PiTShirt } from "react-icons/pi";
import { PiShoppingCart } from "react-icons/pi";
import { MdOutlineCategory } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { IoColorPaletteOutline } from "react-icons/io5";
import { PiXLogoLight } from "react-icons/pi";
const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid grid-cols-12 w-full min-h-screen ">
            {/* Sidebar */}
            <aside className="transition-all bg-[#fff] col-span-1 lg:col-span-2 duration-300  border-r border-gray-300"
            >
                <div className="p-[14px] border-b border-b-gray-300">
                    <Link href={"/"}>
                        <h2 className={`text-3xl tracking-widest font-extrabold hidden lg:block`}>SHOPCO.</h2>
                    </Link>
                </div>
                <nav className="mt-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="flex justify-start p-2  md:p-4 text-gray-600 hover:bg-gray-200">
                                <SlChart   size={20} className=" md:mr-2" /> 
                                <span className={`hidden lg:block`}>Dashboard</span> 
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/products" className="flex justify-start items-center  p-2  md:p-4 text-gray-600 hover:bg-gray-200">
                                <PiTShirt  size={20} className=" md:mr-2" /> 
                                <span className={`hidden lg:block`}>Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/orders" className="flex items-center  p-2  md:p-4 text-gray-600 hover:bg-gray-200">
                                <PiShoppingCart  size={20} className=" md:mr-2" /> 
                                <span className={`hidden lg:block`}>Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/categories" className="flex items-center  p-2  md:p-4 text-gray-600 hover:bg-gray-200">
                                <TbCategory  size={20} className=" md:mr-2" /> 
                                <span className={`hidden lg:block`}>Categories</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/subcategories" className="flex items-center  p-2  md:p-4 text-gray-600 hover:bg-gray-200">
                                <MdOutlineCategory   size={20} className=" md:mr-2" /> 
                                <span className={`hidden lg:block`}>Sub-Categories</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/colors" className="flex items-center  p-2  md:p-4 text-gray-600 hover:bg-gray-200">
                            <IoColorPaletteOutline   size={20} className=" md:mr-2" /> 
                                <span className={`hidden lg:block`}>Colors</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/sizes" className="flex items-center  p-2  md:p-4 text-gray-600 hover:bg-gray-200">
                            <PiXLogoLight   size={20} className=" md:mr-2" /> 
                                <span className={`hidden lg:block`}>Sizes</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <Suspense fallback={<Loading />}>
                <main className="col-span-11 lg:col-span-10 bg-[#f1f5f9] ">
                    {/* Navbar */}
                    <div className="bg-[#fff]">
                        <NavAdmin />
                    </div>
                    <div className="p-3">{children} </div>
                </main>
            </Suspense>
        </div>
    );
};

export default AdminLayout;
