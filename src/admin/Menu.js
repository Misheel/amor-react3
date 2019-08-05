import React, { useState, useEffect } from 'react';
import MenuForm from './MenuForm';

function Menu({ match }) {

    const categoryId = match.params.categoryId;

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);

    function loadMenus() {
        fetch('/api/menu/listByCategoryId?id=' + categoryId)
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
        loadMenus();
    }, []);

    function handleClose() {
        setFormOpen(false);
    }

    function handleSave() {
        setFormOpen(false);
        loadMenus();
    }

    return (
        <React.Fragment>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                    <h1>Цэс</h1>
                    <button type="button" className="btn btn-primary" onClick={() => setFormOpen(true)}>Шинэ</button>
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
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>

            <MenuForm open={formOpen} onClose={handleClose} categoryId={categoryId} onSave={handleSave}/>
                            
        </React.Fragment>
    );
}

export default Menu;
