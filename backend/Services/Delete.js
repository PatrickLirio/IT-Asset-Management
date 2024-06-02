const Connection = require('../database/Connection');

module.exports = async (id) => {
    try {
        const query = `DELETE FROM assets WHERE id = @id`;
        
        await Connection(query, { id });

        return true;
    } catch (err) {
        console.error("Error deleting asset:", err);
        return false;
    }
};
