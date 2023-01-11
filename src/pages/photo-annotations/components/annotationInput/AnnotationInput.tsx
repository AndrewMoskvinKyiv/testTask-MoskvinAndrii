import React, { ChangeEvent, useState } from 'react';
import S from './AnnotationInput.module.scss';
import { FaArrowRight } from 'react-icons/fa';
import { AnnotationInputPropsType } from '~/pages/photo-annotations/types/types';


export const AnnotationInput: React.FC<AnnotationInputPropsType> = React.memo(
  ({ sentAnnotationText }) => {

    const [comment, setComment] = useState('');

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setComment(e.currentTarget.value);
    };
    const sendComment = () => {
      sentAnnotationText(comment);
      setComment('');
    };

    return (<div className={S.create_anotContainer}>
      <div className={S.create_anotInner}>
        <input className={S.input_title}
               value={comment}
               type='text'
               placeholder={'Leave a comment'}
               onChange={changeTitle} autoFocus />
        <FaArrowRight className={S.input_icon} onClick={sendComment} />
      </div>
    </div>);
  });
