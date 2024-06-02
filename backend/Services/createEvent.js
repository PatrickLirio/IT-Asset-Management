const Connection = require('../database/Connection');

module.exports = async (title, date) => {
    // Input validation
    if (!title) {
        throw new Error('What is the event all about?');
    }

    if (!date) {
        throw new Error('Date is required.');
    }

    // Ensure the date is in the correct format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        throw new Error('Invalid date format. Use YYYY-MM-DD.');
    }

    try {
        const query = `
            INSERT INTO calendar (title, date)
            VALUES (@title, @date)
        `;
        
        const params = {
            title: { type: 'NVarChar', value: title },
            date: { type: 'Date', value: date } // Use the date directly in YYYY-MM-DD format
        };
        
        await Connection(query, params);
        return true;
    } catch (err) {
        console.error("Error inserting event: ", err);
        throw err;
    }
};
