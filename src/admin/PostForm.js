import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import CKEditor from 'ckeditor4-react';

function PostForm({ match }) {

    const id = match.params.id;

    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    function handleSubmit() {
        let form = {
            name: name,
            content: content,
        }
        let path = '/api/post/save';

        if (id) {
            form.id = id;
            path = '/api/post/update'
        }
        
        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(function (response) {
            if (response.ok) {
                window.location = '/admin/post';
            }
        })
    }

    useEffect(() => {
        fetch('/api/post/read/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (post) {                
                setName(post.name);
                setContent(post.content);
            });
    }, [id]);

    return (
        <div className="container">

            <Form>
                <Form.Group>
                    <Form.Label>Нэр</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Нэр" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Агуулга</Form.Label>
                    <CKEditor
                        data={content}
                        onChange={(e) => setContent(e.editor.getData())}
                    />
                </Form.Group>

            </Form>

            <Button onClick={handleSubmit} >Нийтлэх</Button>

        </div>
    );
}

export default PostForm;
