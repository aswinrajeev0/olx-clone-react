import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Components/Header/Header';

const Create = () => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
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
              onChange={e => e.target.value}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" type="number" id="price" name="price" value={price} onChange={e => setPrice(e.target.value)} />
            <br />
          </form>
          <br />
          {image && <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)}></img>}
          <form>
            <br />
            <input type="file" onChange={e => setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;