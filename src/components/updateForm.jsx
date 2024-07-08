import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";

const Update = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [visibleColumns, setVisibleColumns] = useState(17);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const columns = [
        { field: "Model", headerName: "Model", flex: 1 },
        { field: "Serial No.", headerName: "Serial No.", flex: 1 },
        { field: "Category", headerName: "Category", flex: 1 },
        { field: "Make", headerName: "Make", flex: 1 },
        { field: "Asset No.", headerName: "Asset No.", flex: 1 },
        { field: "Baseline Item", headerName: "Baseline Item", flex: 1 },
        { field: "Employee No.", headerName: "Employee No.", flex: 1 },
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
                    'Model', '[Serial No.]', 'Category', 'Make', '[Asset No.]', '[Baseline Item]', '[Employee No.]', 'Position', 'Assignee', 'Position2', 'Location', 'Hostname', '[LAN MAC Address]', '[WIFI MAC Address]', 'Status', '[Printer IP Address]'
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
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedRow(null);
    };

    const handleDialogSave = async () => {
        if (!selectedRow) return;

        const updatedData = {
            NewModel: selectedRow.Model,
            'New[Serial No.]': selectedRow['Serial No.'],
            NewCategory: selectedRow.Category,
            NewMake: selectedRow.Make,
            'New[Asset No.]': selectedRow['Asset No.'],
            'New[Baseline Item]': selectedRow['Baseline Item'],
            'New[Employee No.]': selectedRow['Employee No.'],
            NewPosition: selectedRow.Position,
            NewAssignee: selectedRow.Assignee,
            NewPosition2: selectedRow.Position2,
            NewLocation: selectedRow.Location,
            NewHostname: selectedRow.Hostname,
            'New[LAN MAC Address]': selectedRow['LAN MAC Address'],
            'New[WIFI MAC Address]': selectedRow['WIFI MAC Address'],
            NewStatus: selectedRow.Status,
            'New[Printer IP Address]': selectedRow['Printer IP Address']
        };

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/accounts/update', updatedData);
            console.log("Response data:", response.data);

            setRows(prevRows => prevRows.map(row => row['Serial No.'] === selectedRow['Serial No.'] ? { ...row, ...selectedRow } : row));

            setSnackbarMessage("Asset data updated successfully");
            setSnackbarSeverity("success");
            setDialogOpen(false);
        } catch (error) {
            console.error("Error updating asset data:", error.response ? error.response.data : error.message);
            setError("Failed to update asset data. Please try again.");
            setSnackbarMessage("Failed to update asset data. Please try again.");
            setSnackbarSeverity("error");
        } finally {
            setLoading(false);
            setSnackbarOpen(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRow({
            ...selectedRow,
            [name]: value,
        });
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
                    pageSizeOptions={[5, 10, 25]}
                    disableColumnFilter
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
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
                    getRowId={(row) => row['Serial No.']}
                    onRowClick={handleRowClick}
                />
            </Box>

            {selectedRow && (
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>EDIT ASSET INFORMATION</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {Object.keys(selectedRow).map((key) => (
                            <TextField
                                key={key}
                                name={key}
                                label={key.replace(/([a-z])([A-Z])/g, '$1 $2')}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedRow[key] || ''}
                                onChange={handleInputChange}
                                sx={{ width: '350px', marginBottom: 2 }}
                            />
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
                        <Button onClick={handleDialogSave} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            )}

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Update;
