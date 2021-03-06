import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { Layout } from "antd";

import Home from "./pages/Home";
import TopMenu from "./components/TopMenu";
import SiteFooter from "./components/SiteFooter";
import { useEffect, useState } from "react";
import SearchResults from "./pages/SearchResults";
import Serie from "./pages/Serie";

import SerieState from "./context/series/SerieState";
import LatestSeries from "./pages/LatestSeries";
import TopRatedSeries from "./pages/TopRatedSeries";

const { Header, Footer, Content } = Layout;

function App() {
  const [theme, setTheme] = useState("light");

  const backgroundColor = theme === "light" ? "white" : "black";
  const fontColor = theme === "light" ? "black" : "white";

  useEffect(() => {
    console.log("apptheme:" + theme);
  }, [theme]);

  return (
    <SerieState>
      <Router>
        <Layout theme={theme}>
          <Header
            visible='false'
            style={{
              backgroundColor: `${backgroundColor}`,
              color: `${fontColor}`,
            }}
          >
            <TopMenu theme={theme} setTheme={(theme) => setTheme(theme)} />
          </Header>
          <Content className='site-layout' theme={theme}>
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
            </Switch>
          </Content>
          <Footer
            style={{
              backgroundColor: `${backgroundColor}`,
              color: "white",
              textAlign: "center",
            }}
          >
            <SiteFooter />
          </Footer>
        </Layout>
      </Router>
    </SerieState>
  );
}

export default App;
