module.exports = (query) =>{
  const object={
    keyword:"",
    regex:""
  }
  if(query.keyword){
    object.keyword=query.keyword;
    const regax= new RegExp(object.keyword,"i");
    object.regex=regax;
  }
  return object;
}