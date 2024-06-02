import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Snackbar, Alert } from "@mui/material";

const ManualUpload = () => {
    const [assetInfo, setAssetInfo] = useState({
        model: "",
        serialNo: "",
        category: "",
        make: "",
        assetNo: "",
        baselineItem: "",
        employeeNo: "",
        position: "",
        assignee: "",
        position2: "",
        location: "",
        hostname: "",
        lanMacAddress: "",
        wifiMacAddress: "",
        status: "",
        printerIpAddress: ""
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssetInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { model, serialNo, category, make, assetNo, baselineItem, employeeNo, position, assignee, position2, location, hostname, lanMacAddress, wifiMacAddress, status, printerIpAddress } = assetInfo;

        if (!model || !serialNo || !category || !make || !assetNo || !baselineItem || !employeeNo || !position || !assignee || !position2 || !location || !hostname || !lanMacAddress || !wifiMacAddress || !status || !printerIpAddress) {
            setSnackbar({ open: true, message: "All fields are required", severity: "error" });
            return;
        }

        try {
            await axios.post("http://localhost:8000/accounts/create/assets", {
                model, serialNo, category, make, assetNo, baselineItem, employeeNo, position, assignee, position2, location, hostname, lanMacAddress, wifiMacAddress, status, printerIpAddress
            });
            setSnackbar({ open: true, message: "Asset data uploaded successfully", severity: "success" });
            // Clear the form after successful submission
            setAssetInfo({
                model: "",
                serialNo: "",
                category: "",
                make: "",
                assetNo: "",
                baselineItem: "",
                employeeNo: "",
                position: "",
                assignee: "",
                position2: "",
                location: "",
                hostname: "",
                lanMacAddress: "",
                wifiMacAddress: "",
                status: "",
                printerIpAddress: ""
            });
        } catch (error) {
            console.error('Error uploading asset data:', error);
            const errorMessage = error.response ? error.response.data.message : error.message || 'An error occurred.';
            setSnackbar({ open: true, message: `Error uploading asset data: ${errorMessage}`, severity: "error" });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box maxWidth={1100} mx="auto" p={3} border="1px solid #ccc" borderRadius={8}>
            <form onSubmit={handleSubmit}>
                {/* First row */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        name="model"
                        label="Model"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.model}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="serialNo"
                        label="Serial No."
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.serialNo}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="category"
                        label="Category"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.category}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                </Box>
                {/* Second row */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        name="make"
                        label="Make"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.make}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="assetNo"
                        label="Asset No."
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.assetNo}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="baselineItem"
                        label="Baseline Item"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.baselineItem}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                </Box>
                {/* Third row */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        name="employeeNo"
                        label="Employee No."
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.employeeNo}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="position"
                        label="Position"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.position}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="assignee"
                        label="Assignee"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.assignee}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                </Box>
                {/* Fourth row */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        name="position2"
                        label="Assignee Position"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.position2}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="location"
                        label="Location"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.location}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="hostname"
                        label="Hostname"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.hostname}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                </Box>
                {/* Fifth row */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        name="lanMacAddress"
                        label="LAN MAC Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.lanMacAddress}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="wifiMacAddress"
                        label="WiFi MAC Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.wifiMacAddress}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="status"
                        label="Status"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.status}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                </Box>
                {/* Sixth row */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        name="printerIpAddress"
                        label="Printer IP Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={assetInfo.printerIpAddress}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                </Box>
                <Box textAlign="center" mt={2}>
                    <Button type="submit" variant="contained" color="error" size="medium">
                        Upload
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ManualUpload;
