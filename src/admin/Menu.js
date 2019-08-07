import React, { useState, useEffect } from 'react';
import MenuForm from './MenuForm';
import { Link } from "react-router-dom";

function Menu({ match }) {

    const categoryId = match.params.categoryId;
    const parentId = match.params.parentId;

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [category, setCategory] = useState();
    const [parent, setParent] = useState();
    const [editing, setEditing] = useState();

    function loadMenus() {
        let path = '/api/menu/listByCategoryId?id=' + categoryId;
        if (parentId) {
            path = '/api/menu/listByParentId?id=' + parentId;
        }
        fetch(path)
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
        fetch('/api/menuCategory/read/' + categoryId)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setCategory(data);
            });

        if (parentId) {
            fetch('/api/menu/read/' + parentId)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    setParent(data);
                });
        }
        else {
            setParent(null);
        }
    }, [categoryId, parentId]);

    function handleClose() {
        setFormOpen(false);
        setEditing(null);
    }

    function handleSave() {
        setFormOpen(false);
        loadMenus();
        setEditing(null);
    }

    function editMenu(id) {
        setEditing(id);
        setFormOpen(true);
    }

    function deleteMenu(id) {
        if (window.confirm("Устгах уу?")) {
            setLoading(true);
            fetch('/api/menu/delete/' + id, {
                method: 'POST'
            }).then(function (response) {
                if (response.ok) {
                    loadMenus();
                }
            })
        }
    }

    function moveUp(index) {
        if (index>0){
            const targetIndex = index - 1;
            let newList = [...list];
            const temp = newList[index];
            newList[index] = newList[targetIndex];
            newList[targetIndex] = temp;
            setList(newList);

            let params = newList.map((item, index) => `${item.id}=${index}`);
                        
            fetch('/api/menu/sort?' + params.join('&'), {
                method: 'POST'
            }).then(function (response) {
                if (response.ok) {
                    loadMenus();
                }
            })
        }        
    }

    function moveDown(index) {
        if (index<list.length-1){
            const targetIndex = index + 1;
            let newList = [...list];
            const temp = newList[index];
            newList[index] = newList[targetIndex];
            newList[targetIndex] = temp;
            setList(newList);

            let params = newList.map((item, index) => `${item.id}=${index}`);
                        
            fetch('/api/menu/sort?' + params.join('&'), {
                method: 'POST'
            }).then(function (response) {
                if (response.ok) {
                    loadMenus();
                }
            })
        }        
    }


    return (
        <React.Fragment>
            <div className="container" style={{ maxWidth: 700 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                    {
                        parent 
                        ?
                        <>
                            <Link to={parent.parentId ?  `/admin/menu/${categoryId}/${parent.parentId}` : `/admin/menu/${categoryId}`}>Буцах</Link>
                            <h1>{parent ? parent.name : '...'}</h1>
                        </>
                        :
                        <h1>{category ? category.name : '...'}</h1>
                    }
                    
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
                                    list.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>                                                
                                                {
                                                    item.hasChildren
                                                        ?
                                                        <Link to={`/admin/menu/${categoryId}/${item.id}`}>{item.name}</Link>
                                                        :
                                                        item.name
                                                }
                                            </td>
                                            <td style={{ width: 1, whiteSpace: 'nowrap' }}>
                                                <button className="btn btn-outline-secondary" onClick={() => editMenu(item.id)}>Засах</button>
                                                {' '}
                                                <button className="btn btn-outline-danger" onClick={() => deleteMenu(item.id)} >Устгах</button>
                                                {' '}
                                                <button className="btn btn-outline-secondary"  disabled={index===0} onClick={() => moveUp(index)} >↑</button>
                                                {' '}
                                                <button className="btn btn-outline-secondary" disabled={index===list.length-1} onClick={() => moveDown(index)} >↓</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>

            <MenuForm parentId={parentId} open={formOpen} onClose={handleClose} categoryId={categoryId} onSave={handleSave} editing={editing} />

        </React.Fragment>
    );
}

export default Menu;
