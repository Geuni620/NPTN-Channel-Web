import React, { useCallback, useContext, useState } from 'react';
import { ImageDropzone } from 'react-file-utils';
import {
  UploadsPreview,
  useChannelStateContext,
  useChatContext,
  useMessageInputContext,
  ChatAutoComplete,
  EmojiPicker,
} from 'stream-chat-react';

import './TeamMessageInput.css';

import { TeamTypingIndicator } from '../../ChannelListContainer/TeamChannel/TeamTypingIndicator';
import { GiphyContext } from '../Channel/ChannelInner';

import { Vector, PaperClip, Camera, EmojiIcon } from '../../../assets/Icons';

export const TeamMessageInput = props => {
  const { pinsOpen } = props;
  const { giphyState, setGiphyState } = useContext(GiphyContext);

  const { acceptedFiles, channel, maxNumberOfFiles, multipleUploads, thread } =
    useChannelStateContext();

  const { client } = useChatContext();
  const [boldState, setBoldState] = useState(false);
  const [codeState, setCodeState] = useState(false);
  const [italicState, setItalicState] = useState(false);
  const [strikeThroughState, setStrikeThroughState] = useState(false);

  const getPlaceholder = () => {
    if (channel.type === 'team') {
      return `#${channel.data.name || channel.data.id || 'random'}`;
    }

    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    if (!members.length || members.length === 1) {
      return members[0]?.user.name || members[0]?.user.id || `Keunhwee`;
    }

    return `the group`;
  };

  const messageInput = useMessageInputContext();

  const onChange = useCallback(
    e => {
      const { value } = e.target;
      const deletePressed =
        e.nativeEvent?.inputType === 'deleteContentBackward';

      if (messageInput.text.length === 1 && deletePressed) {
        setGiphyState(false);
      }

      if (
        !giphyState &&
        messageInput.text.startsWith('/giphy') &&
        !messageInput.numberOfUploads
      ) {
        e.target.value = value.replace('/giphy', '');
        setGiphyState(true);
      }

      if (boldState) {
        if (deletePressed) {
          e.target.value = `${value.slice(0, value.length - 2)}**`;
        } else {
          e.target.value = `**${value.replace(/\**/g, '')}**`;
        }
      } else if (codeState) {
        if (deletePressed) {
          e.target.value = `${value.slice(0, value.length - 1)}\``;
        } else {
          e.target.value = `\`${value.replace(/`/g, '')}\``;
        }
      } else if (italicState) {
        if (deletePressed) {
          e.target.value = `${value.slice(0, value.length - 1)}*`;
        } else {
          e.target.value = `*${value.replace(/\*/g, '')}*`;
        }
      } else if (strikeThroughState) {
        if (deletePressed) {
          e.target.value = `${value.slice(0, value.length - 2)}~~`;
        } else {
          e.target.value = `~~${value.replace(/~~/g, '')}~~`;
        }
      }

      messageInput.handleChange(e);
    },
    [
      boldState,
      codeState,
      giphyState,
      italicState,
      messageInput,
      setGiphyState,
      strikeThroughState,
    ]
  );

  const GiphyIcon = () => (
    <div className="giphy-icon__wrapper">
      <p className="giphy-icon__text">GIPHY</p>
    </div>
  );

  return (
    <div
      className={`team-message-input__wrapper ${
        (!!thread || pinsOpen) && 'thread-open'
      }`}
    >
      <ImageDropzone
        accept={acceptedFiles}
        handleFiles={messageInput.uploadNewFiles}
        multiple={multipleUploads}
        disabled={
          (maxNumberOfFiles !== undefined &&
            messageInput.numberOfUploads >= maxNumberOfFiles) ||
          giphyState
        }
      >
        <div className="team-message-input__input">
          <div className="team-message-input__top">
            {giphyState && !messageInput.numberOfUploads && <GiphyIcon />}
            <UploadsPreview />
            <ChatAutoComplete
              onChange={onChange}
              placeholder={`Message ${getPlaceholder()}`}
            />
            <div
              className="team-message-input__button"
              role="button"
              aria-roledescription="button"
              onClick={messageInput.handleSubmit}
            >
              <Vector />
            </div>
          </div>
          <div className="team-message-input__bottom">
            <div className="team-message-input__icons">
              <EmojiIcon openEmojiPicker={messageInput.openEmojiPicker} />
              <div className="team-message-input__icons--left">
                <Camera />
                <PaperClip />
              </div>
            </div>
          </div>
        </div>
        <EmojiPicker />
      </ImageDropzone>
      <TeamTypingIndicator type="input" />
    </div>
  );
};
