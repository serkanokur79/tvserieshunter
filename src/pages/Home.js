import { Button, Space, Typography, Divider } from "antd";
import { Link } from "react-router-dom";
import SearchBar from ".././components/SearchBar";
const { Title } = Typography;

export default function Home() {
  return (
    <div className='home'>
      <Space direction='vertical'>
        <Title>TV Series Hunter</Title>

        <SearchBar size='large' placeholder='Search for TV Series' />

        <Space size='middle'>
          <Link to='/latestseries'>
            <Button type='primary'>Latest Movies</Button>
          </Link>
          <Divider type='vertical' />
          <Link to='/topratedseries'>
            <Button type='primary'>Top Rated Movies</Button>
          </Link>
        </Space>
      </Space>
    </div>
  );
}
