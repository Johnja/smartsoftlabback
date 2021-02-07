"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importStar(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var typeorm_1 = require("typeorm");
// importing routes
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var users_routes_1 = __importDefault(require("./routes/users.routes"));
var products_routes_1 = __importDefault(require("./routes/products.routes"));
// initialization
var app = express_1.default();
typeorm_1.createConnection();
// middlewares
app.use(morgan_1.default('dev'));
app.use(express_1.json());
app.use(cors_1.default());
dotenv_1.default.config();
//Public directory 
app.use(express_1.default.static('public'));
// routes
app.use('/api/products', products_routes_1.default);
app.use('/api/users', users_routes_1.default);
app.use('/api/login', auth_routes_1.default);
exports.default = app;
