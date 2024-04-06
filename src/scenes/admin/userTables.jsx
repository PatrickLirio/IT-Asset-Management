import React, { useState, useEffect } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme"; // Import the tokens function to get colors
import axios from 'axios'; // Import Axios library

const UserTables = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "fname", headerName: "First Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "lname", headerName: "Last Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "username", headerName: "UserName", flex: 1 },
    { field: "position", headerName: "Position", flex: 1 },
    { field: "employeeID", headerName: "Employee ID", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  useEffect(() => {
    axios.get('http://localhost:3000/users') // Assuming the endpoint is '/users' on your JSON server
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="50VH"
        sx={{
          "& .MuiDataGrid-toolbarContainer": { flexDirection: "row-reverse" },
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          // "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[200],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[200],
          },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
          pageSizeOptions={[10]}
          disableColumnFilter
        />
      </Box>
    </Box>
  );
};

export default UserTables;
