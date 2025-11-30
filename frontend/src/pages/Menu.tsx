import Top from '../components/menu/Top.tsx'
import Feed from '../components/menu/Feed.tsx'

const Menu = () => {
  return (
    <>
      <div className="md:hidden">
        <Top />
      </div>

      <Feed />
    </>
  )
}

export default Menu
