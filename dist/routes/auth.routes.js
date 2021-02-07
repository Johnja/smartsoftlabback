"use strict";
/*

Path: '/api/login'

*/
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var express_validator_1 = require("express-validator");
var validate_fields_1 = require("../middlewares/validate-fields");
var validate_jwt_1 = require("../middlewares/validate-jwt");
var router = express_1.Router();
router.post('/', [
    express_validator_1.check('email', 'El email es obligatorio').isEmail(),
    express_validator_1.check('password', 'El password es obligatorio').not().isEmpty(),
    validate_fields_1.validateFields,
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, auth_controller_1.login);
router.get('/renew', [
    validate_jwt_1.validateJWT,
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, auth_controller_1.renewToken);
exports.default = router;
