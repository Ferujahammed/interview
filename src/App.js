import "./css/App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MyProvider from "./context/MyProvider";
import Home from "./components/Home";
import Statistics from "./components/Statistics";

function App() {
  return (
    <MyProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/productList" />
          </Route>
          <Route exact path="/productList" component={Home} />
          <Route exact path="/statistics" component={Statistics} />
        </Switch>
      </Router>
    </MyProvider>
  );
}

export default App;
