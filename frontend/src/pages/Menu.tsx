import Top from '../components/menu/Top.tsx'
import Feed from '../components/menu/Feed.tsx'
import PostUpload from '../components/post/PostUpload.tsx'

const Menu = () => {
  return (
    <>
      <div className="md:hidden">
        <Top />
      </div>

      <Feed />
      <PostUpload />
    </>
  )
}

export default Menu
