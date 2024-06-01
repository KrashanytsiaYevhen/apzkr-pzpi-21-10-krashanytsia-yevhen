// Info.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { oneGuitar } from '../http/guitarAPI';
import strings from '../component/localization';
import { useCart } from '../context/CartContext';

const Info = () => {
    const [guitar, setGuitar] = useState({});
    const { id } = useParams();
    const { cart, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        const fetchGuitar = async () => {
            try {
                const data = await oneGuitar(id);
                setGuitar(data);
            } catch (error) {
                console.error('Error fetching guitar:', error);
            }
        };
        fetchGuitar();
    }, [id]);

    const isAddedToCart = cart.some(item => item.GuitarID === guitar.GuitarID);

    const handleAddToCart = () => {
        addToCart(guitar);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(guitar.GuitarID);
    };

    return (
        <Container style={{ marginLeft: '420px' }}>
            <Row>
                <Col sm={6}>
                    <Card style={{ width: '100%' }} border="light border='primary'">
                        <h5 className="card-header">
                            <b style={{ color: 'black' }}>{guitar.Name}</b>
                        </h5>

                        <p style={{ fontSize: '14px' }}>
                            {strings.brand}: {guitar.Brand}
                        </p>

                        <p style={{ fontSize: '14px' }}>
                            {strings.description}: {guitar.Description}
                        </p>

                        <p style={{ fontSize: '14px' }}>
                            {strings.price}: {guitar.Price}
                        </p>

                        <p style={{ fontSize: '14px' }}>
                            {strings.stock}: {guitar.Stock}
                        </p>

                        <p style={{ fontSize: '14px' }}>
                            {strings.category}: {guitar.Category?.CategoryName}
                        </p>
                    </Card>
                    {isAddedToCart ? (
                        <Button onClick={handleRemoveFromCart}>{strings.saved}</Button>
                    ) : (
                        <Button onClick={handleAddToCart}>{strings.save}</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Info;
