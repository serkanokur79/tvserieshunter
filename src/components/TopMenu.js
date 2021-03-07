import { useState } from "react";

import { useHistory } from "react-router-dom";
import TMDb from "../images/TMDb.svg";
import {
  AntDesignOutlined,
  MenuOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { Menu, Row, Col, Typography, Space, Button } from "antd";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const { Title } = Typography;
const { SubMenu } = Menu;

export default function TopMenu({ theme, setTheme }) {
  const [current, setCurrent] = useState(1);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const history = useHistory();

  return (
    <div className='site-header'>
      <Row>
        <Col flex='100px'>
          <Link to='/'>
            <Button type='link'>
              <Col>
                <Space>
                  <img
                    src={TMDb}
                    style={{ height: "1.2rem" }}
                    alt='TMDB Logo'
                  />

                  <Title
                    level={3}
                    style={{ color: "gray", height: "1.2rem" }}
                    className='mobileHidden'
                  >
                    TV Series Hunter
                  </Title>
                </Space>
              </Col>
            </Button>
          </Link>
        </Col>

        <Col
          flex='auto'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchBar />
        </Col>
        <Col flex='400px' className='mobileHidden tabletHidden'>
          <Row justify='center' align='middle'>
            <Menu
              theme='dark'
              onClick={(e) => handleClick(e)}
              selectedKeys={[current]}
              mode='horizontal'
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
          </Row>
        </Col>
      </Row>
    </div>
  );
}
