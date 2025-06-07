import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname,'..','..', '.env')

dotenv.config({ path: envPath })

let POOL = null;

export const getConnection = () => {
    if (POOL === null) {
       POOL = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOSTNAME,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT,
        });
    }
    return POOL
}


