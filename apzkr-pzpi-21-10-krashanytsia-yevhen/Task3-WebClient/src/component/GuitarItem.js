import React from 'react';
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { INFO } from "../utils/constant";
import strings from "./localization";
import {observer} from "mobx-react-lite";

const GuitarItem = observer(({ guitar }) => {
    const { Name, Brand, Description, Price, Stock, GuitarID } = guitar;
    const history = useHistory();

    return (
        <Card style={{ width: "100%" }}>
            <Card.Body>
                <Card.Title>{Name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{Brand}</Card.Subtitle>
                <Card.Text>{Description}</Card.Text>
                <Card.Text>{strings.price}: {Price}</Card.Text>
                <Card.Text>{strings.stock}: {Stock}</Card.Text>
                <Button variant="primary" onClick={() => history.push(`${INFO}/${GuitarID}`)}>
                    Переглянути
                </Button>
            </Card.Body>
        </Card>
    );
});

export default GuitarItem;
