// AdminPage.jsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import {CATEGORY, CREATE} from "../utils/constant";
const AdminPage = () => {
    const history = useHistory();

    const handleAddGuitar = () => {
        history.push(CREATE);
    };

    const handleAddCategory = () => {
        history.push(CATEGORY);
    };

    return (
        <Container>
            <h2 className="my-4">Admin Page</h2>
            <div className="d-flex justify-content-center">
                <Button variant="primary" className="mx-2" onClick={handleAddGuitar}>Add Guitar</Button>
                <Button variant="primary" className="mx-2" onClick={handleAddCategory}>Add Category</Button>
            </div>
        </Container>
    );
};

export default AdminPage;
