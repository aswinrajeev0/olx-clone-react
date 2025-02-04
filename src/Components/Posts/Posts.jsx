import React, { useEffect, useContext, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';
import Heart from '../../assets/Heart';
import './Posts.css';
import { FirebaseContext } from '../../store/Context';

function Posts() {

    const navigate = useNavigate()

    const { db } = useContext(FirebaseContext)
    const [products, setProducts] = useState([])
    const { setPostDetails } = useContext(PostContext)

    useEffect(() => {
        async function fetchAllProducts() {
            const collectionRef = collection(db, 'products');
            try {
                const querySnapshot = await getDocs(collectionRef);
                const productsList = querySnapshot.docs.map(docSnap => ({
                    id: docSnap.id,
                    ...docSnap.data()
                }));
                setProducts(productsList)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllProducts()
    }, [])

    return (
        <div className="postParentDiv">
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                <div className="cards">
                    {
                        products.map((product) => {
                            return (
                                <div className="card" key={product.id} onClick={() => {
                                    setPostDetails(product);
                                    navigate('/view')
                                }}>
                                    <div className="favorite">
                                        <Heart></Heart>
                                    </div>
                                    <div className="image">
                                        <img src={product.url} alt="" />
                                    </div>
                                    <div className="content">
                                        <p className="rate">&#x20B9; {product.price}</p>
                                        <span className="kilometer">{product.category}</span>
                                        <p className="name">{product.name}</p>
                                    </div>
                                    <div className="date">
                                        <span>{product.createdAt}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="recommendations">
                <div className="heading">
                    <span>Fresh recommendations</span>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="favorite">
                            <Heart></Heart>
                        </div>
                        <div className="image">
                            <img src="../../../Images/R15V3.jpg" alt="" />
                        </div>
                        <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name"> YAMAHA R15V3</p>
                        </div>
                        <div className="date">
                            <span>10/5/2021</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;