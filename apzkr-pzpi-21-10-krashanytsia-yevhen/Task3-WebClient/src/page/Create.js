import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { createGuitar, createCategory } from '../http/guitarAPI';
import { HOME } from "../utils/constant";
import { useHistory } from 'react-router-dom';
import strings from "../component/localization";

const CreateGuitar = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const history = useHistory();

    const click = async () => {
        try {
            let data;
            data = await createGuitar(name, brand, description, price, stock, categoryID);
            history.push(HOME);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container>
            <div className="CreateGuitar">
                <h1>{strings.createGuitar}</h1>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>{strings.name}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={strings.enterName}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridBrand">
                            <Form.Label>{strings.brand}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={strings.enterBrand}
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label>{strings.description}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder={strings.enterDescription}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>{strings.price}</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={strings.enterPrice}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridStock">
                            <Form.Label>{strings.stock}</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={strings.enterStock}
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCategoryID">
                            <Form.Label>{strings.categoryID}</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder={strings.enterCategoryID}
                                value={categoryID}
                                onChange={(e) => setCategoryID(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="primary" onClick={click}>
                        {strings.createGuitar}
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default CreateGuitar;
