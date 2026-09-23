import dotenv from "dotenv";

dotenv.config();

export const DATABASE_NAME = process.env.DATABASE_NAME ?? "smiluster";
export const DATABASE_HOST = process.env.DATABASE_HOST ?? "localhost";
export const DATABASE_PORT = Number(process.env.DATABASE_PORT ?? 3306);
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME ?? "smiluster_user";
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? "smiluster_pass";
export const DATABASE_DIALECT = (process.env.DATABASE_DIALECT ?? "mariadb") as
    | "mariadb"
    | "mysql"
    | "postgres"
    | "sqlite";
export const SERVER_PORT = Number(process.env.SERVER_PORT ?? process.env.API_PORT ?? 3000);
export const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY ?? "development-secret-key";
export const SMILUSRER_EMAIL = process.env.SMILUSRER_EMAIL ?? "";
export const SMILUSRER_EMAIL_PASS = process.env.SMILUSRER_EMAIL_PASS ?? "";
