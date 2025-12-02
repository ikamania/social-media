import Top from '../components/menu/Top.tsx'
import Feed from '../components/menu/Feed.tsx'
import UploadBox from '../components/post/UploadBox.tsx'
import { createPost } from "../service/postService"

const Menu = () => {
  return (
    <>
      <div className="md:hidden">
        <Top />
      </div>

      <Feed />
      <UploadBox upload={createPost} buttonText="Post" />
    </>
  )
}

export default Menu
