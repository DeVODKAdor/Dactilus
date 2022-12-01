import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "./Card.css";

function Cards(props) {
  return (
    <Card className="card dactilus m-2">
      <CardContent>
        <Typography
          sx={{
            margin: "auto",
            fontSize: 50,
            color: "#79bdef",
            WebkitTextStrokeWidth: 1,
            WebkitTextStrokeColor: "#11A0F0",
          }}
        >
          {props.numero}
        </Typography>
        <Typography
          sx={{
            margin: "auto",
            fontSize: 25,
          }}
        >
          {props.texto}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Cards;
