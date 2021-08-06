import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


function AddImage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [error, setError] = useState([]);
    const history = useHistory();


   async function saveData()
    {
       //  console.log(title,description,file)

       const formData = new FormData();
       formData.append('title', title);
       formData.append('description', description);
       formData.append('file', file);

       let result = await fetch("http://localhost:8000/api/saveImage", {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(response => {
            // console.log(response.statusCode)

            if (response.statusCode === 422) {
                // alert('failed')
                // console.log(response.validate_err);
                setError(response.validate_err)

            } else if (response.statusCode === 200) {
                // alert('success')
                console.log(response);
                swal({
                    title: "Success !",
                    text: response.message,
                    icon: "success",
                    button: "OK!",
                });

                setError("")
                setTitle("")
                setDescription("")
                history.push('/');
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
                            <h4> Add New Gallery
                                <Link to="/" className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h4>
                        </div>

                        <div className="card-body">
                            
                            <div className="form-group mb-3">
                                <label>Image Title</label>
                                <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" name="title" className="form-control" placeholder="Enter Image Title" />
                                <span className="text-danger">{error.title}</span>
                            </div>

                            <div className="form-group mb-3">
                                <label>Image Description</label>
                                <input value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" name="description" className="form-control" placeholder="Enter Image Description" />
                                <span className="text-danger">{error.description}</span>
                            </div>

                            <div className="form-group mb-3">
                                <label> Choose Image</label>
                                <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" name="file" className="form-control"/>
                                <span className="text-danger">{error.file}</span>
                            </div>

                            <div className="form-group mb-3">
                                <button onClick={saveData} className="btn btn-primary"> Submit </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddImage;