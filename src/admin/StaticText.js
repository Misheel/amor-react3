import React, { useState, useEffect } from 'react';

function StaticText() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    function loadTexts() {        
        fetch('/api/staticText/list')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setList(data);
                setLoading(false);
            });
    }

    useEffect(() => {        
        setLoading(true);
        loadTexts();
    }, []);

    function editText(id, text) {        
        const newText = window.prompt('Бичвэр?', text ? text : '');

        if (newText) {
            setLoading(true);
            fetch('/api/staticText/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, text: newText })
            }).then(function (response) {
                if (response.ok) {                    
                    loadTexts();                    
                }                
            })
        }
    }

    function deleteCategory(id) {
        if (window.confirm("Устгах уу?")) {
            setLoading(true);
            fetch('/api/staticText/delete/' + id, {
                method: 'POST'
            }).then(function (response) {
                if (response.ok) {                    
                    loadTexts();                    
                }                
            })
        }
    }

    function addNew() {
        const name = window.prompt('Нэр?', '');
        if (name) {
            setLoading(true);
            fetch('/api/staticText/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name })
            }).then(function (response) {
                if (response.ok) {                    
                    loadTexts();                    
                }                
            })
        }
    }

    return (
        <React.Fragment>
            <div className="container" style={{ maxWidth: 600 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                    <h1>Бичвэр</h1>
                    <button type="button" className="btn btn-primary" onClick={addNew}>Шинэ</button>
                </div>

                {
                    list.length === 0
                        ?
                        <h1 className="text-center text-muted">Мэдээлэл олдсонгүй</h1>
                        :
                        <table className="table table-bordered">
                            <tbody>
                                {
                                    list.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.text}</td>
                                            <td style={{ width: 1, whiteSpace: 'nowrap' }}>
                                                <button className="btn btn-outline-secondary" onClick={() => editText(item.id, item.text)}>Засах</button>
                                                {' '}
                                                <button className="btn btn-outline-danger" onClick={() => deleteCategory(item.id)} >Устгах</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }



            </div>

            {
                loading &&
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }



        </React.Fragment>
    );
}

export default StaticText;
