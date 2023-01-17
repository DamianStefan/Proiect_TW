import * as React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Switch,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";

import Layout from "./components/Layout";
import ListaProiectePage from "./ListaProiectePage/ListaProiectePage";
import ListBugsPage from "./ListaProiectePage/ListBugsPage";
import AddBugPage from "./AddBugPage/AddBugPage";
import AddProjectPage from "./AddProjectPage/AddProjectPage";

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
        <Layout>
          <Route path="/projects" exact>
            <ListaProiectePage />
          </Route>
          <Route path="/projects/:idProject" exact>
            <ListBugsPage />
          </Route>
          <Route path="/add" exact>
            <AddProjectPage />
          </Route>

          <Route path="/projects/:idProject/addBug" exact>
            <AddBugPage />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
}
