import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path'

const envPath = path.join(process.cwd(), '.env')

dotenv.config({ path: envPath })
console.log(path.join(process.cwd(), '.env'))
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


