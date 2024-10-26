"use server";
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
exports.getSingleOrder = exports.getOrders = exports.getOrdersAdmin = exports.getColorsAdmin = exports.getFilterColors = exports.getFilterCats = exports.getSizes = exports.getSubCategories = exports.getFilterCategories = exports.getCateogries = exports.getSingleCat = exports.getSingleProduct = exports.getProductsType = exports.getProductsAdmin = exports.getProducts = void 0;
var axios_1 = require("axios");
var cache_1 = require("next/cache");
function getProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/products?populate=img1&populate=img2&populate=color&populate=sizes&populate=sub_category&populate=category")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProducts = getProducts;
function getProductsAdmin(page, pageSize) {
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 5; }
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/products?populate=*&pagination[page]=" + page + "&pagination[pageSize]=" + pageSize + "&sort=updatedAt:desc&sort=createdAt:desc")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/admin/products");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProductsAdmin = getProductsAdmin;
function getProductsType(type) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/products?populate=*&[filters][type][$eq]=" + type, {})];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProductsType = getProductsType;
function getSingleProduct(documentId) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/products/" + documentId + "?populate=*")];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data];
                case 2:
                    error_4 = _b.sent();
                    console.log(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSingleProduct = getSingleProduct;
function getSingleCat(documentId) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/categories/" + documentId + "?populate=*")];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data];
                case 2:
                    error_5 = _b.sent();
                    console.log(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSingleCat = getSingleCat;
function getCateogries() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/categories?populate=*")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_6 = _a.sent();
                    console.log(error_6);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getCateogries = getCateogries;
function getFilterCategories(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/sub-categories?[filter][categories][id][$eq]=" + id)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_7 = _a.sent();
                    console.log(error_7);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getFilterCategories = getFilterCategories;
function getSubCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/sub-categories?populate=*")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_8 = _a.sent();
                    console.log(error_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSubCategories = getSubCategories;
function getSizes() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/sizes?populate=*")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_9 = _a.sent();
                    console.log(error_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSizes = getSizes;
function getFilterCats() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/categories?populate=*")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_10 = _a.sent();
                    console.log(error_10);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getFilterCats = getFilterCats;
function getFilterColors() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var response, error_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/colors?populate=*")];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data];
                case 2:
                    error_11 = _b.sent();
                    console.log(error_11);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFilterColors = getFilterColors;
function getColorsAdmin() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/colors?populate=*")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_12 = _a.sent();
                    console.log(error_12);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/admin/colors");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getColorsAdmin = getColorsAdmin;
function getOrdersAdmin(page, pageSize) {
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 5; }
    return __awaiter(this, void 0, void 0, function () {
        var response, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/orders?populate=*&pagination[page]=" + page + "&pagination[pageSize]=" + pageSize + "&sort=updatedAt:desc&sort=createdAt:desc")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_13 = _a.sent();
                    console.log(error_13);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/admin/orders");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getOrdersAdmin = getOrdersAdmin;
function getOrders(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/orders?filters[userId][$eq]=" + id)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_14 = _a.sent();
                    console.log(error_14);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/admin/orders");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getOrders = getOrders;
function getSingleOrder(documentId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://strapi-ecommerce-demo2.onrender.com/api/orders/" + documentId + "?populate=*")];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response === null || response === void 0 ? void 0 : response.data];
                case 2:
                    error_15 = _a.sent();
                    console.log(error_15);
                    return [3 /*break*/, 3];
                case 3:
                    cache_1.revalidatePath("/admin/orders");
                    return [2 /*return*/];
            }
        });
    });
}
exports.getSingleOrder = getSingleOrder;
