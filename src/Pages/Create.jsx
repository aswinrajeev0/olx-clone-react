import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Components/Header/Header';
import { FirebaseContext, AuthContext } from '../store/Context';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const { storage, db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const navigate = useNavigate();

  function handleSubmit() {
    if (!image) {
      console.error("No image selected!");
      return;
    }

    const date = new Date();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(async (data) => {
        console.log("Uploaded Image URL:", data.secure_url);
        const productRef = doc(collection(db, 'products'));
        await setDoc(productRef, {
          name,
          category,
          price,
          url: data.secure_url,
          userId:user.uid,
          createdAt:date.toDateString()
        })

        navigate('/')

      })
      .catch(error => console.error("Upload Error:", error));
  }


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input className="input" type="number" id="price" name="price" value={price} onChange={e => setPrice(e.target.value)} />
          <br />
          <br />
          {image && <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)}></img>}
          <br />
          <input type="file" onChange={e => setImage(e.target.files[0])} />
          <br />
          <button className="uploadBtn" onClick={handleSubmit} >upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;