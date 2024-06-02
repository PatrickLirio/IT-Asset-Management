import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme, Divider } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Home");


  const handleLogout = () => {
    // // Perform logout logic here
    // console.log("Logout clicked");
    // // Clear any authentication tokens or local storage
    // localStorage.removeItem('is_authenticated');
    // // Redirect to the login page
    // navigate({</Login>});
  };

  return (
    <Box
      sx={{
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: theme.palette.mode === "dark"
            ? `${colors.redAccent[500]} !important`
            : `${colors.primary[300]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "15px 20px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
          background: "#fff036",
          borderRadius: "10px",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h6" sx={{ fontFamily: "cursive", fontWeight: "bold", color: colors.grey[100] }}>
                  ITAMS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px" textAlign="center" >
              {/* <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={`../../asset/user.png`}
                style={{ borderRadius: "50%" }}
              /> */}
              <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mt: "25px" }}>
                Patrick
              </Typography>
              {/* <Typography variant="h5" color={colors.greenAccent[500]}>
                VP Fancy Admin
              </Typography> */}
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Home"
              to="/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<DashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Asset"
              to="/assets"
              icon={<Inventory2Icon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="User Management"
              to="/admin"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Divider sx={{ my: 6, borderColor: colors.grey[400] }} />

            {!isCollapsed && (
              <MenuItem
                onClick={handleLogout}
                icon={<ExitToAppIcon />}
                style={{ color: colors.grey[100] }}
              >
                <Typography>Sign Out</Typography>
              </MenuItem>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
