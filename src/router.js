import React from "react";
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
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  debugger
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  debugger
  let { topicId } = useParams();
  let match = useRouteMatch();

  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.url}/authors1`}>authors</Link>
        </li>
        <li>
          <Link to={`${match.url}/authors2`}>
          authors2
          </Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.path}/:author`}>
          <Author />
        </Route>
        <Route path={match.path}>
          <h3>Please select a author.</h3>
        </Route>
      </Switch>
    </div>
    
  )
  // return <h3>Requested topic ID: {topicId}</h3>;
}
function Author () {
  let {topicId, author } = useParams();
  return <h3>author ID:{topicId} {author}</h3>;
}