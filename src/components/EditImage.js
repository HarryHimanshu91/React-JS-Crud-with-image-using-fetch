import { Link ,  useHistory } from 'react-router-dom';
import { useState, useEffect } from "react";
import swal from 'sweetalert';

function EditImage(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [error, setError] = useState([]);
     const history = useHistory();
    const [data, setData] = useState([]);

    useEffect(async () => {
        let result = await fetch("http://localhost:8000/api/get-image/" + props.match.params.id);
        result = await result.json();
        setData(result.data);
        setTitle(result.data.title);
        setDescription(result.data.description);
      
    }, []);


    function handleChange(e) {
        // console.log(e.target.files[0]);

           var fileInput = document.getElementById('file');
           var fileSize = document.getElementById('file').files[0];
           var filePath = fileInput.value;
           var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
           if(!allowedExtensions.exec(filePath)){
              // alert('Please upload file having extensions .jpeg/.jpg/.png only.');
               document.getElementById("imageErrorType").innerHTML="Please upload file having extensions .jpeg/.jpg/.png only.";
               document.getElementById("updateBtn").disabled=true;
               fileInput.value = '';
               return false;
           }
           else if(fileSize.size > 1048576 )   // 1 MB for bytes-> NOT MORE THAN 1 MB SIZE
           {
               document.getElementById("imageErrorType").innerHTML="Please upload file having size less than 1 MB only";
               document.getElementById("updateBtn").disabled=true;
               fileInput.value = '';
               return false;
           }
           else{

               setFile(e.target.files[0])   // set the state for imagefile
               document.getElementById("imageErrorType").innerHTML="";
               document.getElementById("updateBtn").disabled=false;
             
               //Image preview
               // if (fileInput.files && fileInput.files[0]) {
               //     var reader = new FileReader();
               //     reader.onload = function(e) {
               //         document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';
               //     };
               //     reader.readAsDataURL(fileInput.files[0]);
               // }
           }
     }

    async function updateRecord(id) {
        //  alert(id);
       
        const formData = new FormData();
       formData.append('title', title);
       formData.append('description', description);
       formData.append('file', file);

        // console.log('previous-image',file)

        let result = await fetch("http://localhost:8000/api/update-image/" + id + "?_method=PUT", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                //console.log(response.statusCode)
                // console.log(response)

                if (response.statusCode == "422") {
                    // alert('failed')
                  //  console.log(response.validate_err);
                    setError(response.validate_err)

                } else if (response.statusCode == "200") {
                    // alert('success')
                  //  console.log(response);
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
                // console.log('error', error)
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
                            <h4> Edit Image Gallery
                                <Link to="/" className="btn btn-primary btn-sm float-end"> Back </Link>
                            </h4>
                        </div>

                        <div className="card-body">
                            
                            <div className="form-group mb-3">
                                <label>Image Title</label>
                                <input  value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" name="title" className="form-control" placeholder="Enter Image Title" />
                                <span className="text-danger">{error.title}</span>
                            </div>

                            <div className="form-group mb-3">
                                <label>Image Description</label>
                                <input value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" name="description" className="form-control" placeholder="Enter Image Description" />
                                <span className="text-danger">{error.description}</span>
                            </div>

                            <div className="form-group mb-3">
                                <label> Choose Image</label>
                                <input id="file" onChange={handleChange} type="file" name="file" className="form-control"/>
                                <span className="text-danger">{error.file}</span>
                                <span id="imageErrorType" className="text-danger"></span>  <br />
                                <img style={{ width: 50 }} src={"http://127.0.0.1:8000/storage/images/gallery/" + data.file} />
                            </div>

                            <div className="form-group mb-3">
                                <button id="updateBtn" onClick={(e) => { updateRecord(data.id) }} className="btn btn-primary"> Update </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditImage;