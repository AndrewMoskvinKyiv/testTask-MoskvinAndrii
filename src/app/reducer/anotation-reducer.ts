import { annotationsAPI } from '~/api/annotations_api';
import { Dispatch } from 'redux';
import { AnnotationType, AnnotationMessageType } from '~/pages/photo-annotations/types/types';



const initialState: Array<AnnotationType> = [];

export const annotationReducer = (state: Array<AnnotationType> = initialState, action: ActionsType): Array<AnnotationType> => {

  switch (action.type) {
    case 'SET-ANNOTATIONS':
      return action.annotations.map(an => ({ ...an }));
    case 'ADD-ANNOTATION':
      return [{ ...action.annotation }, ...state];
    case 'REMOVE-ANNOTATION':
      return state.filter(anot => anot.annotation.id !== action.id);
    default:
      return state;
  }
};
const checkAnnotationsObjectStructure = (annotations: any) => {
  let newAnnotationArray: Array<AnnotationType> = [];
  if (Object.keys(annotations[0]).includes('annotationId')) {
    annotations.forEach((element: AnnotationType, index: number) => {
      let obj = {
        annotation: { ...element.annotation },          //ToDo: тут анализируем массив пришедший с бекенда,
                                                        //ToDo: так как у него может быть две разные структуры: Array<AnnotationType> или Array<AnnotationMessageType>
        annotationId: 'v1',
        id: element.id,
      };
      newAnnotationArray.push(obj);
    });
    return newAnnotationArray;
  }

  annotations.forEach((element: AnnotationMessageType, index: number) => {
    let obj = {
      annotation: { ...element, pos: { x: element.pos.x * 100, y: element.pos.y * 100 } },
      annotationId: 'v1',
      id: index,
    };
    newAnnotationArray.push(obj);
  });
  return newAnnotationArray;

};
// actions
export const removeAnnotationAC = (id: string) => ({ type: 'REMOVE-ANNOTATION', id } as const);
export const addAnnotationAC = (annotation: AnnotationType) => ({ type: 'ADD-ANNOTATION', annotation } as const);
export const setAnnotationsAC = (annotations: Array<AnnotationType>) => ({
  type: 'SET-ANNOTATIONS',
  annotations: checkAnnotationsObjectStructure(annotations),
} as const);

// thunks
export const fetchAnnotationsTC = () => {
  return (dispatch: ThunkDispatch) => {
    annotationsAPI.getAnnotations()
      .then((data) => {
        dispatch(setAnnotationsAC(data.data));
      });
  };
};
export const removeAnnotationTC = (annotationId: string) => {
  return (dispatch: ThunkDispatch) => {
    dispatch(removeAnnotationAC(annotationId));
    // annotationsAPI.deleteAnnotation(annotationId) ToDo: цей запит в мене не працює. Як я не пробував, я так і не зміг видалити повідомлення
    //   .then((res) => {
    // dispatch(removeAnnotationAC(annotationId))
    //   })
  };
};
export const addAnnotationTC = (payload: AnnotationMessageType) => {
  return (dispatch: ThunkDispatch) => {
    annotationsAPI.createAnnotation(payload)
      .then((data) => {
        dispatch(addAnnotationAC(data.data));

      });
  };
};


// types

export type AddAnnotationActionType = ReturnType<typeof addAnnotationAC>;
export type RemoveAnnotationActionType = ReturnType<typeof removeAnnotationAC>;
export type SetAnnotationActionType = ReturnType<typeof setAnnotationsAC>;
type ActionsType = AddAnnotationActionType | RemoveAnnotationActionType | SetAnnotationActionType

type ThunkDispatch = Dispatch<ActionsType>
