import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Post({ match }) {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState();

    function loadPosts() {                
        fetch('/api/post/list')
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
        loadPosts();        
    }, []);
    

    function editMenu(id) {
        setEditing(id);        
    }

    function deleteMenu(id) {
        if (window.confirm("Устгах уу?")) {
            setLoading(true);
            fetch('/api/post/delete/' + id, {
                method: 'POST'
            }).then(function (response) {
                if (response.ok) {
                    loadPosts();
                }
            })
        }
    }

    return (
        <React.Fragment>
            <div className="container" style={{ maxWidth: 700 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>                    
                    <h1>Нийтлэл</h1>                                        
                    <Link to={'/admin/post/new'} className="btn btn-primary" >Шинэ</Link>
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
                                                {item.name}
                                            </td>
                                            <td style={{ width: 1, whiteSpace: 'nowrap' }}>
                                                <Link to={`/admin/post/edit/${item.id}`} className="btn btn-outline-secondary">Засах</Link>
                                                {' '}
                                                <button className="btn btn-outline-danger" onClick={() => deleteMenu(item.id)} >Устгах</button>                                                
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                }
            </div>            
        </React.Fragment>
    );
}

export default Post;
