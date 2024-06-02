import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUploadOutlined';

const BulkUpload = () => {
    const [file, setFile] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleConvert = () => {
        if (file) {
            const fileType = file.name.split('.').pop();
            if (['xls', 'xlsx', 'csv'].includes(fileType)) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const data = e.target.result;
                        const workbook = XLSX.read(data, { type: "array" });
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];
                        const json = XLSX.utils.sheet_to_json(worksheet);

                        const formattedData = json.map(item => ({
                            model: item.model || "",
                            serialNo: item.serialNo || "",
                            category: item.category || "",
                            make: item.make || "",
                            assetNo: item.assetNo || "",
                            baselineItem: item.baselineItem || "",
                            employeeNo: item.employeeNo || "",
                            position: item.position || "",
                            assignee: item.assignee || "",
                            position2: item.position2 || "",
                            location: item.location || "",
                            hostname: item.hostname || "",
                            lanMacAddress: item.lanMacAddress || "",
                            wifiMacAddress: item.wifiMacAddress || "",
                            status: item.status || "",
                            printerIpAddress: item.printerIpAddress || ""
                        }));

                        const txtContent = formattedData.map(item => JSON.stringify(item, null, 2)).join('\n');
                        const blob = new Blob([txtContent], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'output.txt';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        setSnackbar({ open: true, message: 'File uploaded and processed successfully!', severity: 'success' });
                    } catch (error) {
                        setSnackbar({ open: true, message: 'Error processing file. Please try again.', severity: 'error' });
                    }
                };
                reader.readAsArrayBuffer(file);
            } else {
                setSnackbar({ open: true, message: 'Invalid file type. Please upload an xls, xlsx, or csv file.', severity: 'error' });
            }
        } else {
            setSnackbar({ open: true, message: 'Please select a file.', severity: 'warning' });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box className="card" padding="5px" borderRadius="5px" overflow="hidden">
            <Box className="top" textAlign="center">
                {/* Content at the top (if any) */}
            </Box>
            <Box
                className="drag-area"
                width="700px"
                height="350px"
                borderRadius="5px"
                border="2px dashed #0086fe"
                color="#0086fe"
                background="#f4f3f9"
                display="flex"
                justifyContent="center"
                alignItems="center"
                userSelect="none"
                WebkitUserSelect="none"
                marginTop="10px"
                marginLeft="auto"
                marginRight="auto"
            >
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <CloudUpload style={{ fontSize: '150px', marginBottom: '5px' }} />
                        <span className="visible" style={{ textAlign: 'center', paddingTop: '10px' }}>
                            <h2>Drag & Drop Excel or CSV Files Here</h2>
                            <span>or</span>
                        </span>
                        <span
                            className="select"
                            role="button"
                            onClick={() => document.getElementById('fileInput').click()}
                            style={{ border: '1px solid #0086fe', padding: '5px', marginTop: '10px', cursor: 'pointer' }}
                        >
                            Browse
                        </span>
                    </div>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".xls,.xlsx,.csv"
                        style={{ display: 'none' }}
                        onChange={e => setFile(e.target.files[0])}
                    />
                </div>
            </Box>
            <Box textAlign="center" marginTop="10px">
                <Button onClick={handleConvert} variant="contained" color="error" size="medium">
                    Upload
                </Button>
            </Box>
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
}

export default BulkUpload;
