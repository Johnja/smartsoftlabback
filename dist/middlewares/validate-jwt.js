"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validateJWT = function (req, res, next) {
    //Leer el token
    var token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token'
        });
    }
    try {
        var uid = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.body = __assign(__assign({}, req.body), { "jswt": uid });
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
};
exports.validateJWT = validateJWT;
