import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, MenuItem, Select, Typography, useTheme, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, Button, Snackbar, Alert
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";

const UserTables = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [visibleColumns, setVisibleColumns] = useState(17);
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
    { field: "fname", headerName: "First Name", flex: 1 },
    { field: "lname", headerName: "Last Name", flex: 1 },
    { field: "domain", headerName: "Domain", flex: 1 },
    { field: "position", headerName: "Position", flex: 1 },
    { field: "eid", headerName: "Employee ID", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:8000/accounts/user', {
      params: {
        arrfields: ['id', 'fname', 'lname', 'position', 'eid', 'department', 'email', 'domain']
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

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedRow(null);
  };

  const handleDialogSave = async () => {
    if (!selectedRow) return;

    const { id, fname, lname, position, eid, department, email, domain } = selectedRow;
    const updatedData = { id, newfname: fname, newlname: lname, newposition: position, neweid: eid, newdepartment: department, newemail: email, newdomain: domain };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/accounts/update/users', updatedData);
      console.log("Response data:", response.data);

      setRows(prevRows => prevRows.map(row => row.id === id ? { ...row, ...updatedData } : row));

      setSnackbarMessage("User data updated successfully");
      setSnackbarSeverity("success");
      setDialogOpen(false);
    } catch (error) {
      console.error("Error updating user data:", error.response ? error.response.data : error.message);
      setError("Failed to update user data. Please try again.");
      setSnackbarMessage("Failed to update user data. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`http://localhost:8000/accounts/delete/users/${selectedRow.id}`);
      if (response.status === 200) {
        setRows(rows.filter(row => row.id !== selectedRow.id));
        setSnackbarMessage("User info deleted successfully");
        setSnackbarSeverity("success");
      } else {
        throw new Error("Failed to delete user info.");
      }
    } catch (error) {
      console.error("Error deleting user info:", error.response ? error.response.data : error.message);
      setError("Failed to delete user info. Please try again.");
      setSnackbarMessage("Failed to delete user info. Please try again.");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
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
                "id": false,
                "position": false,
                "eid": false,
                "department": false,
              },
            },
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onRowClick={handleRowClick}
        />
      </Box>

      {selectedRow && (
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Edit User Information</DialogTitle>
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
            <Button onClick={() => setDeleteDialogOpen(true)} color="primary">Delete</Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Confirm</Button>
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

export default UserTables;
