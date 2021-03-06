import { Typography, Space, Image, Col, Row, BackTop } from "antd";
import React from "react";
import TMDb from "../images/TMDb.svg";
const { Text, Link, Title } = Typography;

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
  return (
    <>
      <Col>
        <Row align='middle' justify='center'>
          <Title level={5}>
            (c) 2021 - Serkan Okur - a portfolio project developed with React
            and
            <Link href='https://developers.themoviedb.org/3' target='_blank'>
              {" "}
              TMDb API
            </Link>
          </Title>
        </Row>
        <Row type='flex' style={{ alignItems: "center" }} justify='center'>
          <Space>
            <Image
              src={TMDb}
              preview='false'
              height='0.7rem'
              width='1.4rem'
              alt='TMDb API Logo'
            />
            <Text mark>
              This product uses the TMDb API but is not endorsed or certified by
              TMDb.
            </Text>
          </Space>
        </Row>
      </Col>
      <BackTop>
        <div style={style}>UP</div>
      </BackTop>
    </>
  );
}

export default SiteFooter;
