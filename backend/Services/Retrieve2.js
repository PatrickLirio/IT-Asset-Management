/*retrieve info for assets */

const Connection = require('../database/Connection');

module.exports = async (assetfields) => {
    try {
        const query = `SELECT ` +
                        `${assetfields} ` +    
                        `FROM ` +  
                        `dbo.assets`;
        
const results = await Connection(query);

        return results;
    } catch (err) {
        return [];
    }
};
