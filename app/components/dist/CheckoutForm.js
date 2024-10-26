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
var react_stripe_js_1 = require("@stripe/react-stripe-js");
var react_1 = require("react");
var nextjs_1 = require("@clerk/nextjs");
var axios_1 = require("axios");
var CheckoutForm = function (_a) {
    var amount = _a.amount;
    var stripe = react_stripe_js_1.useStripe();
    var elements = react_stripe_js_1.useElements();
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var userId = nextjs_1.useAuth().userId;
    console.log(userId);
    var _c = react_1.useState(null), errorMessage = _c[0], setErrorMessage = _c[1];
    var _d = react_1.useState([]), cartProducts = _d[0], setCartProducts = _d[1];
    var _e = react_1.useState(null), existingCart = _e[0], setExistingCart = _e[1];
    var shippingInfo = localStorage.getItem('shippingInfo');
    var savedData = shippingInfo ? JSON.parse(shippingInfo) : null;
    // Fetch cart data in useEffect using axios
    react_1.useEffect(function () {
        var fetchCartData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, cartData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userId) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/carts?populate=cart_items&filters[userId][$eq]=" + userId)];
                    case 2:
                        response = _a.sent();
                        cartData = response.data.data[0];
                        setExistingCart(cartData);
                        setCartProducts((cartData === null || cartData === void 0 ? void 0 : cartData.cart_items) || []);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching cart:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchCartData();
    }, [userId]); // Fetch cart only when userId is available
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var handleError, submitError, res, clientSecret, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!stripe || !elements) {
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setErrorMessage(null);
                    handleError = function (error) {
                        setLoading(false);
                        setErrorMessage(error.message);
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, 9, 10]);
                    return [4 /*yield*/, createOrder()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sendEmail()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, elements.submit()];
                case 4:
                    submitError = (_a.sent()).error;
                    if (submitError) {
                        handleError(submitError);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fetch('/api/create-intent', {
                            method: 'POST',
                            body: JSON.stringify({
                                amount: amount
                            })
                        })];
                case 5:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 6:
                    clientSecret = _a.sent();
                    return [4 /*yield*/, stripe.confirmPayment({
                            clientSecret: clientSecret,
                            elements: elements,
                            confirmParams: {
                                return_url: 'http://localhost:3000/payment-confirm'
                            }
                        })];
                case 7:
                    result = _a.sent();
                    if (result.error) {
                        handleError(result.error);
                    }
                    return [3 /*break*/, 10];
                case 8:
                    error_2 = _a.sent();
                    setErrorMessage('An error occurred during the payment process.');
                    return [3 /*break*/, 10];
                case 9:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    // Create Order function
    var createOrder = function () { return __awaiter(void 0, void 0, void 0, function () {
        var formData, shippingInfo_1, savedData_1, shippingResponse, shippingId, orderData, orderResponse, cartId, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    formData = new FormData();
                    shippingInfo_1 = localStorage.getItem('shippingInfo');
                    savedData_1 = shippingInfo_1 ? JSON.parse(shippingInfo_1) : null;
                    if (savedData_1) {
                        formData.append('data[firstName]', (savedData_1 === null || savedData_1 === void 0 ? void 0 : savedData_1.firstName) || '');
                        formData.append('data[lastname]', (savedData_1 === null || savedData_1 === void 0 ? void 0 : savedData_1.lastName) || '');
                        formData.append('data[email]', (savedData_1 === null || savedData_1 === void 0 ? void 0 : savedData_1.email) || '');
                        formData.append('data[country]', (savedData_1 === null || savedData_1 === void 0 ? void 0 : savedData_1.country) || '');
                        formData.append('data[state]', (savedData_1 === null || savedData_1 === void 0 ? void 0 : savedData_1.state) || '');
                        formData.append('data[city]', (savedData_1 === null || savedData_1 === void 0 ? void 0 : savedData_1.city) || '');
                        formData.append('data[address]', (savedData_1 === null || savedData_1 === void 0 ? void 0 : savedData_1.address) || '');
                        formData.append('data[phonenumber]', (savedData_1 === null || savedData_1 === void 0 ? void 0 : savedData_1.phone) || '');
                    }
                    return [4 /*yield*/, axios_1["default"].post("https://strapi-ecommerce-demo2.onrender.com/api/shippings", formData)];
                case 1:
                    shippingResponse = _a.sent();
                    if (!(shippingResponse.status === 200 || shippingResponse.status === 201)) return [3 /*break*/, 4];
                    shippingId = shippingResponse.data.data.id;
                    localStorage.removeItem('shippingInfo');
                    orderData = {
                        amount: amount,
                        userId: userId,
                        shipping: shippingId,
                        cart_items: cartProducts.map(function (item) { return ({
                            id: item.id
                        }); })
                    };
                    return [4 /*yield*/, axios_1["default"].post("https://strapi-ecommerce-demo2.onrender.com/api/orders?populate=*", { data: orderData })];
                case 2:
                    orderResponse = _a.sent();
                    if (!(orderResponse.status === 200 || orderResponse.status === 201)) return [3 /*break*/, 4];
                    cartId = existingCart === null || existingCart === void 0 ? void 0 : existingCart.documentId;
                    return [4 /*yield*/, axios_1["default"]["delete"]("https://strapi-ecommerce-demo2.onrender.com/api/carts/" + cartId)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.error('Error creating order in Strapi:', error_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Send email
    var sendEmail = function () { return __awaiter(void 0, void 0, void 0, function () {
        var productDetails;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productDetails = cartProducts
                        .map(function (product) {
                        return "Product: " + product.name + ", Price: " + product.price + " $, Quantity: " + product.quantity;
                    })
                        .join('\n');
                    return [4 /*yield*/, fetch('/api/send-email', {
                            method: 'POST',
                            body: JSON.stringify({
                                amount: amount,
                                email: savedData === null || savedData === void 0 ? void 0 : savedData.email,
                                fullName: (savedData === null || savedData === void 0 ? void 0 : savedData.firstName) + ' ' + (savedData === null || savedData === void 0 ? void 0 : savedData.lastName),
                                productDetails: productDetails
                            })
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("form", { onSubmit: handleSubmit },
        React.createElement("div", { className: "mt-12 py-10 mb-16 p-6 mx-2 sm:mx-4 md:mx-[100px] lg:mx-[400px]" },
            React.createElement(react_stripe_js_1.PaymentElement, null),
            React.createElement("button", { disabled: loading, className: "w-full disabled:bg-slate-700 disabled:cursor-none p-3 mt-4 text-white rounded-md bg-black" }, loading ? 'Processing...' : 'Submit'),
            errorMessage && React.createElement("div", { className: "mt-4 text-red-500" }, errorMessage))));
};
exports["default"] = CheckoutForm;
