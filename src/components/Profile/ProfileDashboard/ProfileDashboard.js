import React, { useEffect, useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import ProfileEdiltModal from '../ProfileEditModal/ProfileEdiltModal';
import { getUserId } from '../../../utils';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase';
import ImageUploading from 'react-images-uploading';
import './ProfileDashboard.css';
import { Success } from '../../../assets/Icons';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { RiImageEditLine } from 'react-icons/ri';

const ProfileDashboard = () => {
  const [images, setImages] = useState([]);
  const [isModalShowed, setIsModalShowed] = useState(false);
  const [isSuccessShowed, setIsSuccessShowed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { client } = useChatContext();

  useEffect(() => {
    const getAvatar = async () => {
      const userInfo = await getDoc(doc(db, 'users', getUserId()));

      const { images } = userInfo.data();

      setImages(JSON.parse(images));
    };

    getAvatar();
  }, []);

  const showSuccessMsg = () => {
    setIsSuccessShowed(true);

    setTimeout(() => setIsSuccessShowed(false), 3000);
  };

  const showEditModal = () => {
    setIsModalShowed(true);
  };

  const changeAvatar = imageList => {
    setImages(imageList);
    sendImages(imageList);
  };

  //send to firebase
  const sendImages = imageList => {
    updateDoc(doc(db, 'users', getUserId()), {
      images: JSON.stringify(imageList),
    });

    const updateUserImage = async () => {
      await client.upsertUser({
        id: 'hyodduru',
        image: imageList[1]?.dataURL,
      });
    };

    updateUserImage();

    localStorage.setItem('avatar', imageList[1]?.dataURL);
  };

  return (
    <div className="profile-dashboard">
      <ProfileEdiltModal
        isModalShowed={isModalShowed}
        setIsModalShowed={setIsModalShowed}
        showSuccessMsg={showSuccessMsg}
      />
      <div className={isSuccessShowed ? 'success__msg show' : 'success__msg'}>
        <Success />
        <span>The change has been updated</span>
      </div>

      <ImageUploading multiple value={images} onChange={changeAvatar}>
        {({ imageList, onImageUpdate }) => (
          <>
            <div className="dashboard-background">
              {imageList[0] ? (
                <img src={imageList[0].dataURL} alt="background" />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1554034483-04fda0d3507b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="background"
                />
              )}

              <button
                className="background__edit__btn"
                onClick={() => onImageUpdate(0)}
              >
                <RiImageEditLine />
              </button>
            </div>
            <div className="avatar">
              {imageList[1] ? (
                <img
                  className="avatar__img"
                  src={imageList[1]?.dataURL}
                  alt="avatar"
                />
              ) : (
                <FaUserAlt className="basic__user" />
              )}

              <button
                className="avatar__edit__btn"
                onClick={() => onImageUpdate(1)}
              >
                <RiImageEditLine />
              </button>
            </div>
          </>
        )}
      </ImageUploading>

      <div className="userInfo">
        <div className="userInfo__name">{getUserId()}</div>
        <div className="userInfo__company">Neptune Cloud</div>
        <div className="userInfo__description">
          {isEditing ? (
            <textarea placeholder="Description comes here" />
          ) : (
            'Description comes here'
          )}
          <button
            className="description__edit__btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            <AiOutlineEdit />
          </button>
        </div>
      </div>
      <button className="profile__edit__btn" onClick={showEditModal}>
        <AiOutlineEdit />
        Edit profile
      </button>
    </div>
  );
};

export default ProfileDashboard;
