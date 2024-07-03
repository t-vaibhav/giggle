import "@/db/envConfig";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema/*",
    dialect: "postgresql",
    dbCredentials: {
        password: process.env.POSTGRES_PASSWORD!,
        host: process.env.POSTGRES_HOST!,
        database: process.env.POSTGRES_DATABASE!,
        user: process.env.POSTGRES_USER!,
        ssl: true,
    },
});
