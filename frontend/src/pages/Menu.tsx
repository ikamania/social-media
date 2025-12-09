import Top from '../components/menu/Top.tsx'
import Feed from '../components/menu/Feed.tsx'
import UploadBox from '../components/post/UploadBox.tsx'
import { createPost } from "../service/postService"

const Menu = () => {
  return (
    <>
      <div>
        <Top />
      </div>

      <Feed />
      <UploadBox upload={createPost} buttonText="Post" placeholder="What`s happening?" />
    </>
  )
}

export default Menu
