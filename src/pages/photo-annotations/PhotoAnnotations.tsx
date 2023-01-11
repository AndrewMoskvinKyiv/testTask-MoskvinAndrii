import React, { useEffect, useState, FC, useCallback } from 'react';
import S from './annotations.module.scss';
import litak from './assets/літакМАУ.jpg';
import { AnnotationInput } from '~/pages/photo-annotations/components/annotationInput/AnnotationInput';
import { mousePositionCounter } from '~/pages/photo-annotations/utils/mousePositionCalculator';
import { Annotation } from '~/pages/photo-annotations/components/annotation/Anotation';
import { AppRootStateType } from '~/app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAnnotationTC,
  fetchAnnotationsTC,
  removeAnnotationTC,
} from '~/app/reducer/anotation-reducer';
import {
  AnnotationType,
  PhotoAnnotationsProps,
  WheelDirection,
  MousePos, emptyAnnotation,
} from './types/types';
import uuid from 'react-uuid';
import { AnnotationInputConstants } from '~/pages/photo-annotations/constants/componentConstants';

export const PhotoAnnotations: FC<PhotoAnnotationsProps> = () => {
  const [scrollApproved, setScrollApproved] = useState(false);
  const [scrollIn, setScrollIn] = useState(700);
  const [wheelDirection, setWheelDirection] = useState<WheelDirection>('');
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });
  const [startNewAnnotation, setStartNewAnnotation] = useState(false);

  const positionOfNewAnnotation = { top: `${mousePos.y}%`, left: `${mousePos.x}%`, opacity: `${startNewAnnotation ? 100 : 0}`}

  const annotations = useSelector<AppRootStateType, Array<AnnotationType>>(state => state.annotations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnotationsTC());
    }, []);

  const deleteAnnotation = (id:string) => {
    dispatch(removeAnnotationTC(id))
  }
  const onPictureClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (!startNewAnnotation) {
      mousePositionCounter({
        event: event,
        scrollApproved: scrollApproved,
        setMousePos: setMousePos,
      });
      setStartNewAnnotation(true);
    }

  };
  const onMouseOverHandler = (toggle: boolean) => {
    setScrollApproved(toggle);
    document.body.style.overflow = toggle ? 'hidden' : 'auto';
  };
  const onWheelHandler = (event: React.WheelEvent<HTMLElement>) => {
    const scale = event.deltaY;
    setWheelDirection(scale > 0 ? 'zoomOut' : 'zoomIn');

    if (scrollApproved) {
      setScrollIn(wheelDirection === 'zoomOut' ? scrollIn - 10 : scrollIn + 10);
    }
  };



  const sentAnnotationText = (comment: string) => {
    const obj = {
      id: uuid(),
      comment: comment,
      author: AnnotationInputConstants.authorName,
      pos: {
        x: +mousePos.x.toFixed(),
        y: +mousePos.y.toFixed(),
      },
    };
    setStartNewAnnotation(false);
    dispatch(addAnnotationTC(obj));
  };




const onPictureMouseEnter = useCallback((event:any)=> {
  onMouseOverHandler(true)
}, [onMouseOverHandler])
const onPictureMouseLeave = useCallback((event:any)=> {
    onMouseOverHandler(false)
  }, [onMouseOverHandler])

  return (
    <div className={S.wrapper}>
      <div className={S.container}>
        <div className={S.photo_container}>
          <picture className={S.picture}
                   onMouseEnter={onPictureMouseEnter}
                   onMouseLeave={onPictureMouseLeave}
                   onClick={onPictureClickHandler}
                   onWheel={onWheelHandler}>
            <img src={litak} alt='litak' style={{ width: scrollIn }} />

            {annotations.length >= 0 && annotations.map((message: AnnotationType) => (
              <Annotation key={message.id}
                          message={message}
                          deleteAnnotation={deleteAnnotation} />))}

            <div className={S.editable_spanWrapper}
                 style={positionOfNewAnnotation}>

              <AnnotationInput
                sentAnnotationText={sentAnnotationText}
              />
            </div>
          </picture>
        </div>
      </div>
    </div>
  );
};
