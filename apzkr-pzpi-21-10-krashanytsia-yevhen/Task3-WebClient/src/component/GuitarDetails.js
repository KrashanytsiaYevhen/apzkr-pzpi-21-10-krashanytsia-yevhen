import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { oneGuitar } from '../http/guitarAPI';
import { Card, Container, Spinner } from "react-bootstrap";
import strings from "./localization";

const GuitarDetails = () => {
    const { id } = useParams();
    const [guitar, setGuitar] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        oneGuitar(id).then(data => {
            setGuitar(data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching guitar:', error);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (!guitar) {
        return <div>{strings.guitarNotFound}</div>;
    }

    const { Name, Brand, Description, Price, Stock } = guitar;

    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>{Name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{Brand}</Card.Subtitle>
                    <Card.Text>{Description}</Card.Text>
                    <Card.Text>{strings.price}: {Price}</Card.Text>
                    <Card.Text>{strings.stock}: {Stock}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default GuitarDetails;
