import React, { useState } from 'react';
import { Box, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { sampleData } from "../../data/sampleData";

const Table = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [visibleColumns, setVisibleColumns] = useState(10); // Default number of visible columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Model", headerName: "Model", flex: 1 },
    { field: "Serial_No", headerName: "Serial No.", flex: 1 },
    { field: "Category", headerName: "Category", flex: 1 },
    { field: "Make", headerName: "Make", flex: 1 },
    { field: "Asset_No", headerName: "Asset No.", flex: 1 },
    { field: "Baseline_Item", headerName: "Baseline Item", flex: 1 },
    { field: "Employee_No", headerName: "Employee No", flex: 1 },
    { field: "Position", headerName: "Postition", flex: 1 },
    { field: "Assignee", headerName: "Assignee", flex: 1 },
    { field: "Location", headerName: "Location", flex: 1 },
    { field: "Hostname", headerName: "Hostname", flex: 1 },
    { field: "LAN_MAC_Address", headerName: "Lan MAC Address", flex: 1 },
    { field: "WIFI_MAC_Address", headerName: "WiFi MAC Address", flex: 1 },
    { field: "Position_1", headerName: "Position", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },
    { field: "Printer_IP_Address", headerName: "Printer IP Address", flex: 1 },
  ].slice(0, visibleColumns); // Slice the columns array to display only the desired number of columns

  const handleVisibleColumnsChange = (event) => {
    setVisibleColumns(event.target.value);
  };

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="50vh"
        sx={{
          overflowX: "auto", // Add horizontal scrollbar if needed
          "& .MuiDataGrid-toolbarContainer": {
            flexDirection: "row-reverse",
          },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={sampleData}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              rightGrid: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ marginRight: "8px" }}>Show Columns:</Typography>
                  <Select
                    value={visibleColumns}
                    onChange={handleVisibleColumnsChange}
                    sx={{ minWidth: "120px" }}
                  >
                    {[...Array(18)].map((_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              ),
            },
          }}
          disableDensitySelector
          pageSizeOptions={[10]}
          disableColumnFilter
        />
      </Box>
    </Box>
  );
};

export default Table;
