import React, {useState, useEffect} from 'react';

function Menu({match}) {    

    const categoryId = match.params.categoryId;

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    function loadMenus() {        
        fetch('/api/menu/listByCategoryId?id='+categoryId)
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

    return (
        <React.Fragment>
            <div className="container">
                <h1>Цэс</h1>

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
        </React.Fragment>
    );
}

export default Menu;
