import { Typography, Space, Col, Row, BackTop, Menu } from "antd";
import { useState } from "react";
import TMDb from "../images/TMDb.svg";
import {
  AntDesignOutlined,
  MenuOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
const { Text, Link, Title } = Typography;
const { SubMenu } = Menu;
const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};

function SiteFooter() {
  const [current, setCurrent] = useState(1);

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const history = useHistory();
  return (
    <>
      <Row
        type='flex'
        justify='center'
        align='middle'
        style={{ minHeight: "5vh" }}
      >
        <Col className='mobileVisible tabletVisible'>
          <Menu
            theme='light'
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
        </Col>
        <Row
          type='flex'
          align='center'
          justify='center'
          className='mobileHidden tabletHidden'
        >
          <Title level={5}>
            (c) 2021 - Serkan Okur - a portfolio project developed with React
            and
            <Link href='https://developers.themoviedb.org/3' target='_blank'>
              TMDb API
            </Link>
          </Title>

          <Space>
            <img
              src={TMDb}
              style={{ height: "0.7rem", width: "1.4rem" }}
              alt='TMDb API Logo'
            />
            <Text mark>
              This product uses the TMDb API but is not endorsed or certified by
              TMDb.
            </Text>
          </Space>
        </Row>
      </Row>

      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
    </>
  );
}

export default SiteFooter;
