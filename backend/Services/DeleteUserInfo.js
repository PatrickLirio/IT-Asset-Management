const Connection = require('../database/Connection');

module.exports = async (id) => {
    try {
        const query = `DELETE FROM users WHERE id = @id`;
        
        await Connection(query, { id });

        return true;
    } catch (err) {
        console.error("Error deleting user:", err);
        return false;
    }
};