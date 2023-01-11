export const mousePositionCounter = ({ event, scrollApproved, setMousePos}:any) => {
  if(scrollApproved) {

    const target = event.target;
    // get space from container
    const rect = target?.getBoundingClientRect();
    const width = target.width
    const height = target.height

    // Mouse position in percents
    const x =  ((100 / width * event.clientX)  - (100/width*rect.left))
    const y =  ((100 / height * event.clientY)  - (100/height*rect.top))
    setMousePos({x:x , y:y});
  }
}
