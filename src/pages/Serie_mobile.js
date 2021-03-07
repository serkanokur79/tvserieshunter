import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
import MovieRating from "../components/MovieRating";
import SimilarSeries from "../components/SimilarSeries";
import SerieContext from "../context/series/SerieContext";
import {
  Progress,
  Button,
  PageHeader,
  Descriptions,
  Space,
  Row,
  Divider,
  Typography,
  Empty,
  Col,
} from "antd";

import { ClockCircleOutlined, ReadOutlined } from "@ant-design/icons";

import YouTube from "react-youtube";
import Modal from "antd/lib/modal/Modal";
import PNA from "../images/PNA.png";
const { Title } = Typography;

const SerieMobile = () => {
  const serieContext = useContext(SerieContext);
  const {
    loading,
    serie,
    getSerie,
    serieError,
    serieVideos,
    seriesTrailerVideo,
    getSerieVideos,
  } = serieContext;

  const [openPopup, setOpenPopup] = useState(false);
  const location = useLocation();
  //console.log(location);
  const serieId = location.pathname.split("/")[2];
  const imagepath = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/";

  useEffect(() => {
    getSerie(serieId);
    getSerieVideos(serieId);
  }, [serieId]);

  const {
    first_air_date,
    name,
    status,
    genres,
    overview,
    poster_path,
    episode_run_time,
    tagline,
    vote_average,
    backdrop_path,
    budget,
    revenue,
    created_by,
    origin_country,
    number_of_seasons,
    number_of_episodes,
  } = serie;

  const moneyFormatted = (budget) => {
    if (budget > 0) {
      return <p>{budget}</p>;
    } else {
      return <p>Unknown</p>;
    }
  };
  const history = useHistory();

  const posterSrc = serie.poster_path ? `${imagepath + poster_path}` : PNA;

  const SerieDetails = () => {
    return (
      <Col>
        <Space direction='vertical' size='small'>
          <Row>
            <Title>{name}</Title>
            <span>({first_air_date.split("-")[0]})</span>
          </Row>
          <Row>
            <Title level={5}>
              <Space size='middle'>
                Created by:
                {created_by.map((c) => c.name).join(" , ")}
              </Space>
            </Title>
          </Row>
          <Row>
            <Space split={<Divider type='vertical' />}>
              <Col xs={22} offset={1}>
                <Title level={3}>
                  <Space size='middle'>
                    <ReadOutlined />
                    {genres.map(
                      (genre, i) =>
                        genre.name + (i === genres.length - 1 ? "" : ",")
                    )}
                  </Space>
                </Title>
              </Col>
              <Col xs={22} offset={1}>
                <Title level={4}>
                  <Space size='middle'>
                    <ClockCircleOutlined />
                    {episode_run_time > 60
                      ? Math.floor(episode_run_time / 60) +
                        "h " +
                        (episode_run_time -
                          Math.floor(episode_run_time / 60) * 60) +
                        "m"
                      : episode_run_time + "m"}
                  </Space>
                </Title>
              </Col>
            </Space>
          </Row>
          <Row>
            <Space>
              <Col>
                <Title level={4}>User Rating:</Title>
              </Col>
              <Col>
                <MovieRating vote_average={vote_average} width='4rem' />
              </Col>

              <Col>
                <Title level={4}>Trailer:</Title>
              </Col>
              <Col>
                <Button
                  type='ghost'
                  size='large'
                  className='serie__trailerButton'
                  onClick={() => handlePopUp()}
                  style={{ cursor: "pointer" }}
                >
                  <CaretRightOutlined /> Watch
                </Button>
                <Modal
                  title={`${name} Trailer`}
                  width='60%'
                  visible={openPopup}
                  onOk={() => handlePopUp()}
                  onCancel={() => handlePopUp()}
                >
                  <YouTube
                    videoId={seriesTrailerVideo[1]}
                    opts={{
                      height: "720",
                      width: "1080",
                      playerVars: {
                        // https://developers.google.com/youtube/player_parameters
                        autoplay: 0,
                      },
                    }}
                    onReady={(event) => event.target.pauseVideo()}
                  />
                </Modal>
              </Col>
            </Space>
          </Row>
          <Row>
            <Title level={3}>{tagline}</Title>
          </Row>
          <Row>
            <Col xs={22} offset={1}>
              <Title level={5}>{overview}</Title>
            </Col>
          </Row>
        </Space>
      </Col>
    );
  };

  const handlePopUp = () => {
    setOpenPopup(!openPopup);
    console.log("Trailer open");
  };

  return (
    <div>
      {!serieError && !loading && (
        <>
          <PageHeader
            className='site-page-header'
            onBack={() => history.goBack()}
            title='Back to Search Results'
            //subTitle={tagline}
          />

          {backdrop_path && (
            <div className='serie__homeImage_black'>
              <img
                className='serie__homeImage'
                src={`${imagepath + backdrop_path}`}
                alt=''
                style={{ padding: "0 -1rem" }}
              />
            </div>
          )}

          <Row wrap>
            <Row wrap gutter={8}>
              <Col xs={24} sm={9} xl={8}>
                <img
                  width='250rem'
                  src={posterSrc}
                  alt={name + "poster"}
                  style={{ margin: "0.5rem" }}
                ></img>
              </Col>
              <Col xs={24} sm={15} xl={16}>
                <SerieDetails />
              </Col>
            </Row>
            <Space direction='vertical'>
              <Divider orientation='left'>
                <Title level={3}>Info</Title>
              </Divider>
              <Row className='serie_info_rows'>
                <Descriptions
                  column={{ xxl: 6, xl: 5, lg: 4, md: 3, sm: 2, xs: 1 }}
                  size='14'
                >
                  <Descriptions.Item label='Origin'>
                    {origin_country}
                  </Descriptions.Item>
                  <Descriptions.Item label='Status'>{status}</Descriptions.Item>
                  <Descriptions.Item label='Seasons'>
                    {number_of_seasons}
                  </Descriptions.Item>
                  <Descriptions.Item label='Episodes'>
                    {number_of_episodes}
                  </Descriptions.Item>
                  <Descriptions.Item label='Budget'>
                    {budget !== "Unknown" ? moneyFormatted(budget) : budget}
                  </Descriptions.Item>
                  <Descriptions.Item label='Revenue'>
                    {revenue !== "Unknown" ? moneyFormatted(revenue) : "-"}
                  </Descriptions.Item>

                  {/* <Descriptions.Item label='IMDB'>{imdb_id}</Descriptions.Item>*/}
                </Descriptions>
              </Row>

              <Divider orientation='left'>
                <Title level={3}>Videos</Title>
              </Divider>
              <Col xs={24}>
                <div className='tabSlider'>
                  <Space>
                    {serieVideos.length === 0 && (
                      <>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        <Title level={4}>No video found!</Title>
                      </>
                    )}

                    {serieVideos.map((video, i) => (
                      <Col key={i}>
                        <Title level={4}>{video.type}:</Title>
                        <YouTube
                          videoId={video.key}
                          opts={{
                            height: "280",
                            width: "525",
                            playerVars: {
                              // https://developers.google.com/youtube/player_parameters
                              autoplay: 0,
                            },
                          }}
                          onReady={(event) => event.target.pauseVideo()}
                        />
                      </Col>
                    ))}
                  </Space>
                </div>
              </Col>
              <Divider orientation='left'>
                <Title level={3}>Similar Tv Series</Title>
              </Divider>
              <Col xs={24}>
                <div className='tabSlider'>
                  <SimilarSeries serieId={serieId} />
                </div>
              </Col>
            </Space>
          </Row>
        </>
      )}
      {loading && <Progress percent={80} status='active' />}
      {serieError && !loading && <h1>Serie not found!</h1>}
    </div>
  );
};

export default SerieMobile;
