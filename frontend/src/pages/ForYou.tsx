import Menu from "./Menu"
import Post from "../components/post/Post"

const ForYouFeed = () => {
  return (
    <>
      <Menu />
      <Post email="ika@gmail.com" text="If your original image is huge (e.g., 2000×2000px) and you shrink it to 32×32px, the browser is resampling it, which can look blurry. A better approach is to pre-resize it to roughly the size you need." />
    </>
  )
}

export default ForYouFeed
