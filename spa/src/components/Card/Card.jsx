import { useEffect } from "react";
import { CardBody, CardContainer, CardFooter } from "./CardStyle";
import { TextLimit } from "../TextLimit/TextLimit";

export function Card(props) {
  return (
    <CardContainer>
      <CardBody>
        <div>
          <h2>{props.title}</h2>
          <img src={props.banner} alt="Imagem" />
        </div>
        <TextLimit text={props.text} limit={100} />
      </CardBody>

      <CardFooter>
        <div>
          <i className="bi bi-hand-thumbs-up"></i>
          <span>{props.likes}</span>
        </div>

        <div>
          <i className="bi bi-chat"></i>
          <span>{props.comments}</span>
        </div>
      </CardFooter>
    </CardContainer>
  );
}
