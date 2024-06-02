const Connection = require('../database/Connection');

module.exports = async () => {
    try {
        const query = `SELECT COUNT(*) AS totalAssets FROM dbo.assets`;

        const results = await Connection(query);

        return results[0].totalAssets;
    } catch (err) {
        return 0;
    }
};