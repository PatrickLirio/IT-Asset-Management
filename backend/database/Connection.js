const mssql = require('mssql');

const dbConfig = {
    user: 'sa',
    password: '152808',
    server: 'LAPTOP-16HKLAVD',
    database: 'INFRA_ITAMS',
    options: {
        encrypt: false
    }
};

const pool = new mssql.ConnectionPool(dbConfig);

const connect = async () => {
    try {
        await pool.connect();
    } catch (connectionErr) {
        console.error("Database connection error: ", connectionErr);
        throw connectionErr;
    }
};

const executeQuery = async (query, params = {}) => {
    try {
        const request = pool.request();
        for (const key in params) {
            // Determine the parameter type dynamically or set it explicitly
            if (typeof params[key] === 'object' && params[key].type && params[key].value !== undefined) {
                request.input(key, mssql[params[key].type], params[key].value);
            } else {
                request.input(key, params[key]);
            }
        }
        const result = await request.query(query);
        return result.recordset;
    } catch (queryErr) {
        console.error("Query execution error: ", queryErr);
        throw queryErr;
    }
};

const dbExecute = async (query, params) => {
    await connect();
    return executeQuery(query, params);
};

module.exports = dbExecute;
