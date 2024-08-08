import { Col } from "react-bootstrap";

function Card(props) {
    return (
        <Col>
            <img src={ props.shoe.img } width="80%" />
            <h4>{ props.shoe.title }</h4>
            <p>{ props.shoe.price }</p>
        </Col>
    )
}

export default Card;