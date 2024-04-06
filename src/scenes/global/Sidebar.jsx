import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Inventory2Icon from '@mui/icons-material/Inventory2';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
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
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.redAccent[500]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          
        },
        "& .pro-inner-item": {
          padding: "20px 30px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        
          
        },
        "& .pro-menu-item.active": { // hover/ seletor
          color: "#6870fa !important",
          padding: "5px 10px 5px 5px !important",
          border: "1px transparent ",
          background: "#fff036",
          borderRadius: "5px",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "5px 0 30px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
               <Box
               display="flex"
               justifyContent="space-between"
               alignItems="center"
               ml="15px"
             >
               <img
                 alt="Logo"
                 src="../../Icon/coke logo 2.png"
                 width="50px"
                 height="50px"
                 style={{ marginRight: "10px" }}
               />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../asset/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Patrick
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h3"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            ></Typography>
            <Item
              title="Home"
              to="/"
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
              title="Admin Management"
              to="/admin"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};


export default Sidebar;
