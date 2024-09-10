import pg from 'pg';

const pool = new pg.Pool({
    host: "192.168.2.41",
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

export default pool;