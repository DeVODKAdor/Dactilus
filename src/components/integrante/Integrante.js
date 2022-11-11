import React from "react";
import Flavia from "../../assets/images/equipe/flavia.png";
import Davi from "../../assets/images/equipe/davi.png";
import Arinaldo from "../../assets/images/equipe/arinaldo.png";
import {
  Card,
  CardGroup,
  CardImg,
  CardText,
  CardTitle,
  CardBody,
} from "reactstrap";

function Integrantes() {
  return (
    <CardGroup>
      <Card className="m-5">
        <CardImg alt="Flávia" src={Flavia} top width="100%" />
        <CardBody>
          <CardTitle tag="h5">Flávia Silva</CardTitle>

          <CardText>
            Designer, responsável por toda a estética do projeto
          </CardText>
        </CardBody>
      </Card>
      <Card className="m-5">
        <CardImg alt="Davi" src={Davi} top width="100%" />
        <CardBody>
          <CardTitle tag="h5">Davi Moreira</CardTitle>
          <CardText>
            Programador, responsável por toda a lógica do projeto
          </CardText>
        </CardBody>
      </Card>
      <Card className="m-5">
        <CardImg alt="Arinaldo" src={Arinaldo} top width="100%" />
        <CardBody>
          <CardTitle tag="h5">Arinaldo Aquino</CardTitle>

          <CardText>
            Analista, responsável por toda a pesquisa e a documentação do
            projeto.
          </CardText>
        </CardBody>
      </Card>
    </CardGroup>
  );
}

export default Integrantes;
