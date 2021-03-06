import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Badge,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "../../assests/css/MoviePage.css";
import AppContext from "../../context/AppContext";
import MovieForm from "../../components/MovieForm";

export default function MoviePage() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { state, actions } = useContext(AppContext);

  const { id } = useParams();

  const movie = state?.movieList?.find((item) => item?.id === parseInt(id));

  return (
    <div className="moviePage">
      <Container>
        <Row>
          <Col md="6">
            <div className="movieImage">
              <img src={movie.image} alt={movie.movie} />
            </div>
          </Col>
          <Col md="6">
            <div className="movieInfo">
              <div className="movieName">
                <h1>{movie.movie}</h1>
              </div>
              <div className="releaseDate">
                <span>{`Release date : ${movie.releaseDate}`}</span>
              </div>
              <div className="movieGenres">
                <span>Tags : </span>
                {movie.genres.map((item, idx) => (
                  <span className="genreItem" key={idx}>
                    <Badge color="success" pill>
                      {item.label}
                    </Badge>
                  </span>
                ))}
              </div>
              <div className="movieLanguages">
                <span>Languages : </span>
                {movie.language.split(",").map((item) => (
                  <span className="languageItem" key={item}>
                    <Badge color="warning">{item}</Badge>
                  </span>
                ))}
              </div>
              <div className="movieRating">
                <p>⭐️⭐️⭐️ {`${movie.rating} / ${movie.voteCount} votes`}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="movieOverview">
              <h4>Overview</h4>
              <p>{movie.overview}</p>
            </div>
          </Col>
          <Col md="6">
            <div className="movieCast">
              <h4>Cast</h4>
              <ListGroup>
                {movie.cast.split(",").map((item, i) => (
                  <ListGroupItem key={i} color="light">
                    {item}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="removeButton">
              <Link to="/">
                <Button
                  onClick={() => actions?.onRemoveHandler(parseInt(id))}
                  block
                  color="danger"
                  size="md"
                >
                  Remove
                </Button>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="editButton">
              <Button color="primary" size="md" onClick={toggle} block>
                Edit
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Your Favourite Movie</ModalHeader>
        <ModalBody>
          <MovieForm toggle={toggle} defaultValues={movie} />
        </ModalBody>
      </Modal>
    </div>
  );
}
