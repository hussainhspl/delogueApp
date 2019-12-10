const getThumbnail = (thumbnails) => {
  console.log("get thumbnail called")
  if(thumbnails != null) {
    thumbnails.some(s => {
      if(s.size > 70000) {
        this.setState({
          imgSrc : s.url
        })
        console.log("perfect size:", s.size);
        return true;
      }
      else if (s.size > 40000) {
        this.setState({
          imgSrc : s.url
        })
        console.log("perfect size 4:", s.size);
        return true;
      }
      return false
    })
  }
}
export default getThumbnail;