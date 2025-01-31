import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { doc, getDoc } from 'firebase/firestore';

import './View.css';
import { PostContext } from '../../store/PostContext';
function View() {

  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)

  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    async function fetchUserDetails() {
      if (postDetails && postDetails.userId) {
        const userDocRef = doc(db, 'users', postDetails.userId)
        try {
          const userDocSnap = await getDoc(userDocRef)
          if (userDocSnap.exists()) {
            setUserDetails(userDocSnap.data());
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchUserDetails();
  }, [postDetails, db])

  if (!postDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>{userDetails.username}</p>
          <p></p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;