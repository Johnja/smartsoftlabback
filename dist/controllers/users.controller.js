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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
var User_entity_1 = require("../entity/User.entity");
var typeorm_1 = require("typeorm");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jwt_1 = require("../helpers/jwt");
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getRepository(User_entity_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        users: users,
                    })];
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
exports.getUsers = getUsers;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, name, email, password, user, isEmail, salt, passwordHash, newUser, results, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, name = _a.name, email = _a.email, password = _a.password;
                user = {
                    name: name,
                    email: email,
                    password: password,
                    id: id
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, typeorm_1.getRepository(User_entity_1.User).findOne({ email: email })];
            case 2:
                isEmail = _b.sent();
                //Si existe no lo crea nuevamente
                if (isEmail) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'El correo ya esta registrado'
                        })];
                }
                ;
                salt = bcryptjs_1.default.genSaltSync();
                passwordHash = bcryptjs_1.default.hashSync(password, salt);
                user.password = passwordHash;
                newUser = typeorm_1.getRepository(User_entity_1.User).create(user);
                return [4 /*yield*/, typeorm_1.getRepository(User_entity_1.User).save(newUser)];
            case 3:
                results = _b.sent();
                return [4 /*yield*/, jwt_1.createJWT(newUser.id)];
            case 4:
                token = _b.sent();
                res.json({
                    ok: true,
                    name: name,
                    email: email,
                    token: token
                });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(500).json({
                    ok: false,
                    msg: 'Error Inesperado revisar logs',
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, email, password, user, userDB, isEmail, salt, passwordHash, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                user = {
                    id: id,
                    name: name,
                    email: email,
                    password: password,
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, typeorm_1.getRepository(User_entity_1.User).findOne(id)];
            case 2:
                userDB = _b.sent();
                //Verificar que exista
                if (!userDB) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'No existe un usuario con ese id'
                        })];
                }
                if (!(userDB.email !== email)) return [3 /*break*/, 4];
                return [4 /*yield*/, typeorm_1.getRepository(User_entity_1.User).findOne({ email: email })];
            case 3:
                isEmail = _b.sent();
                if (isEmail) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'Ya existe un usuario con este email'
                        })];
                }
                _b.label = 4;
            case 4:
                salt = bcryptjs_1.default.genSaltSync();
                passwordHash = bcryptjs_1.default.hashSync(password, salt);
                user.password = passwordHash;
                //Actualizar usuario
                return [4 /*yield*/, typeorm_1.getRepository(User_entity_1.User).merge(userDB, user)];
            case 5:
                //Actualizar usuario
                _b.sent();
                return [4 /*yield*/, typeorm_1.getRepository(User_entity_1.User).save(userDB)];
            case 6:
                result = _b.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        msg: 'Usuario Actualizado',
                        name: userDB.name,
                        email: userDB.email,
                    })];
            case 7:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(500).json({
                    ok: false,
                    msg: 'Error inesperado'
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userDB, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, typeorm_1.getRepository(User_entity_1.User).findOne(id)];
            case 2:
                userDB = _a.sent();
                if (!userDB) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'No existe un usuario con ese id'
                        })];
                }
                result = typeorm_1.getRepository(User_entity_1.User).delete(id);
                res.json({
                    ok: true,
                    msg: 'Usuario Borrado'
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
exports.deleteUser = deleteUser;
var getOneUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userDB, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, typeorm_1.getRepository(User_entity_1.User).findOne(id)];
            case 2:
                userDB = _a.sent();
                if (!userDB) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: 'No existe un usuario con ese id'
                        })];
                }
                res.json({
                    ok: true,
                    user: userDB
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
exports.getOneUser = getOneUser;
