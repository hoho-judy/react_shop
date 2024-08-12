/* eslint-disable */
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Card(props) {

  let navigate = useNavigate();

  return (
    <Col key={props.key} onClick={()=>{ navigate('/detail/'+props.shoe.id) }}>
      <img src={props.shoe.img} width="80%" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.price}</p>
    </Col>
  );
}

export default Card;
