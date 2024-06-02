import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, MenuItem, Select, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar, Alert, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
 
const Delete = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [visibleColumns, setVisibleColumns] = useState(17); // Set initial number of visible columns to 17
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
 
    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "Model", headerName: "Model", flex: 1 },
        { field: "Serial No.", headerName: "Serial No.", flex: 1 },
        { field: "Category", headerName: "Category", flex: 1 },
        { field: "Make", headerName: "Make", flex: 1 },
        { field: "Asset No.", headerName: "Asset No.", flex: 1 },
        { field: "Baseline Item", headerName: "Baseline Item", flex: 1 },
        { field: "Employee No.", headerName: "Employee No", flex: 1 },
        { field: "Position", headerName: "Position", flex: 1 },
        { field: "Assignee", headerName: "Assignee", flex: 1 },
        { field: "Position2", headerName: "Assignee Position", flex: 1 },
        { field: "Location", headerName: "Location", flex: 1 },
        { field: "Hostname", headerName: "Hostname", flex: 1 },
        { field: "LAN MAC Address", headerName: "LAN MAC Address", flex: 1 },
        { field: "WIFI MAC Address", headerName: "WIFI MAC Address", flex: 1 },
        { field: "Status", headerName: "Status", flex: 1 },
        { field: "Printer IP Address", headerName: "Printer IP Address", flex: 1 },
    ];
 
    useEffect(() => {
        setLoading(true);
 
        axios.get('http://localhost:8000/accounts/asset', {
            params: {
                assetfields: [
                    'id', 'Model', '[Serial No.]', 'Category', 'Make', '[Asset No.]', '[Baseline Item]', '[Employee No.]', 'Position', 'Assignee', 'Position2', 'Location', 'Hostname', '[LAN MAC Address]', '[WIFI MAC Address]', 'Status', '[Printer IP Address]'
                ]
            }
        })
        .then(response => {
            setRows(response.data);
            setError(null);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);
 
    const handleVisibleColumnsChange = (event) => {
        setVisibleColumns(event.target.value);
    };
 
    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        setDeleteDialogOpen(true);
    };
 
    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
        setSelectedRow(null);
    };
 
    const handleDeleteConfirm = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`http://localhost:8000/accounts/delete/${selectedRow.id}`);
            if (response.status === 200) {
                setRows(rows.filter(row => row.id !== selectedRow.id));
                setSnackbarMessage("Asset deleted successfully");
                setSnackbarSeverity("success");
            } else {
                throw new Error("Failed to delete asset");
            }
        } catch (error) {
            console.error("Error deleting asset:", error.response ? error.response.data : error.message);
            setError("Failed to delete asset. Please try again.");
            setSnackbarMessage("Failed to delete asset. Please try again.");
            setSnackbarSeverity("error");
        } finally {
            setLoading(false);
            setDeleteDialogOpen(false);
            setSnackbarOpen(true);
        }
    };
 
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
 
    return (
        <Box m="20px">
            <Box
                m="40px 0 0 0"
                height="70vh"
                width="auto"
                sx={{
                    overflowX: "auto",
                    "& .MuiDataGrid-toolbarContainer": {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    },
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell ": {
                        color: colors.redAccent[500],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.redAccent[500],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[700],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.redAccent[500],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.grey[500]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={rows}
                    columns={columns.slice(0, visibleColumns)}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    disableDensitySelector
                    pageSizeOptions={[5, 10]}
                    disableColumnFilter
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                "id": false,
                                "Category": false,
                                "Baseline Item": false,
                                "Position": false,
                                "Printer IP Address": false,
                                "WIFI MAC Address": false,
                                "LAN MAC Address": false,
                                "Hostname": false,
                                "Location": false,
                                "Position2": false,
                            },
                        },
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    onRowClick={handleRowClick}
                />
            </Box>
 
            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteDialogClose}
            >
                <DialogTitle>Delete Asset</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this asset?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="secondary">Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="primary">Delete</Button>
                </DialogActions>
            </Dialog>
 
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
 
export default Delete;