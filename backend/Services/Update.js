const Connection = require('../database/Connection');
 
module.exports = async (id, Model, SerialNo, Category, Make, AssetNo, BaselineItem, EmployeeNo, Position, Assignee, Position2, Location, Hostname, LANMACAddress, WIFIMACAddress, Status, PrinterIPAddress) => {
    try {
        const query = `UPDATE assets
               SET Model = '${Model}',
               [Serial No.] = '${SerialNo}',
               Category = '${Category}',
               Make = '${Make}',
               [Asset No.] = '${AssetNo}',
               [Baseline Item] = '${BaselineItem}',
               [Employee No.] = '${EmployeeNo}',
               Position = '${Position}',
               Assignee = '${Assignee}',
               Position2 = '${Position2}',
               Location = '${Location}',
               Hostname = '${Hostname}',
               [LAN MAC Address] = '${LANMACAddress}',
               [WIFI MAC Address] = '${WIFIMACAddress}',
               Status = '${Status}',
               [Printer IP Address] = '${PrinterIPAddress}'
               WHERE id = ${id}`;
 
        await Connection(query);
 
        return true;
    } catch (err) {
        console.error("Error updating asset:", err);
        return false;
    }
};
 