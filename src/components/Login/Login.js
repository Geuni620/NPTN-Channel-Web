import React from 'react';
import { useLocation } from 'react-router';
import { GoogleAuthProvider } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { signInWithGoogle, db } from '../../service/firebase';
import { KAKAO_AUTH_URL } from './KakaoAuth';
import { setGoogleToken, setUserName, setUserId } from '../../utils';

import './Login.css';

import { FcGoogle } from 'react-icons/fc';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

const Login = ({ setIsLogged }) => {
  const { search } = useLocation();

  const sendUserId = userId => {
    setDoc(doc(db, 'users', userId), { user_id: userId });
  };

  const handleLogin = e => {
    e.preventDefault();
    signInWithGoogle()
      .then(res => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;
        const userName = res.user.displayName;
        const userId = res.user.reloadUserInfo.email.split('@')[0];

        setGoogleToken(token);
        setUserName(userName);
        setUserId(userId);
        sendUserId(userId);
        setIsLogged(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // const sendCodeToFirebase = async () => {
  //   const accessCode = new URLSearchParams(search).get('code');
  //   const res = await fetch(
  //     `http://localhost:3002/users/kakao/callback?code=${accessCode}`
  //   );
  // };

  // useEffect(() => {
  //   sendCodeToFirebase();
  // }, []);

  return (
    <div className="login">
      <div className="login-modal">
        <h2>Login</h2>
        <form className="login-form">
          <label className="login-form__label">Email</label>
          <input
            className="login-form__input"
            type="text"
            placeholder="Type your emaill"
          />
          <label className="login-form__label">Password</label>
          <input
            className="login-form__input"
            type="password"
            placeholder="Type your password"
          />
          <button className="login-form__btn google" onClick={handleLogin}>
            <FcGoogle className="login-form__btn__icon" />
            <span className="login-form__btn__text">Sign in with Google</span>
          </button>
          <button className="login-form__btn naver" onClick={handleLogin}>
            <SiNaver className="login-form__btn__icon" />
            <span className="login-form__btn__text">Sign in with Naver</span>
          </button>
          <a className="login-form__btn kakao" href={KAKAO_AUTH_URL}>
            <RiKakaoTalkFill className="login-form__btn__icon" />
            <span className="login-form__btn__text">Sign in with Kakao</span>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
