export const textModifier = (comment:string) => {
  const messageArray =  comment.split("")
  if (comment.split("").length > 20) {
   return  `${messageArray.slice(0, 13).join("")}...`
  }
    return comment;
}
