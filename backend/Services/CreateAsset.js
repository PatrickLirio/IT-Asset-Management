const Connection = require('../database/Connection');

const createAsset = async (model, serialNo, category, make, assetNo, baselineItem, employeeNo, position, assignee, position2, location, hostname, lanMacAddress, wifiMacAddress, status, printerIpAddress) => {
    // Input validation (optional, but recommended)
    if (!model || !serialNo || !category || !make || !assetNo || !baselineItem || !employeeNo || !position || !assignee || !position2 || !location || !hostname || !lanMacAddress || !wifiMacAddress || !status || !printerIpAddress) {
        throw new Error('All fields are required.');
    }

    try {
        const query = `
            INSERT INTO assets (
                model, [Serial No.], category, make, [Asset No.], [Baseline Item], [Employee No.], position, assignee, position2, location, hostname, [LAN MAC Address], [WIFI MAC Address], status, [Printer IP Address]
            ) VALUES (
                @model, @serialNo, @category, @make, @assetNo, @baselineItem, @employeeNo, @position, @assignee, @position2, @location, @hostname, @lanMacAddress, @wifiMacAddress, @status, @printerIpAddress
            )
        `;

        const params = { 
            model, 
            serialNo, 
            category, 
            make, 
            assetNo, 
            baselineItem, 
            employeeNo, 
            position, 
            assignee, 
            position2, 
            location, 
            hostname, 
            lanMacAddress, 
            wifiMacAddress, 
            status, 
            printerIpAddress
        };

        await Connection(query, params);
        return true;
    } catch (err) {
        console.error("Error inserting asset: ", err);
        throw err;
    }
};

module.exports = createAsset;
