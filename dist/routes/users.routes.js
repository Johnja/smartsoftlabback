"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var validate_fields_1 = require("../middlewares/validate-fields");
var validate_jwt_1 = require("../middlewares/validate-jwt");
var users_controller_1 = require("../controllers/users.controller");
var router = express_1.Router();
router.get('/', [
    validate_jwt_1.validateJWT
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, users_controller_1.getUsers);
router.post('/', [
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('password', 'El password es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El email es obligatorio').isEmail(),
    validate_fields_1.validateFields,
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, users_controller_1.createUser);
router.put('/:id', [
    validate_jwt_1.validateJWT,
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
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
}, users_controller_1.updateUser);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, users_controller_1.deleteUser);
router.get('/:id', [
    validate_jwt_1.validateJWT,
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    ;
    next();
}, users_controller_1.getOneUser);
exports.default = router;
