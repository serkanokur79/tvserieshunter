import { Button, Row, Col, Space, Typography, Divider } from "antd";
import { Link } from "react-router-dom";
import SearchBar from ".././components/SearchBar";
const { Title } = Typography;

export default function Home() {
  return (
    <Row className='home' justify='center' align='middle'>
      <Col>
        <Space direction='vertical'>
          <Title style={{ color: "gray" }} justify='center' align='middle'>
            TV Series Hunter
          </Title>
          <SearchBar />
          <Row className='mobileBlock' justify='center' align='middle'>
            <Space size='small'>
              <Link to='/topratedseries'>
                <Button type='primary'>Top Rated Movies</Button>
              </Link>
              <Divider type='vertical' />
              <Link to='/latestseries'>
                <Button type='primary'>Latest Movies</Button>
              </Link>
            </Space>
          </Row>
        </Space>
      </Col>
    </Row>
  );
}
