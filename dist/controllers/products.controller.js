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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProduct = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProducts = void 0;
var Product_entity_1 = require("../entity/Product.entity");
var uuid_1 = require("uuid");
var typeorm_1 = require("typeorm");
var getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getRepository(Product_entity_1.Product).find()];
            case 1:
                products = _a.sent();
                res.json({
                    ok: true,
                    products: products,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1),
                    res.status(500).json({
                        ok: false,
                        msg: 'Error Inesperado'
                    });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProducts = getProducts;
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, category, priece, stock, id, product, newProduct, results, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, category = _a.category, priece = _a.priece, stock = _a.stock;
                id = uuid_1.v4();
                product = {
                    id: id,
                    name: name,
                    category: category,
                    priece: priece,
                    stock: stock
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newProduct = typeorm_1.getRepository(Product_entity_1.Product).create(product);
                return [4 /*yield*/, typeorm_1.getRepository(Product_entity_1.Product).save(newProduct)];
            case 2:
                results = _b.sent();
                res.json({
                    ok: true,
                    msg: 'Producto creado',
                    data: results
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({
                    ok: false,
                    msg: 'Error Inesperado revisar logs',
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var updateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, category, priece, stock, productDB, product, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("llega aca");
                id = req.params.id;
                _a = req.body, name = _a.name, category = _a.category, priece = _a.priece, stock = _a.stock;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, typeorm_1.getRepository(Product_entity_1.Product).findOne(id)];
            case 2:
                productDB = _b.sent();
                //Verificar que exista
                if (!productDB) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'No existe un producto con ese id'
                        })];
                }
                ;
                //Actualizar producto
                return [4 /*yield*/, typeorm_1.getRepository(Product_entity_1.Product).merge(productDB, req.body)];
            case 3:
                //Actualizar producto
                _b.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Product_entity_1.Product).save(productDB)];
            case 4:
                product = _b.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        message: 'Producto actualizado',
                        product: product
                    })];
            case 5:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({
                    ok: false,
                    msg: 'Error inesperado'
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateProduct = updateProduct;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, productDB, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, typeorm_1.getRepository(Product_entity_1.Product).findOne(id)];
            case 2:
                productDB = _a.sent();
                if (!productDB) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'No existe un producto con ese id'
                        })];
                }
                result = typeorm_1.getRepository(Product_entity_1.Product).delete(id);
                res.json({
                    ok: true,
                    msg: 'Producto Borrado'
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                res.status(500).json({
                    ok: false,
                    msg: 'Error inesperado'
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
var getOneProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, productDB, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, typeorm_1.getRepository(Product_entity_1.Product).findOne(id)];
            case 2:
                productDB = _a.sent();
                if (!productDB) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'No existe un producto con ese id'
                        })];
                }
                res.json({
                    ok: true,
                    product: productDB
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(500).json({
                    ok: false,
                    msg: 'Error inesperado'
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getOneProduct = getOneProduct;
