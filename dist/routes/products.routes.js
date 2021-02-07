"use strict";
/*

PATH: /api/products

*/
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var validate_fields_1 = require("../middlewares/validate-fields");
var products_controller_1 = require("../controllers/products.controller");
var validate_jwt_1 = require("../middlewares/validate-jwt");
var router = express_1.Router();
router.get('/', [
    validate_jwt_1.validateJWT,
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, products_controller_1.getProducts);
router.post('/', [
    validate_jwt_1.validateJWT,
    express_validator_1.check('name', 'El nombre del producto es necesario').not().isEmpty(),
    express_validator_1.check('category', 'Una categoria es necesaria').not().isEmpty(),
    validate_fields_1.validateFields,
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, products_controller_1.createProduct);
router.put('/:id', [
    validate_jwt_1.validateJWT,
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('category', 'La categoria es obligatoria').not().isEmpty(),
    validate_fields_1.validateFields
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, products_controller_1.updateProduct);
router.delete('/:id', [
    validate_jwt_1.validateJWT,
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, products_controller_1.deleteProduct);
router.get('/:id', [
    validate_jwt_1.validateJWT,
], function (req, res, next) {
    //Verifica los errores
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}, products_controller_1.getOneProduct);
exports.default = router;
