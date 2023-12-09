import { useEffect } from "react";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Layout from "./components/common/Layout";
import {
  BrowserRouter as Router,
  Route,
  Switch

} from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthAsync } from "./utils/slices/authSlice";
import About from "./components/pages/About";
import Articles from "./components/pages/Articles";
import Works from "./components/pages/Works";
import Login from "./components/pages/Login";
import Admin from "./components/pages/Admin";
import Error from "./components/pages/Error";
import Main from "./components/pages/Main";
import SingleArticle from "./components/pages/SingleArticle";
import EditArticle from "./components/pages/EditArticle";
import EditWork from "./components/pages/EditWork";
import CreateWork from "./components/pages/CreateWork";
import CreateArticle from "./components/pages/CreateArticle";
import EditCarousel from "./components/pages/EditCarousel";


function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [])

  return (
    <Router >
      <Layout>
        <Header />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/news">
            <Articles />
          </Route>
          <Route exact path="/news/create">
            <CreateArticle />
          </Route>
          <Route exact path="/news/:id">
            <SingleArticle />
          </Route>
          <Route path="/news/:id/edit">
            <EditArticle />
          </Route>
          <Route exact path="/works">
            <Works />
          </Route>
          <Route exact path="/works/create">
            <CreateWork />
          </Route>
          <Route path="/works/:id/edit">
            <EditWork />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/carousel">
            <EditCarousel />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Layout>
      <Footer />
    

    </Router>
  );
}

export default App;
