const Connection = require('../database/Connection');

module.exports = async () => {
    try {
        const query = `
            SELECT id, title, date
            FROM calendar
        `;

        const events = await Connection(query);
        return events;
    } catch (err) {
        console.error("Error retrieving events: ", err);
        throw err;
    }
};
