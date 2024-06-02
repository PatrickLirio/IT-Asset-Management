import { ColorModeContext } from "./theme"; // Import only ColorModeContext
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Routes, Route } from "react-router-dom"; // Import Routes component
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Assets from "./scenes/assets/Asset";
import Admin from "./scenes/admin/Admin";
import Home from "./scenes/home/Home";
// import Login from "./LoginPage";

// Assuming useMode is defined somewhere else or you have a similar custom hook
import { useMode } from "./theme";
import Login from "./LoginPage";




const MainPage = () => {
  
    const [theme, colorMode] = useMode(); // Uncomment if useMode is defined
  return (
    <ColorModeContext.Provider value={ colorMode }>
       <ThemeProvider theme={theme}> 
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
             {/* <Route exact path="/" element={<Login />} /> */}
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/assets" element={<Assets />} />
            <Route exact path="/admin" element={<Admin />} />
            {/* Add more routes as needed */}
            <Route exact path='/' element={<Navigate to='/home' />} />

          </Routes>
        </main>
      </div>
      </ThemeProvider> 
    </ColorModeContext.Provider>
  )
};

export default MainPage;
