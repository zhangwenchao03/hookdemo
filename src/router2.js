import React from "react";
import '../src/assets/Login.module.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/MainFrame">
          <MainFrame />
        </Route>
      </Switch>
    </Router>
  );
}
function Login () {
  return <h1>Login</h1>
}
function MainFrame () {
  let match = useRouteMatch();
  return (
    <div>
      <h1>header</h1>
      <Switch>
        <Route exact path={`${match.path}`}>
          <MainPic/>
        </Route>
        <Route exact path={`${match.path}/Papr`}>
          <Papr/>
        </Route>
        <Route exact path={`${match.path}/Diagnosis`}>
          <Diagnosis/>
        </Route>
      </Switch>
    </div>
  )
};
function MainPic() {
  return <h1>picture</h1>;
}
function Papr () {
 return <h1>papr</h1>
}
function Diagnosis () {
  return <h1>Diagnosis</h1>
}