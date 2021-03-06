import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { Layout } from "antd";

import Home from "./pages/Home";
import TopMenu from "./components/TopMenu";
import SiteFooter from "./components/SiteFooter";
import SearchResults from "./pages/SearchResults";
import Serie from "./pages/Serie";
import LatestSeries from "./pages/LatestSeries";
import TopRatedSeries from "./pages/TopRatedSeries";
import Page404 from "./pages/Page404";

import SerieState from "./context/series/SerieState";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <SerieState>
      <Router>
        <Layout>
          <Header theme='light'>
            <TopMenu />
          </Header>
          <Content>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/searchResults'>
                <SearchResults />
              </Route>
              <Route path='/Serie/:serieId'>
                <Serie />
              </Route>
              <Route path='/latestseries'>
                <LatestSeries />
              </Route>
              <Route path='/topratedseries'>
                <TopRatedSeries />
              </Route>
              <Route component={Page404} />
            </Switch>
          </Content>
          <Footer theme='light'>
            <SiteFooter />
          </Footer>
        </Layout>
      </Router>
    </SerieState>
  );
}

export default App;
