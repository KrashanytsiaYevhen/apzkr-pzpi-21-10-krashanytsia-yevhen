import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {allGuitar} from "../http/guitarAPI";
import {Context} from "../index";
import Pages from "../component/Pages";
import GuitarList from "../component/GuitarList";


const Home = observer(() => {
    const {guitar} = useContext(Context)

    useEffect(() => {
        allGuitar( 9, 1).then(data => {
            guitar.setGuitar(data.rows)
            guitar.setTotalCount(data.count)
        })
    }, [guitar.page]);

    console.log(guitar)
    return (
        <Container>
            <Row className="mt-2">
                <Col md={9}>
                    <GuitarList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Home;