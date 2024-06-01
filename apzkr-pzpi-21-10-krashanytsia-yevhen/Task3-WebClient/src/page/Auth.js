import React, {useContext, useState} from 'react';
import {Card, Container, Form, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {AUTH, HOME, REGISTRATION_ROUTE} from "../utils/constant";
import {observer} from "mobx-react-lite";
import {login, registration} from "../http/userApi";
import {Context} from "../index";
import {PhoneInput} from "react-international-phone";
import 'react-international-phone/style.css';
import strings from "../component/localization";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === AUTH
    const [user_name, setName] = useState('')
    const [user_login, setLogin] = useState('')
    const [user_password, setPassword] = useState('')
    const [user_phone, setPhone] = useState('')
    const [user_mail, setMail] = useState('')
    const [role, setRole] = useState('')
    const click = async () =>{
        try{
            let data;
            if(isLogin){
                data = await login(user_login, user_password)
            }else{
                data = await registration(user_name,user_login,user_password,user_phone,user_mail,role)
            }

            user.setUser(user)
            user.setIsAuth(true)
            localStorage.setItem('userId', data.id);
            history.push(HOME)
        }catch (e){
            alert(e.response.data.message)
        }

    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? strings.authorization : strings.registration}</h2>
                <Form className="d-flex flex-column">
                    {!isLogin && (
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder={strings.name}
                                value={user_name}
                                onChange={e => setName(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder={strings.enterlogin}
                                value={user_login}
                                onChange={e => setLogin(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder={strings.password}
                                value={user_password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <div>
                                <PhoneInput
                                    style={{marginTop: 16}}
                                    inputStyle={{width: '100%', fontSize: 16, padding: 5}}
                                    defaultCountry="ua"
                                    value={user_phone}
                                    onChange={(user_phone) => setPhone(user_phone)}
                                />
                            </div>
                            <Form.Control
                                className="mt-3"
                                placeholder={strings.email}
                                value={user_mail}
                                onChange={e => setMail(e.target.value)}
                            />
                            <Form.Select
                                className="mt-3"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">{strings.role}</option>
                                <option value="Роботодавець">{strings.employer}</option>
                                <option value="Шукач">{strings.searcher}</option>
                            </Form.Select>

                        </>
                    )}
                    {isLogin && (
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder={strings.enterlogin}
                                value={user_login}
                                onChange={e => setLogin(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder={strings.password}
                                value={user_password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </>
                    )}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? strings.login : strings.registration}
                        </Button>
                        {isLogin ?
                            <div>
                                {strings.noakk} <NavLink to={REGISTRATION_ROUTE}>{strings.registration}</NavLink>
                            </div>
                            :
                            <div>
                                {strings.haveakk} <NavLink to={AUTH}>{strings.login}</NavLink>
                            </div>
                        }

                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;