import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./component/AppRouter";
import { Spinner } from "react-bootstrap";
import Header from "./component/Header";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userApi";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(true);
            user.setIsAuth(true);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Spinner animation={"grow"} />;
    }

    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
