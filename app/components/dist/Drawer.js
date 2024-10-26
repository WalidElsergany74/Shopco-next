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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var ButtonIcon_1 = require("./ui/ButtonIcon");
var ai_1 = require("react-icons/ai");
var image_1 = require("next/image");
var axios_1 = require("axios");
var nextjs_1 = require("@clerk/nextjs");
var swr_1 = require("swr");
var SkeletonLoader_1 = require("./ui/SkeletonLoader");
var react_hot_toast_1 = require("react-hot-toast");
var navigation_1 = require("next/navigation");
var Drawer = (function (_a) {
    var openRight = _a.openRight, toggleDrawer = _a.toggleDrawer;
    var userId = nextjs_1.useAuth().userId;
    var _b = react_1.useState([]), items = _b[0], setItems = _b[1];
    var router = navigation_1.useRouter();
    var fetcher = function (url) { return axios_1["default"].get(url).then(function (res) { return res.data.data; }); };
    var _c = swr_1["default"](userId ? "https://strapi-ecommerce-demo2.onrender.com/api/carts?populate=cart_items&filters[userId][$eq]=" + userId : null, fetcher), cartData = _c.data, mutate = _c.mutate, isLoading = _c.isLoading;
    // Sort cart items by creation date
    react_1.useEffect(function () {
        var _a;
        if (cartData && cartData.length > 0) {
            var cartItems = ((_a = cartData[0]) === null || _a === void 0 ? void 0 : _a.cart_items) || [];
            var sortedItems = __spreadArrays(cartItems).sort(function (a, b) { return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); });
            setItems(sortedItems);
        }
    }, [cartData]);
    var subtotal = react_1.useMemo(function () { return items.reduce(function (acc, item) { return acc + item.totalItem; }, 0); }, [items]);
    var handleClearCart = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var cartId, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    cartId = (_a = cartData === null || cartData === void 0 ? void 0 : cartData[0]) === null || _a === void 0 ? void 0 : _a.documentId;
                    if (!cartId)
                        return [2 /*return*/];
                    return [4 /*yield*/, axios_1["default"]["delete"]("https://strapi-ecommerce-demo2.onrender.com/api/carts/" + cartId)];
                case 1:
                    _b.sent();
                    mutate();
                    setItems([]);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error("Error clearing cart", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [cartData, mutate]);
    var handleUpdateQuantity = react_1.useCallback(function (itemId, change) { return __awaiter(void 0, void 0, void 0, function () {
        var existsItem, updatedQuantity, productRes, availableStock, updatedPrice, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    existsItem = items.find(function (item) { return item.documentId === itemId; });
                    if (!existsItem)
                        return [2 /*return*/];
                    updatedQuantity = existsItem.quantity + change;
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/products/" + existsItem.productId)];
                case 1:
                    productRes = _a.sent();
                    availableStock = productRes.data.data.stock;
                    if (updatedQuantity > availableStock || updatedQuantity < 1) {
                        react_hot_toast_1["default"].error(updatedQuantity > availableStock ? "Stock is less than quantity" : "Invalid quantity", { duration: 4000, position: "top-center" });
                        return [2 /*return*/];
                    }
                    updatedPrice = updatedQuantity * existsItem.price;
                    return [4 /*yield*/, axios_1["default"].put("https://strapi-ecommerce-demo2.onrender.com/api/cart-items/" + existsItem.documentId, {
                            data: { quantity: updatedQuantity, totalItem: updatedPrice }
                        })];
                case 2:
                    _a.sent();
                    mutate();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log("Error updating quantity", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [items, mutate]);
    var handleRemoveItem = react_1.useCallback(function (itemId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!(items.length === 1)) return [3 /*break*/, 2];
                    return [4 /*yield*/, handleClearCart()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, axios_1["default"]["delete"]("https://strapi-ecommerce-demo2.onrender.com/api/cart-items/" + itemId)];
                case 3:
                    _a.sent();
                    mutate();
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.log("Error removing item", error_3);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [items, mutate, handleClearCart]);
    return (react_1["default"].createElement("div", { className: "relative" },
        openRight && (react_1["default"].createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-500", onClick: toggleDrawer })),
        react_1["default"].createElement("div", { className: "fixed overflow-scroll top-0 right-0 w-3/4 md:w-1/2 lg:w-1/3 p-1 h-full bg-white transform transition-transform duration-500 \n          " + (openRight ? "translate-x-0" : "translate-x-full") + " z-50" },
            react_1["default"].createElement("div", { className: "flex justify-between items-start p-4 border-t border-b border-gray-100" },
                react_1["default"].createElement("span", { className: "uppercase text-gray-500" }, "Items in your bag"),
                react_1["default"].createElement(ButtonIcon_1["default"], { onClick: toggleDrawer, className: "text-gray-600 flex justify-end", "aria-label": "Close menu" },
                    react_1["default"].createElement(ai_1.AiOutlineClose, { size: 24 }))),
            isLoading ? (react_1["default"].createElement(SkeletonLoader_1["default"], null)) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: "py-3" }, items.length === 0 ? (react_1["default"].createElement("p", { className: "text-base font-semibold flex justify-center items-center" }, "No Products Added to cart yet..")) : (items.map(function (item, index) { return (react_1["default"].createElement("div", { key: index, className: "flex gap-3 items-center p-3" },
                    react_1["default"].createElement("div", { className: "image pr-1" },
                        react_1["default"].createElement(image_1["default"], { width: 500, height: 400, quality: 85, className: "w-full h-[150px] object-contain", alt: item.name, src: item === null || item === void 0 ? void 0 : item.image })),
                    react_1["default"].createElement("div", { className: "details flex flex-col flex-1" },
                        react_1["default"].createElement("span", { className: "uppercase block text-[#565656] tracking-widest text-sm font-[400] mb-1.5" }, item.name),
                        react_1["default"].createElement("span", { className: "uppercase text-[#565656] mb-1.5 text-sm font-[400] " },
                            "size : ",
                            item.size),
                        react_1["default"].createElement("span", { className: "uppercase mb-2.5 text-sm font-[400] " },
                            "price : $",
                            item.totalItem),
                        react_1["default"].createElement("div", { className: "flex items-center gap-2 mb-1" },
                            react_1["default"].createElement(ButtonIcon_1["default"], { onClick: function () { return handleUpdateQuantity(item.documentId, -1); }, className: "py-0.5 px-2 bg-gray-200 rounded-md space-x-3" }, "-"),
                            item.quantity,
                            react_1["default"].createElement(ButtonIcon_1["default"], { onClick: function () { return handleUpdateQuantity(item.documentId, 1); }, className: "py-0.5 px-2 bg-gray-200 rounded-md space-x-3" }, "+")),
                        react_1["default"].createElement(ButtonIcon_1["default"], { onClick: function () { return handleRemoveItem(item.documentId); }, className: "text-gray-500 underline text-left flex justify-start" }, "REMOVE")))); }))),
                react_1["default"].createElement("div", { className: "flex justify-between items-center p-3 border-t border-t-[#ccc]" },
                    react_1["default"].createElement("span", { className: "uppercase text-[#565656] text-sm pl-1" }, "Subtotal"),
                    react_1["default"].createElement("span", { className: "uppercase text-[#565656] text-sm pr-1" },
                        "$",
                        subtotal)),
                react_1["default"].createElement("div", { className: "p-3 flex justify-between items-center" },
                    react_1["default"].createElement(ButtonIcon_1["default"], { onClick: handleClearCart, className: "uppercase border px-5 py-2 tracking-wider text-sm font-semibold text-gray-600" }, "Clear Cart"),
                    react_1["default"].createElement(ButtonIcon_1["default"], { onClick: function () { return router.push("/shipping"); }, className: "uppercase bg-black text-white px-5 py-2 tracking-wider text-sm font-semibold" }, "Checkout")))))));
});
exports["default"] = react_1.memo(Drawer);
