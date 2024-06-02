/*retrieve info for users */

const Connection = require('../database/Connection');

module.exports = async (arrfields) => {
    try {
        const query = `SELECT ` +
                        `${arrfields} ` +    
                        `FROM ` +  
                        `dbo.users `;
        
const results = await Connection(query);

        return results;
    } catch (err) {
        return [];
    }
};




