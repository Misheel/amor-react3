import React, { useState, useEffect } from 'react';

function MenuCategory() {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    function loadCategories() {
        
        fetch('/api/menuCategory/list')
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
        loadCategories();
    }, []);

    function editCategory(id, name) {        
        const newName = window.prompt('Ангиллын нэр?', name);

        if (newName) {

            setLoading(true);
            fetch('/api/menuCategory/update/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newName })
            }).then(function (response) {
                if (response.ok) {                    
                    loadCategories();                    
                }                
            })


        }


    }

    function deleteCategory(id) {
        if (window.confirm("Устгах уу?")) {
            setLoading(true);
            fetch('/api/menuCategory/delete/' + id, {
                method: 'POST'
            }).then(function (response) {
                if (response.ok) {                    
                    loadCategories();                    
                }                
            })
        }
    }

    function addNew() {
        const name = window.prompt('Ангиллын нэр?', '');
        if (name) {
            setLoading(true);
            fetch('/api/menuCategory/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name })
            }).then(function (response) {
                if (response.ok) {                    
                    loadCategories();                    
                }                
            })


        }
    }

    return (
        <React.Fragment>
            <div className="container" style={{ maxWidth: 600 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                    <h1>Цэсний ангилал</h1>
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
                                            <td style={{ width: 1, whiteSpace: 'nowrap' }}>
                                                <button className="btn btn-outline-secondary" onClick={() => editCategory(item.id, item.name)}>Засах</button>
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
                    <div class="spinner-grow" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            }



        </React.Fragment>
    );
}

export default MenuCategory;
