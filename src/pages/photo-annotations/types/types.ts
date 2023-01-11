
export type AnnotationType = {
  annotation: AnnotationMessageType,
  annotationId: string,
  id: number,
}

export type AnnotationMessageType = {
  id: string,
  author:string,
  comment: string,
  pos: {
    x: number,
    y: number,
  }
}
export type AnnotationPropsTypes = {
  message: AnnotationType,
  setMouseOverAnnotation?:(over:boolean) => void
  deleteAnnotation:(id:string) => void
}
export type AnnotationInputPropsType = {
  sentAnnotationText: (comment:string) => void

}

export const emptyAnnotation = {
  id: '',
  comment: '',
  author: '',
  pos: {
    x: 0,
    y: 0,
  },
};
export type MousePos = {
  x:number,
  y:number
}
export type WheelDirection = "" | "zoomIn" | "zoomOut"


export interface PhotoAnnotationsProps {

}
