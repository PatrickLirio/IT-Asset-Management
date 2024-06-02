const Connection = require('../database/Connection');

module.exports = async (title, date) => {
    // Input validation
    if (!title) {
        throw new Error('What is the event all about?');
    }

    if (!date) {
        throw new Error('Date is required.');
    }

    // Convert the date to a numerical format (e.g., Unix timestamp)
    const numericDate = new Date(date).getTime(); // Unix timestamp in milliseconds

    if (isNaN(numericDate)) {
        throw new Error('Invalid date format.');
    }

    try {
        const query = `
            INSERT INTO calendar (title, date)
            VALUES (@title, @date)
        `;
        
        const params = {
            title,
            date: numericDate // Use the converted numerical date
        };
        
        await Connection(query, params);
        return true;
    } catch (err) {
        console.error("Error inserting event: ", err);
        throw err;
    }
};
