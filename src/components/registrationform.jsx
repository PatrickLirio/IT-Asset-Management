import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";

const Form = () => {
    const [employeeInfo, setEmployeeInfo] = useState({
        fname: "",
        lname: "",
        position: "",
        eid: "",
        department: "",
        email: "",
        password: "",
        domain: "",
        cpassword: ""
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, lname, position, eid, department, email, domain, password, cpassword } = employeeInfo;

        if (!fname || !lname || !position || !eid || !department || !email || !domain || !password) {
            setSnackbar({ open: true, message: "All fields are required", severity: "error" });
            return;
        }

        if (password !== cpassword) {
            setSnackbar({ open: true, message: "Passwords do not match", severity: "error" });
            return;
        }

        try {
            await axios.post(`http://localhost:8000/accounts/create`, {
                fname, lname, position, eid, department, email, password, domain
            });
            setSnackbar({ open: true, message: "Employee data uploaded successfully", severity: "success" });
            // Clear the form after successful submission
            setEmployeeInfo({
                fname: "",
                lname: "",
                position: "",
                eid: "",
                department: "",
                email: "",
                password: "",
                domain: "",
                cpassword: ""
            });
        } catch (error) {
            console.error('Error uploading employee data:', error);
            const errorMessage = error.response ? error.response.data.message : error.message || 'An error occurred.';
            setSnackbar({ open: true, message: `Error uploading employee data: ${errorMessage}`, severity: "error" });
        }
        
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box maxWidth={1100} mx="auto" p={3} border="1px solid #ccc" borderRadius={8} mt={5}>
            <Typography variant="h3" mb={3} textAlign="center">
                Register 
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* First row */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        name="fname"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={employeeInfo.fname}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="lname"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={employeeInfo.lname}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="position"
                        label="Position"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={employeeInfo.position}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                </Box>
                {/* Second row */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        name="eid"
                        label="EID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={employeeInfo.eid}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="department"
                        label="Department"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={employeeInfo.department}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={employeeInfo.email}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                </Box>
                {/* Third row */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <TextField
                        name="domain"
                        label="Domain"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={employeeInfo.domain}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={employeeInfo.password}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                    <TextField
                        name="cpassword"
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={employeeInfo.cpassword}
                        onChange={handleChange}
                        sx={{ width: '300px' }}
                    />
                </Box>
                <Box textAlign="center" mt={2}>
                    <Button type="submit" variant="contained" color="error" size="medium">
                        Submit
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

export default Form;
