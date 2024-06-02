const Connection = require('../database/Connection');
 
module.exports = async (id,fname,lname,position,eid,department,email,password,domain) => {
    try {
        const query = `UPDATE users
               SET fname = '${fname}',
               lname = '${lname}',
               position = '${position}',
               eid = '${eid}',
               department = '${department}',
               email = '${email}',
               password = '${password}',
               domain = '${domain}'
               WHERE id = ${id}`;
 
        await Connection(query);
 
        return true;
    } catch (err) {
        console.error("Error updating user:", err);
        return false;
    }
};
 