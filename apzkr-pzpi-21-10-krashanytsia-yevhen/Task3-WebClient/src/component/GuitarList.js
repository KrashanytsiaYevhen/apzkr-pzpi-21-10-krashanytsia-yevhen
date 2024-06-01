import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, Col } from "react-bootstrap";
import GuitarItem from "./GuitarItem";

const GuitarList = observer(() => {
    const { guitar } = useContext(Context);

    return (
        <Row className="d-flex flex-wrap" style={{ height: "100vh" }}>
            {guitar.guitars.map(guitarItem =>
                <Col key={guitarItem.GuitarID} md={4}>
                    <GuitarItem guitar={guitarItem} />
                </Col>
            )}
        </Row>
    );
});

export default GuitarList;