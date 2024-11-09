"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    NODE_ENV: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
    jwt_secret_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
    reset_pass_ui_link: process.env.RESET_PASSWORD_UI_LINK,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api_key: process.env.CLOUDINARY_API_KEY,
    cloud_api_secret: process.env.CLOUDINARY_API_SECRET
};
