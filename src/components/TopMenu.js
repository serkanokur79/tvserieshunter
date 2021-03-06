import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import TMDb from "../images/TMDb.svg";
import {
  AntDesignOutlined,
  MenuOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { Menu, Switch, Row, Col, Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const { Title } = Typography;
const { SubMenu } = Menu;

export default function TopMenu({ theme, setTheme }) {
  const [current, setCurrent] = useState(1);

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    console.log("theme:" + theme);
  }, [theme]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const history = useHistory();

  return (
    <div className='site-header'>
      <Row type='flex' style={{ alignItems: "center" }} justify='center'>
        <Space>
          <Col>
            <Link to='/'>
              <Button type='link'>
                <Col className='mobileVisible'>
                  <img
                    src={TMDb}
                    style={{ height: "1.2rem" }}
                    alt='TMDB Logo'
                  />
                </Col>
                <Col className='mobileHidden'>
                  <Title level={3} style={{ color: "gray" }}>
                    TV Series Hunter
                  </Title>
                </Col>
              </Button>
            </Link>
          </Col>

          <Row className='mobileHidden'>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SearchBar />
            </Col>
          </Row>
          <Menu
            theme={theme}
            onClick={(e) => handleClick(e)}
            selectedKeys={[current]}
            mode='horizontal'
            style={{ lineHeight: "1.2rem" }}
          >
            <SubMenu key='SubMenu' icon={<MenuOutlined />} title='Lists'>
              <Menu.ItemGroup title='Latest'>
                <Menu.Item
                  key='serieList:2'
                  onClick={() => history.push("/latestseries")}
                >
                  Latest TV Series
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title='Goldies'>
                <Menu.Item
                  key='serieList:3'
                  onClick={() => history.push("/topratedseries")}
                >
                  Top Rated TV Series
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item key='Serkan' icon={<AntDesignOutlined />}>
              <a
                href='https://serkanokur.xyz'
                target='_blank'
                rel='noopener noreferrer'
              >
                About Me
              </a>
            </Menu.Item>
            <Menu.Item key='mail' icon={<PlaySquareOutlined />}>
              <a
                href='https://moviehunter-so.netlify.app/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Movie Hunter
              </a>
            </Menu.Item>
          </Menu>
          <Col offset='1'>
            <Switch
              checked={theme === "dark"}
              onChange={() => changeTheme()}
              checkedChildren='Dark'
              unCheckedChildren='Light'
            />
          </Col>
        </Space>
      </Row>
    </div>
  );
}
