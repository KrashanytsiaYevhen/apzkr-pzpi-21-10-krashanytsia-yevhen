import React, { useState } from 'react';
import { createCategory } from '../http/guitarAPI';
import { Container, Form, Button } from 'react-bootstrap';

const AddCategoryPage = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategory(categoryName);
            alert('Category added successfully!');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <Container>
            <h2 className="my-4">Add Category</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" value={categoryName} onChange={handleChange} placeholder="Category Name" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default AddCategoryPage;
