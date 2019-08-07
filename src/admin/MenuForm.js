import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function MenuForm({ open, onClose, categoryId, onSave, editing, parentId }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [target, setTarget] = useState('_self');
    const [hasChildren, setHasChildren] = useState(false);

    function handleSubmit() {
        let form = {
            name: name,
            link: link,
            target: target,
            hasChildren: hasChildren,
            categoryId: categoryId
        }

        if (parentId){
            form.parentId = parentId;
        }

        let path = '/api/menu/save';
        if (editing){
            path = '/api/menu/update';
            form.id = editing;
        }

        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(function (response) {
            if (response.ok) {
                onSave();
            }
        })
    }

    useEffect(() => {
        if (open === true) {
            setName('');
            setLink('');
            setTarget('_self');
            setHasChildren(false);
        }
    }, [open]);

    useEffect(() => {
        if (editing) {
            fetch('/api/menu/read/' + editing)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setName(data.name);
                    setLink(data.link);
                    setTarget(data.target);
                    setHasChildren(data.hasChildren);                    
                });
        }
    }, [editing]);

    return (
        <Modal show={open} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editing ? 'Цэс засах' : 'Цэс нэмэх'} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Нэр</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Нэр" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Холбоос</Form.Label>
                        <Form.Control value={link} onChange={(e) => setLink(e.target.value)} type="text" placeholder="Холбоос" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Бай</Form.Label>
                        <Form.Control value={target} onChange={(e) => setTarget(e.target.value)} as="select">
                            <option>_blank</option>
                            <option>_self</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check checked={hasChildren} onChange={(e) => setHasChildren(!hasChildren)} type="checkbox" label="Дэд цэстэй" />
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Хаах
                    </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Хадгалах
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MenuForm;
