import React from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { createOrder } from "../http/orderAPI";
import strings from "../component/localization";

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    const handleCheckout = async () => {
        const UserId = localStorage.getItem("userId");
        const OrderDate = new Date().toISOString();
        const items = cart.map(item => ({
            GuitarID: item.GuitarID,
            Quantity: 1
        }));

        try {
            const { TotalAmount } = await createOrder(UserId, OrderDate, items); // Отримуємо загальну суму замовлення

            clearCart();
            alert(`Замовлення успішне. Загальна сума: ${TotalAmount} грн`);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{strings.cart}</h1>
                    {cart.map((item) => (
                        <Card key={item.GuitarID} style={{ marginBottom: "10px" }}>
                            <Card.Body>
                                <Card.Title>{item.Name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{item.Brand}</Card.Subtitle>
                                <Card.Text>{strings.price}: {item.Price}</Card.Text>
                                <Button variant="danger" onClick={() => removeFromCart(item.GuitarID)}>Видалити</Button>
                            </Card.Body>
                        </Card>
                    ))}
                    <Button variant="success" onClick={handleCheckout} disabled={cart.length === 0}>
                        Оформити
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
