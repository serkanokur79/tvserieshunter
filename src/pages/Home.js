import { Button, Space, Typography, Divider, Col, Row } from "antd";
import { Link } from "react-router-dom";
import SearchBar from ".././components/SearchBar";
const { Title } = Typography;

export default function Home() {
  return (
    <Row
      type='flex'
      justify='center'
      align='middle'
      style={{ minHeight: "80vh" }}
    >
      <Col xs={20} offset={1}>
        <Row type='flex' justify='center' align='middle'>
          <Title>TV Series Hunter</Title>
        </Row>
        <Row type='flex' justify='center' align='middle'>
          <Col xs={22} lg={12}>
            <SearchBar size='large' placeholder='Search for TV Series' />
          </Col>
        </Row>
        <Divider dashed />
        <Row type='flex' justify='space-around' style={{ minHeight: "2rem" }}>
          <Space size='middle'>
            <Link to='/latestseries'>
              <Button type='primary'>Latest Movies</Button>
            </Link>
            <Divider type='vertical' />
            <Link to='/topratedseries'>
              <Button type='primary'>Top Rated Movies</Button>
            </Link>
          </Space>
        </Row>
      </Col>
    </Row>
  );
}
