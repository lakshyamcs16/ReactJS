import { Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import ContactList from "../components/ContactList";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from '../components/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact strict path="/" component={Login} />
      <ProtectedRoute exact path="/home" component={ContactList} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default Routes;
