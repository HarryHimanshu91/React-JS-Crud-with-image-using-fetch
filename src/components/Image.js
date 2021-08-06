import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


function Image() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getProductList()

    }, []);

    async function getProductList() {
        await fetch("http://localhost:8000/api/get-images")

            .then(response => response.json())
            .then(response => {
                // console.log(response)
                if(response.statusCode === 200){
                    //   console.log(response.statusCode)
                    setData(response.data);
                   
                }
               
            })
            .catch(error => {
                console.log('error', error)
                return error;
            })
    }

    
    async function deleteImage(id)
    {
       //  alert(id);
       let result = await fetch("http://localhost:8000/api/delete-image/"+id,{
           method:'DELETE'
       })
       .then(response => response.json())
       .then(response => {
           // console.log(response.statusCode)

        if (response.status === 200) {
               // alert('success')
               console.log(response);
               swal({
                   title: "Success !",
                   text: response.message,
                   icon: "success",
                   button: "OK!",
               });
               getProductList();
           }
       })
       .catch(error => {
           console.log('error', error)
           return error;
       })
   
    }

    return (
        <div className="container">
            <div className="row">

                <div className="col-md-12 py-3">
                    <h2 style={{ color: "green", textAlign: "center" }} > Laravel React JS CRUD with IMAGE  using Functional Component </h2>
                    <h2 style={{ color: "red", textAlign: "center" }} > Using Fetch Method </h2>
                </div>



                <div className="col-md-12">
                    <div className="card">

                        <div className="card-header">
                            <h4> Image Gallery Data
                                <Link to="/add-image" className="btn btn-primary btn-sm float-end"> Add New Image Data </Link>
                            </h4>
                        </div>

                        <div className="card-body">

                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th> ID </th>
                                        <th> Image Name </th>
                                        <th> Image Description </th>
                                        <th> Image </th>
                                        <th>Edit </th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item) =>

                                            <tr key={item.id}>
                                                <td>{item.id} </td>
                                                <td>{item.title} </td>
                                                <td>{item.description} </td>

                                                <td> <img style={{ width: 50 }} src={"http://127.0.0.1:8000/storage/images/gallery/" + item.file} /> </td>
                                                
                                                <td><Link to={"/edit-image/" + item.id}><span className="updateBtn">Edit</span> </Link></td>
                                                <td>
                                                <button onClick={(e) => { if (window.confirm('Delete the item?')) { deleteImage( item.id)  }}} type="button"
                                    className="btn btn-danger btn-sm" >Delete</button>
                                                   
                                                    </td>

                                            </tr>
                                        )


                                    }


                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Image;