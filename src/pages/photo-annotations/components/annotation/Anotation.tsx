import S from './/anotation.module.scss';
import { FaRegTrashAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import { textModifier } from '~/pages/photo-annotations/utils/textCutter';
import { AnnotationPropsTypes, AnnotationType } from '~/pages/photo-annotations/types/types';
import { AnnotationConstants } from '../../constants/componentConstants';

export const Annotation: React.FC<AnnotationPropsTypes> = React.memo(({ message, deleteAnnotation }) => {
  let [clickedComentID, setClickedComentID] = useState('');
  const messageContainerStyle = { top: `${message.annotation.pos?.y}%`, left: `${message.annotation.pos?.x}%` };
  const messageContainerClassName = `${S.editable_spanWrapper} ${clickedComentID === message.annotation.id ? S.extended_window : ''}`;
  const onMessageClickHandler = (event: any) => {
    event.stopPropagation();
    if (clickedComentID !== message.annotation.id && message.annotation.comment.length > AnnotationConstants.clearedAnnotationTextLength) {
      setClickedComentID(message.annotation.id);
    } else {
      setClickedComentID('');
    }
  };
  const onDeleteAnnotation = () => {
    deleteAnnotation(message.annotation.id);
  };

  return (
    <div className={messageContainerClassName}
         style={messageContainerStyle}
         onClick={onMessageClickHandler}
    >
      <div className={S.span_wrapperInner}>
        <div className={S.user_avatar}>{AnnotationConstants.shortNameFromAvatar}</div>
        <div className={S.text_container}>
          <p className={S.anotation_author}>{message.annotation.author}</p>
          <span className={S.anotation_text}>
            {clickedComentID === message.annotation.id ?
              message.annotation.comment :
              textModifier(message.annotation.comment)}
          </span>
        </div>
      </div>
      <FaRegTrashAlt className={S.icon_delete}
                     onClick={onDeleteAnnotation} />
    </div>
  );
});


