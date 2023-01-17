import React from "react";
import { styled } from "@mui/material/styles";

import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Badge,
  Button,
  Divider,
  Drawer as MUIDrawer,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HistoryIcon from "@mui/icons-material/History";
import SecurityIcon from "@mui/icons-material/Security";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockIcon from "@mui/icons-material/Lock";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { white } from "@mui/material/colors";
import { useEffect } from "react";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import BugReportIcon from "@mui/icons-material/BugReport";
import LocalStorage from "../utils/localStorage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const PREFIX = "MuiDrawer";

const classes = {
  root: `${PREFIX}-root`,
  paper: `${PREFIX}-paper`,
  drawer: `${PREFIX}-drawer`,
  drawerOpen: `${PREFIX}-drawerOpen`,
  drawerClose: `${PREFIX}-drawerClose`,
};
const drawerWidth = 270;
const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "white",
  color: "black",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const StyledMUIDrawer = styled(MUIDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#707070",
  color: "white",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
}));
export default function Layout({ children }) {
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = React.useState(LocalStorage.getUser());
  console.log("open ", open);

  useEffect(() => {
    if (user) {
    } else {
      history.push("/login");
    }
  }, [user]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    LocalStorage.rmUser();
    history.push("/login");
  };
  return (
    <>
      <Box sx={{ display: "flex", marginLeft: "270px" }}>
        <AppBar position="static">
          <Toolbar>
            {user && user.email && (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Bun venit, {user.email.toUpperCase()} - ROL: {user.role}
              </Typography>
            )}

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <StyledMUIDrawer
          // classes={{
          //     root: classes.root,
          //     paper: classes.paper
          // }}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
            }),
          }}
          open={open}
          variant="permanent"
          anchor="left"
        >
          <List>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <BugReportIcon sx={{ fontSize: 50, color: "green" }} />
            </Box>
            <Divider sx={{ marginTop: "5px" }} />

            <ListItem button key={1} onClick={() => history.push("/projects")}>
              <ListItemIcon>
                <ListIcon style={{ color: "black" }} />
              </ListItemIcon>
              <ListItemText primary={"Lista proiecte"} />
            </ListItem>
            {user && user.role === "MP" && (
              <ListItem button key={2} onClick={() => history.push("/add")}>
                <ListItemIcon>
                  <AddIcon style={{ color: "black" }} />
                </ListItemIcon>
                <ListItemText primary={"Adauga proiect nou"} />
              </ListItem>
            )}
          </List>
        </StyledMUIDrawer>
      </Box>
      <Box
        sx={{
          marginLeft: "270px",
          padding: 2,
        }}
      >
        {children}
      </Box>
    </>
  );
}
