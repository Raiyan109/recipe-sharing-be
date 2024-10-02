import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    NODE_ENV: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
    jwt_secret_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
    reset_pass_ui_link: process.env.RESET_PASSWORD_UI_LINK,
};