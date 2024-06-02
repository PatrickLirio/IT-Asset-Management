const Connection = require('../database/Connection');

module.exports = async ( fname, lname, position, eid, department, email, password, domain) => {
    // Input validation
    if (!fname || !lname|| !position || !eid || !department || !email || !password || !domain) {
        throw new Error('First name, Last name, Position, Eid, Department, Email, Password, Domain are required');
    }

    try {
        const query = 
        `
            INSERT INTO users (fname, lname, position, eid, department, email, password, domain)
            VALUES (@fname, @lname, @position, @eid, @department, @email, @password, @domain)
        `;
        
        const params = { fname, lname, position, eid, department, email, password, domain};
        
        await Connection(query, params);
        return true;
    } catch (err) {
        console.error("Error inserting customer: ", err);
        throw err;
    }
};