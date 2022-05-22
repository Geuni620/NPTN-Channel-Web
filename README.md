# WECODE 기업협업

### 참여대상

- 김효정, 이근휘

### 사용한 Package

- NPM(8.5.0)
- node(16.14.2)
- react
- react-router-dom
- react-redux
- getstream
- eslint
- prettier

### 컨벤션 정리

- 최상단 CSS class명은 소문자
- git rebase 사용

### [CSS property 순서]

1. Layout Properties (position, float, clear, display)

2. Box Model Properties (width, height, margin, padding)
3. Visual Properties (color, background, border, box-shadow)
4. Typography Properties (font-size, font-family, text-align, text-transform)
5. Misc Properties (cursor, overflow, z-index)

### [Import property 순서]

1. React 패키지

2. 외부 라이브러리
3. 컴포넌트
4. 함수, 변수 및 설정 파일
5. 사진 등 미디어 파일
6. CSS 파일

#### 1. firebase auth를 활용한 구글 소셜 로그인 기능 구현
* firebase와 연동하여 구글 소셜 로그인 구현.
* firebase/auth 내에 내장되어있는 GoogleAuthProvider, signInWithPopup 활용
* firebase setting 초기화 부분 firebase.js 내에서 따로 관리
#### 2. 채팅방 리스트 조회 및 검색 기능
* getStream API에서 제공하는 Team collaboration을 참고하여 구현함
* channelSearch에 아이디를 검색하면 list가 뜨고 선택했을 시 chat창을 띄워줌
#### 3. 채팅방 만들기 기능
* getstream api에서 제공하는 ChannelContainer 및 Channel Component 활용 
* 채팅방 리스트에서 채팅방 클릭시 해당하는 채팅방 보여줌  
#### 4. 채팅방에서 채팅 기능 구현
* user의 Id와 token을 가지고 채팅할 수 있는 권한을 갖는 user instance를 만들어주는 connectUser을 활용함. (getstream api 자체 제공)
#### 5. 연락처 조회 및 검색 기능
* getstream api 내의 queryUsers와 사용자의 id값을 활용하여 연락처 리스트를 가져옴. 
* useState hook을 활용하여 해당 리스트를 state에 저장 및 렌더링. 
* 불필요하게 매번 글자를 입력할 때마다 정보를 요청하지 않도록 debounce 기능 추가
#### 6. 연락처 친구 추가 기능 
* 추가하고 싶은 user의 아이디 input에 입력 시 firestore에 해당 정보 (onChange event, useState hook 활용)
* firestore내에 저장된 정보들을 불러와 해당하는 아이디 값을 활용하여 getstream api에 해당 아이디 값에 해당하는 유저 목록들을 받아옴.
* user id가 getstream에 존재하지 않을 시 alert 창으로 알림, 존재하여 추가가 되었을 시 성공 메세지 알림
#### 7. 프로필 조회 기능 
* google social login시 해당하는 user의 Id값과 이름을 firestore base에 전송함. 전송된 data를 프로필을 조회할 때 불러옴. 
#### 8. 프로필 사진 및 개인 정보 수정 기능 
* 프로필 수정 모달창에서 수정된 유저정보 저장시 firestore database로 해당 정보 전송
* react-images-uploading library 활용하여 프로필 및 배경화면 수정 기능 구현 - firestore database로 해당 정보 전송
#### 9. Firebase Firestore User Document 생성 및 데이터 통신 기능 
* users 라는 collection 내에 user id 값을 가진 document들로 데이터베이스 관리 
#### 10. 채팅방 삭제 기능 (추가기능) 
* Chatlist hover시 삭제 버튼 생성
* 삭제 버튼 클릭시 채널 리스트에서 삭제 기능 구현 (onClick event 및 getStream api의 delete method 활용)
#### 11. 프로필에 chat 버튼 클릭 시 1대1 채팅방 생성 (추가기능) 
* getstream api에서 제공하는 Chat, Channel, ChannelInput, MessageList, MessageInput 컴포넌트 활용
* channel.watch() 활용하여 클릭한 user와 나의 채팅방 생성
* onclick event 활용 

