/* This is the routing file of our backend, this is where we create our API enpoints */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const sql = require('mssql');

const createUserAsset = require('../Services/Create');
const createAsset = require('../Services/CreateAsset');
const createEvent = require('../Services/createEvent');

const RetrieveServices = require('../Services/Retrieve');
const RetrieveServices2 = require('../Services/Retrieve2');
const getTotalAssets  = require('../Services/RetrieveT');
const getTotalOperationalAssets = require('../Services/RetrieveA');
const retrieveEvents = require ('../Services/RetrieveEvent')

const UpdateServices = require('../Services/Update');
const UpdateUserServices = require('../Services/UpdateUserInfo');

const DeleteServices = require('../Services/Delete');
const DeleteUserServices = require('../Services/DeleteUserInfo');
const DeleteEventServices = require('../Services/DeleteEvent')
// const { executeQuery } = require('../database/Connection');


/*---------------------- Creating ---------------*/
//assets
router.post('/create/assets', async (req, res) => {
    const { 
        model, serialNo, category, make, assetNo, baselineItem, employeeNo, position, assignee, position2, location, hostname, lanMacAddress, wifiMacAddress, status, printerIpAddress 
    } = req.body;

    try {
        const success = await createAsset(model, serialNo, category, make, assetNo, baselineItem, employeeNo, position, assignee, position2, location, hostname, lanMacAddress, wifiMacAddress, status, printerIpAddress);
        if (success) {
            res.status(201).send({ message: 'Asset inserted successfully' });
        } else {
            res.status(500).send({ message: 'Failed to insert Asset' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//User
router.post('/create', async (req, res) => {
    const { fname, lname, position, eid, department, email, password, domain } = req.body;

    try {
        const success = await createUserAsset(fname, lname, position, eid, department, email, password, domain);
        if (success) {
            res.status(201).send({ message: 'User inserted successfully' });
        } else {
            res.status(500).send({ message: 'Failed to insert User' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//calendar Event
router.post('/create/event', async (req, res) => {
    const { title, date } = req.body;

    // Input validation
    if (!title || !date) {
        return res.status(400).send({ message: 'Title and date are required.' });
    }

    try {
        const success = await createEvent(title, date);
        if (success) {
            res.status(201).send({ message: 'Event inserted successfully' });
        } else {
            res.status(500).send({ message: 'Failed to insert event' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
/*-----------------------Creating ---------------*/


/*-----------------------Retrieving ---------------*/
//TO RETRIEVE THE USERS LIST
router.get (`/user`, async (req, res) => {
    const {arrfields } = req.query;


    const results = await RetrieveServices(arrfields);

    if (results) {
        res
        .status(200)
        .send(results)
    } else{
        res
        .status(500)
        .send({
            message: "Not Retrieved!"
        })
    }
});

// TO RETRIEVE THE ASSETS LIST 
router.get (`/asset`, async (req, res) => {
    const {assetfields } = req.query;


    const results = await RetrieveServices2(assetfields);

    if (results) {
        res
        .status(200)
        .send(results)
    } else{
        res
        .status(500)
        .send({
            message: "Not Retrieved!"
        })
    }
});
// TO RETRIEVE THE TOTAL ASSET ENDPOINT
router.get('/Tasset', async (req, res) => {
    try {
        const totalAssets = await getTotalAssets();
        console.log('Total Assets:', totalAssets); // Log the total assets for debugging
        res.status(200).json({ total: totalAssets });
    } catch (error) {
        console.error('Error retrieving total assets:', error);
        res.status(500).json({ message: "Not Retrieved!" });
    }
});
// TO RETRIEVE THE TOTAL AVAILABLE ASSET ( ON HAND OPERATIONAL ) ENDPOINT
router.get('/total-operational-assets', async (req, res) => {
    try {
        const totalOperationalAssets = await getTotalOperationalAssets();
        res.status(200).json({ availableAssets: totalOperationalAssets });
    } catch (error) {
        console.error('Error retrieving total operational assets:', error);
        res.status(500).json({ message: "Failed to retrieve total operational assets!" });
    }
});

//TO RETRIEVE THE EVENTS CREATED
router.get('/retrieve/events', async (req, res) => {
    try {
        const events = await retrieveEvents();
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

/*----------------------- Retrieving ---------------*/

/*----------------------- Updating ---------------*/

// assets
router.post('/update', async (req, res) => {
    try {
        // Extract new data from the request body
        const {
            NewModel,
            'New[Serial No.]': NewSerialNo,
            NewCategory,
            NewMake,
            'New[Asset No.]': NewAssetNo,
            'New[Baseline Item]': NewBaselineItem,
            'New[Employee No.]': NewEmployeeNo,
            NewPosition,
            NewAssignee,
            NewPosition2,
            NewLocation,
            NewHostname,
            'New[LAN MAC Address]': NewLANMACAddress,
            'New[WIFI MAC Address]': NewWIFIMACAddress,
            NewStatus,
            'New[Printer IP Address]': NewPrinterIPAddress
        } = req.body;

        // Fetch the existing ID from the database or any other source
        // For demonstration, let's assume it's obtained from req.body as well
        const { id } = req.body;

        // Call UpdateServices with the existing ID and new data
        const results = await UpdateServices(
            id,
            NewModel,
            NewSerialNo,
            NewCategory,
            NewMake,
            NewAssetNo,
            NewBaselineItem,
            NewEmployeeNo,
            NewPosition,
            NewAssignee,
            NewPosition2,
            NewLocation,
            NewHostname,
            NewLANMACAddress,
            NewWIFIMACAddress,
            NewStatus,
            NewPrinterIPAddress
        );

        // Send response based on results
        if (results) {
            res.status(200).send({
                status: results,
                message: "Successfully Updated!"
            });
        } else {
            res.status(500).send({
                status: results,
                message: "Not Updated!"
            });
        }
    } catch (error) {
        console.error('Error updating asset:', error);
        res.status(500).send({
            message: "An error occurred while updating the asset."
        });
    }
});

//users
router.post('/update/users', async (req, res) => {
    try {
        // Extract new data from the request body
        const {
            
            newfname,
            newlname,
            newposition,
            neweid,
            newdepartment,
            newemail,
            newpassword,
            newdomain,
        } = req.body;

        // Fetch the existing ID from the database or any other source
        // For demonstration, let's assume it's obtained from req.body as well
        const { id } = req.body;

        // Call UpdateUserServices with the existing ID and new data
        const results = await UpdateUserServices(
            id,
            newfname,
            newlname,
            newposition,
            neweid,
            newdepartment,
            newemail,
            newpassword,
            newdomain
        );

        // Send response based on results
        if (results) {
            res.status(200).send({
                status: results,
                message: "Successfully Updated!"
            });
        } else {
            res.status(500).send({
                status: results,
                message: "Not Updated!"
            });
        }
    } catch (error) {
        console.error('Error updating user info:', error);
        res.status(500).send({
            message: "An error occurred while updating the user info."
        });
    }
});

/*----------------------- Updating ---------------*/

/*----------------------- Deletion ---------------*/
//assets
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await DeleteServices(id);
        if (result) {
            res.status(200).send({ message: "Successfully Deleted!" });
        } else {
            res.status(500).send({ message: "Not Deleted!" });
        }
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).send({ message: "An error occurred while deleting the asset." });
    }
});
//users
router.delete('/delete/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await DeleteUserServices(id);
        if (result) {
            res.status(200).send({ message: "Successfully Deleted!" });
        } else {
            res.status(500).send({ message: "Not Deleted!" });
        }
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).send({ message: "An error occurred while deleting the asset." });
    }
});

//event
router.delete('/delete/event/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await DeleteEventServices(id);
        if (result) {
            res.status(200).send({ message: "Successfully Deleted!" });
        } else {
            res.status(500).send({ message: "Not Deleted!" });
        }
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send({ message: "An error occurred while deleting the event." });
    }
});

/*----------------------- Deletion ---------------*/


module.exports = router;
