import React, { useContext, useState } from 'react';
import { Context } from "../index";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useHistory } from 'react-router-dom';
import { AUTH, HOME, SEARCH, CART_ROUTE } from "../utils/constant";      // Імпортуємо CART_ROUTE
import strings from "./localization";

const Header = observer(() => {
    const { user } = useContext(Context);
    const history = useHistory();
    const [query, setQuery] = useState('');
    const [language, setLanguage] = useState('uk');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        strings.setLanguage(event.target.value);
    };


    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        history.push(HOME);
    };

    return (
        <Container>
            <Navbar bg="#0026CA" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => history.push(HOME)}>Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-between align-items-center">
                        <Form inline className="d-flex justify-content-center flex-grow-1 mx-3">

                        </Form>
                        <Nav className="d-flex align-items-center">
                            <Nav.Link onClick={() => history.push(CART_ROUTE)} className="text-light">Кошик</Nav.Link>
                            {user.isAuth ? (
                                <>
                                    <Form.Select value={language} onChange={handleLanguageChange} className="mx-2">
                                        <option value="uk">Українська</option>
                                        <option value="en">English</option>
                                    </Form.Select>
                                    <Nav.Link onClick={logOut} className="ml-2 text-light">{strings.logout}</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Form.Select value={language} onChange={handleLanguageChange} className="mx-2">
                                        <option value="uk">Українська</option>
                                        <option value="en">English</option>
                                    </Form.Select>
                                    <Nav.Link onClick={() => history.push(AUTH)} className="text-light">{strings.login}</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    );
});

export default Header;
