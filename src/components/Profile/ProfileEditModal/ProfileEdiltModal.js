import React, { useEffect, useState } from 'react';
import { getUserId } from '../../../utils';
import CountryCodes from './CountryCodes/CountryCodes';

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../service/firebase';

import { Close } from '../../../assets/Icons';
import './ProfileEdiltModal.css';

const ProfileEdiltModal = ({
  isModalShowed,
  setIsModalShowed,
  showSuccessMsg,
}) => {
  const [editedUserInfo, setEditedUserInfo] = useState({
    userName: '',
    countrycode: '',
    phone: '',
    email: '',
  });
  const { userName, countrycode, phone, email } = editedUserInfo;
  const [clickedInput, setIsClickedInput] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getDoc(doc(db, 'users', getUserId()));

      const { user_name, email, phone, country_code } = userInfo.data();

      setEditedUserInfo(
        editedUserInfo =>
          (editedUserInfo = {
            ...editedUserInfo,
            userName: user_name,
            countrycode: country_code || '82',
            email: email || '',
            phone: phone || '',
          })
      );
    };

    getUserInfo();
  }, []);

  const closeEditModal = () => {
    setIsModalShowed(false);
  };

  const handleEditedUserInfo = e => {
    const { value, name } = e.target;
    const regex = /^[0-9]+$/g;
    if (name === 'phone' && !regex.test(value)) return;

    setEditedUserInfo({ ...editedUserInfo, [name]: value });
  };

  const handleClickedInput = e => {
    const { id } = e.target;
    setIsClickedInput(id);
  };

  const submitUserInfo = () => {
    updateDoc(doc(db, 'users', getUserId()), {
      user_name: userName,
      country_code: countrycode,
      phone,
      email,
    });

    showSuccessMsg();
    closeEditModal();
  };

  return (
    <div
      className={isModalShowed ? 'profileEditModal show' : 'profileEditModal'}
    >
      <div className="modal__box">
        <header>
          <button className="btn__close" onClick={closeEditModal}>
            <Close />
          </button>
          <div className="header__title"> Edit Profile</div>
          <div className="header__line" />
        </header>
        <form className="edit__form" onSubmit={e => e.preventDefault()}>
          <label htmlFor="name">Name</label>
          <input
            id=" name"
            name="userName"
            placeholder={userName}
            value={userName}
            onChange={handleEditedUserInfo}
          />
          <label htmlFor="company">Company</label>
          <input
            id=" company"
            name="company"
            placeholder="Neptune Cloud Inc."
            disabled
          />
          <label htmlFor="phone">Phone</label>
          <div className="editable">
            <CountryCodes
              handleEditedUserInfo={handleEditedUserInfo}
              countryCode={countrycode}
            />
            <input
              name="phone"
              type="text"
              placeholder={phone || '010-0000-0000'}
              maxLength="11"
              value={phone || ''}
              onChange={handleEditedUserInfo}
              disabled={clickedInput !== 'phone'}
            />
            <button
              id="phone"
              className="btn__edit"
              onClick={handleClickedInput}
            >
              Edit
            </button>
          </div>
          <label htmlFor="email">Email</label>
          <div className="editable">
            <input
              name="email"
              placeholder={email || 'please write your email.'}
              value={email || ''}
              onChange={handleEditedUserInfo}
              disabled={clickedInput !== 'email'}
            />
            <button
              id="email"
              className="btn__edit"
              onClick={e => {
                handleClickedInput(e);
              }}
            >
              Edit
            </button>
          </div>
          <div className="bottom__line" />
          <div className="btns">
            <button className="btn__cancel" onClick={closeEditModal}>
              Cancel
            </button>
            <button className="btn__save" onClick={submitUserInfo}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdiltModal;
