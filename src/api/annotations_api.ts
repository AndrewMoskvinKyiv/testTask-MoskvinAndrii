import axios from 'axios'
import { AnnotationMessageType } from '~/pages/photo-annotations/types/types';


const settings = {
  withCredentials: true,

}
const instance = axios.create({
  baseURL: 'http://localhost:3000/annotations/',
  ...settings
})

// api

export const annotationsAPI = {
  getAnnotations() {
    const promise = instance.get('v1/annotations');
    return promise;
  },
  createAnnotation(annotation: AnnotationMessageType) {
    const promise = instance.post('v1/annotations', {annotation});
    return promise;
  },
  deleteAnnotation(id: string) {
    const promise = instance.delete(`v1/annotations/${id}`);
    return promise;
  },

}
