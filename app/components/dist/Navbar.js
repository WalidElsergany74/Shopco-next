"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var dynamic_1 = require("next/dynamic");
var ButtonIcon_1 = require("./ui/ButtonIcon");
var ai_1 = require("react-icons/ai");
var link_1 = require("next/link");
var bi_1 = require("react-icons/bi");
var io5_1 = require("react-icons/io5");
var Searchbar_1 = require("./Searchbar");
var Drawer_1 = require("./Drawer");
var image_1 = require("next/image");
var nextjs_1 = require("@clerk/nextjs");
var swr_1 = require("swr");
var axios_1 = require("axios");
var loading_1 = require("../loading");
var UserButton = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('@clerk/nextjs'); }).then(function (mod) { return mod.UserButton; }); }, { ssr: false });
var SignInButton = dynamic_1["default"](function () { return Promise.resolve().then(function () { return require('@clerk/nextjs'); }).then(function (mod) { return mod.SignInButton; }); }, { ssr: false });
var Navbar = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var isSignedIn = nextjs_1.useUser().isSignedIn;
    var _l = react_1.useState(false), searchVisible = _l[0], setSearchVisible = _l[1];
    var _m = react_1.useState(false), menuOpen = _m[0], setMenuOpen = _m[1];
    var _o = react_1.useState(false), openRight = _o[0], setOpenRight = _o[1];
    var _p = react_1.useState(''), searchQuery = _p[0], setSearchQuery = _p[1];
    var _q = react_1.useState([]), filteredData = _q[0], setFilteredData = _q[1];
    var userId = nextjs_1.useAuth().userId;
    var user = nextjs_1.useUser();
    console.log(user);
    var fetcher = function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get(url)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data.data];
            }
        });
    }); };
    var cartData = swr_1["default"](userId ? "https://strapi-ecommerce-demo2.onrender.com/api/carts?populate=cart_items&filters[userId][$eq]=" + userId : null, fetcher, { refreshInterval: 1000 }).data;
    var cartItemsCount = ((_b = (_a = cartData === null || cartData === void 0 ? void 0 : cartData[0]) === null || _a === void 0 ? void 0 : _a.cart_items) === null || _b === void 0 ? void 0 : _b.length) || 0;
    var productsData = swr_1["default"]("https://strapi-ecommerce-demo2.onrender.com/api/products?populate=*", fetcher).data;
    react_1.useEffect(function () {
        var products = (productsData === null || productsData === void 0 ? void 0 : productsData.data) || [];
        if (searchQuery) {
            var results = products.filter(function (item) {
                return item.title.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setFilteredData(results);
        }
        else {
            setFilteredData([]);
        }
    }, [searchQuery]);
    var categories = swr_1["default"]("https://strapi-ecommerce-demo2.onrender.com/api/categories", fetcher).data;
    var toggleDrawer = function () {
        setOpenRight(!openRight);
    };
    var toggleSearch = function () {
        setSearchVisible(!searchVisible);
    };
    var toggleMenu = function () {
        setMenuOpen(!menuOpen);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("nav", { className: "flex justify-between items-center py-4 px-6 " },
            react_1["default"].createElement(ButtonIcon_1["default"], { onClick: toggleMenu, className: "lg:hidden block mr-1 text-gray-600", "aria-label": "Open menu" },
                react_1["default"].createElement(ai_1.AiOutlineMenu, { size: 24 })),
            react_1["default"].createElement(link_1["default"], { href: "/", className: "uppercase flex-1 lg:flex-none text-center text-3xl font-extrabold tracking-wider" }, "shopco."),
            react_1["default"].createElement("div", { className: "relative" },
                menuOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300", onClick: toggleMenu })),
                react_1["default"].createElement("div", { className: "fixed top-0 left-0 w-full md:w-1/2 md:rounded-e-lg h-full bg-white shadow-lg transform transition-transform duration-300 \n      " + (menuOpen ? "translate-x-0" : "-translate-x-full") + " lg:hidden z-50" },
                    react_1["default"].createElement("div", { className: "flex justify-between items-center p-4 border-b border-gray-100" },
                        react_1["default"].createElement("div", { className: "flex justify-center flex-1" },
                            react_1["default"].createElement(link_1["default"], { href: "/", className: "uppercase text-3xl font-bold justify-end tracking-wider" }, "shopco.")),
                        react_1["default"].createElement(ButtonIcon_1["default"], { onClick: toggleMenu, className: "text-gray-600 flex justify-end", "aria-label": "Close menu" },
                            react_1["default"].createElement(ai_1.AiOutlineClose, { size: 24 }))),
                    react_1["default"].createElement("ul", { className: " " },
                        !categories ? react_1["default"].createElement(loading_1["default"], null) : (categories.map(function (cat) { return (react_1["default"].createElement("li", { className: "border-b border-b-gray-100 w-full", key: cat.id },
                            react_1["default"].createElement(link_1["default"], { href: "/men", className: "text-xl tracking-widest uppercase font-bold hover:text-gray-500 py-3 px-5 hover:bg-gray-100 transition-colors duration-300 block" }, cat.title))); })),
                        react_1["default"].createElement(link_1["default"], { className: ' justify-start items-center hover:bg-gray-100 transition-colors duration-300 hover:text-gray-500   md:hidden text-xl tracking-widest uppercase font-bold flex py-3 px-5 border-b border-b-gray-100  ', href: "/myOrders" }, "My Orders"),
                        user && (((_d = (_c = user.user) === null || _c === void 0 ? void 0 : _c.primaryEmailAddress) === null || _d === void 0 ? void 0 : _d.emailAddress) === "walidemad998@gmail.com" || ((_f = (_e = user.user) === null || _e === void 0 ? void 0 : _e.primaryEmailAddress) === null || _f === void 0 ? void 0 : _f.emailAddress) === "nassergamal2222@gmail.com") && (react_1["default"].createElement(link_1["default"], { className: 'flex justify-center items-center', href: "/admin" },
                            react_1["default"].createElement(ButtonIcon_1["default"], { className: 'bg-black text-white mt-5 py-2 px-2 rounded-xl' }, "Admin")))))),
            react_1["default"].createElement("ul", { className: "lg:flex justify-start items-center space-x-4 hidden uppercase font-medium" }, !categories ? react_1["default"].createElement(loading_1["default"], null) : (categories.map(function (cat) { return (react_1["default"].createElement("li", { key: cat.id },
                react_1["default"].createElement(link_1["default"], { href: "/products/" + cat.documentId, className: "text-lg hover:text-gray-500" }, cat.title))); }))),
            react_1["default"].createElement(Searchbar_1["default"], { searchVisible: searchVisible }),
            react_1["default"].createElement("div", { className: "flex items-center gap-0.5  md:gap-1 lg:gap-2" },
                react_1["default"].createElement(link_1["default"], { className: ' justify-center items-center text-base font-medium hidden md:flex hover:text-gray-500 ', href: "/myOrders" }, "My Orders"),
                user && (((_h = (_g = user.user) === null || _g === void 0 ? void 0 : _g.primaryEmailAddress) === null || _h === void 0 ? void 0 : _h.emailAddress) === "walidemad998@gmail.com" || ((_k = (_j = user.user) === null || _j === void 0 ? void 0 : _j.primaryEmailAddress) === null || _k === void 0 ? void 0 : _k.emailAddress) === "nassergamal2222@gmail.com") && (react_1["default"].createElement(link_1["default"], { className: 'flex justify-center items-center', href: "/admin" },
                    react_1["default"].createElement(ButtonIcon_1["default"], { className: 'bg-black text-white  py-2 px-2 rounded-xl' }, "Admin"))),
                react_1["default"].createElement(ButtonIcon_1["default"], { onClick: toggleSearch, className: "lg:hidden block text-gray-600 ", "aria-label": "Search" },
                    react_1["default"].createElement(bi_1.BiSearch, { size: 24 })),
                isSignedIn ? (
                // Show UserButton when signed in
                react_1["default"].createElement(UserButton, null)) : (
                // Show SignInButton when signed out
                react_1["default"].createElement(SignInButton, null)),
                react_1["default"].createElement(ButtonIcon_1["default"], { onClick: toggleDrawer, className: "flex items-center relative " },
                    react_1["default"].createElement(io5_1.IoCartOutline, { size: 24 }),
                    react_1["default"].createElement("div", { className: "absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full -top-3 -end-2" }, cartItemsCount))),
            react_1["default"].createElement(Drawer_1["default"], { openRight: openRight, toggleDrawer: toggleDrawer })),
        react_1["default"].createElement("div", { className: "relative  lg:hidden  transition-all duration-700 " + (searchVisible ? 'translate-y-0 opacity-100 block ' : '-translate-y-1/2 opacity-0 hidden ') },
            filteredData.length > 0 && (react_1["default"].createElement("div", { className: "absolute z-[999] bg-gray-50 shadow-lg overflow-scroll top-[55px] w-full flex flex-col p-3" }, filteredData.map(function (product) {
                var _a;
                return (react_1["default"].createElement(link_1["default"], { key: product.id, href: "/product/" + (product === null || product === void 0 ? void 0 : product.documentId), className: 'cursor-pointer hover:bg-gray-100' },
                    react_1["default"].createElement("div", { className: "flex gap-3 items-center p-3 border-b" },
                        react_1["default"].createElement("div", { className: "image pr-1" },
                            react_1["default"].createElement(image_1["default"], { alt: 'Product Search', className: "w-full h-[100px] object-contain", src: (_a = product === null || product === void 0 ? void 0 : product.img1) === null || _a === void 0 ? void 0 : _a.url, quality: 85, width: 700, height: 500 })),
                        react_1["default"].createElement("div", { className: "details flex flex-col flex-1" },
                            react_1["default"].createElement("span", { className: "uppercase block text-[#565656] tracking-widest text-sm font-[400] mb-1.5" }, product.title),
                            react_1["default"].createElement("span", { className: "uppercase text-[#565656] mb-1.5 text-sm font-[400]" },
                                "price : $",
                                product.price)))));
            }))),
            react_1["default"].createElement("div", { className: "p-3" },
                react_1["default"].createElement("label", { htmlFor: "Search", className: "sr-only" }, "Search"),
                react_1["default"].createElement("input", { value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, type: "search", id: "Search", placeholder: "Search for products...", className: "w-full rounded-full bg-[#F0F0F0] border-none outline-none py-3 px-4 shadow-sm sm:text-sm" }),
                react_1["default"].createElement("span", { className: "absolute inset-y-0 end-10 grid w-10 place-content-center" },
                    react_1["default"].createElement(ButtonIcon_1["default"], { className: "text-gray-600 hover:text-gray-700", "aria-label": "Search" },
                        react_1["default"].createElement(bi_1.BiSearch, null)))))));
};
exports["default"] = Navbar;
