"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createJWT = function (uid) {
    return new Promise(function (resolve, reject) {
        var payload = {
            uid: uid
        };
        jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || '', {
            expiresIn: '12h'
        }, function (error, token) {
            if (error) {
                console.log(error);
                reject('No se pudo generar el JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.createJWT = createJWT;
