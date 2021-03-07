import { Button, Row, Col, Space, Typography, Divider } from "antd";
import { Link } from "react-router-dom";
import SearchBar from ".././components/SearchBar";
const { Title } = Typography;

export default function Home() {
  return (
    <div className='home'>
      <Row justify='center' align='middle' className='mobileBlock '>
        <Space direction='vertical'>
          <Title>TV Series Hunter</Title>
          <Row>
            <Col
              flex='auto'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SearchBar size='large' placeholder='Search for TV Series' />
            </Col>
          </Row>
          <Row>
            <Space size='small'>
              <Link to='/latestseries'>
                <Button type='primary'>Latest Movies</Button>
              </Link>
              <Divider type='vertical' />
              <Link to='/topratedseries'>
                <Button type='primary'>Top Rated Movies</Button>
              </Link>
            </Space>
          </Row>
        </Space>
      </Row>
    </div>
  );
}
