const dbExecute = require('../database/Connection');

module.exports = async (Model, SerialNo, Category, Make, AssetNo, BaselineItem, EmployeeNo, Position, Assignee, Position2, Location, Hostname, LANMACAddress, WIFIMACAddress, Status, PrinterIPAddress) => {
    try {
        const query = `
            UPDATE asset
            SET 
                Model = @model,
                Category = @category,
                Make = @make,
                [Asset No.] = @assetNo,
                [Baseline Item] = @baselineItem,
                [Employee No.] = @employeeNo,
                Position = @position,
                Assignee = @assignee,
                Position2 = @position2,
                Location = @location,
                Hostname = @hostname,
                [LAN MAC Address] = @lanMacAddress,
                [WIFI MAC Address] = @wifiMacAddress,
                Status = @status,
                [Printer IP Address] = @printerIpAddress
            WHERE [Serial No.] = @serialNo
        `;

        const params = {
            model: Model,
            serialNo: SerialNo,
            category: Category,
            make: Make,
            assetNo: AssetNo,
            baselineItem: BaselineItem,
            employeeNo: EmployeeNo,
            position: Position,
            assignee: Assignee,
            position2: Position2,
            location: Location,
            hostname: Hostname,
            lanMacAddress: LANMACAddress,
            wifiMacAddress: WIFIMACAddress,
            status: Status,
            printerIpAddress: PrinterIPAddress
        };

        await dbExecute(query, params);

        return true;
    } catch (err) {
        console.error("Error updating asset:", err);
        return false;
    }
};
