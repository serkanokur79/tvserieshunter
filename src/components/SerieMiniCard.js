import React from "react";
//import "./SerieMiniCard.css";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { Card, Row, Space, Typography, Col } from "antd";
import { CalendarOutlined, HeartOutlined } from "@ant-design/icons";
import PNA from "../images/PNA.png";
const { Title } = Typography;

function SerieMiniCard({ serie }) {
  const {
    name,
    id,
    vote_average,
    first_air_date,
    poster_path,
    vote_count,
  } = serie;

  const history = useHistory();

  const src = serie.poster_path
    ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`
    : PNA;

  return (
    <>
      <Card
        hoverable
        style={{ width: "100%" }}
        onClick={() => history.push(`/serie/${id}`)}
        cover={<img alt={name + "poster"} src={src} />}
      >
        <Row>
          <Title level={5}>
            {name.length > 16 ? name.substr(0, 14) + "..." : name}
          </Title>
        </Row>

        <Row>
          <Col>
            <Space size='small'>
              <CalendarOutlined />
              <Moment parse='YYYY-MM-DD' format='YYYY'>
                {first_air_date}
              </Moment>
            </Space>
          </Col>
        </Row>

        <Row>
          <Col>
            <Space size='small'>
              <HeartOutlined />
              {vote_average}({vote_count})
            </Space>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default SerieMiniCard;
