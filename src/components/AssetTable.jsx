import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";


const Update = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [visibleColumns, setVisibleColumns] = useState(17); // Set initial number of visible columns to 17
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
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
            components={{
              Toolbar: () => (
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <GridToolbar />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ marginRight: "8px" }}>Show Columns:</Typography>
                    <Select
                      value={visibleColumns}
                      onChange={handleVisibleColumnsChange}
                      sx={{ minWidth: "120px" }}
                    >
                      {[...Array(columns.length)].map((_, index) => (
                        <MenuItem key={index + 1} value={index + 1}>
                          {index + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
              ),
            }}
          />
        </Box>
      </Box>
    );
  };

export default Update;