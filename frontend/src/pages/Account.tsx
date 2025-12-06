import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { IoIosArrowRoundBack } from "react-icons/io"
import testphoto2 from "../assets/5HdM0_7C_400x400.jpg"
import showAlert from "../components/showAlert"
import { FaRegCalendarAlt } from "react-icons/fa"
import FollowInfo from "../components/account/FollowInfo"
import Tab from "../components/account/Tab.tsx"
import { fetchPostsByUsername, followOrUnfollow } from "../service/postService.ts"
import Post, { type PostType } from "../components/post/Post.tsx"

interface User {
  id: number,
  username: string,
  email: string,
  image?: string,
  date_joined: string,
  following_count: number,
  followers_count: number,
  is_following: boolean,
}

const Account = () => {
  const { username } = useParams()
  const { user, loadUser, loadByUsername, token } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("Posts")
  const tabs = ["Posts", "Replies", "Media"];
  const [posts, setPosts] = useState<PostType[] | null>(null)

  const load = async () => {
    if (!username)
      return

    try {
      const data = await loadByUsername(username)
      setProfile({
        ...data,
        date_joined: new Date(data.date_joined).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
      })

      if (!user) {
        loadUser()
      }
    } catch {
      showAlert("error", "internal error")
    }

    if (posts)
      return
    try {
      const data = await fetchPostsByUsername(token.access, username)
      setPosts(data)
    } catch {
      showAlert("error", "internal error")
    }
  }

  useEffect(() => {
    if (!profile)
      load()
  }, [username])

  const handleFollow = () => {
    if (profile?.id) {
      const target = profile?.is_following ? "unfollow" : "follow"

      followOrUnfollow(
        token?.access, profile.id, target
      )
      setProfile(prev => (prev) ? {
        ...prev,
        is_following: !prev.is_following,
        followers_count: prev.followers_count + (target == "follow" ? 1 : -1)
      } : prev)
    }
  }

  return (
    <div>
      <div className="
        w-full h-[4rem] text-[2rem] flex items-center p-[1rem]
        gap-[2.5rem]
        ">
        <NavLink to="/">
          <IoIosArrowRoundBack />
        </NavLink>
        <div className="relative text-[.8rem] text-gray-500">
          <p
            className="text-[1.3rem] text-black font-bold"
          >{profile?.username}</p>
          <p>0 posts</p>
        </div>
      </div>
      <div className="w-full h-[10rem] bg-gray-300 relative">
        <img src={profile?.image ?? testphoto2} className="
          w-36 h-36 object-cover absolute rounded-full -bottom-18
          left-5 border-[.3rem] border-white
        "/>
      </div>
      <div className="w-full h-[4rem] flex justify-end items-center pr-[2rem]">
        {user?.email == profile?.email ? (
          <p className="
            font-bold text-[.9rem] border-1 border-gray-300 
            px-[.8rem] py-[.5rem] rounded-full cursor-pointer
          "
          >Set up profile</p>
        ) : (
          <p className="
            font-bold text-[.9rem] text-white bg-black/80
            px-[.8rem] py-[.5rem] rounded-full cursor-pointer 
          "
            onClick={handleFollow}
          >{profile?.is_following ? "Unfollow" : "Follow"}</p>
        )}
      </div>
      <div className="p-[1.2rem]">
        <p className="font-bold text-[1.2rem]">{profile?.username}</p>
        <p className="text-gray-500">{profile?.email}</p>
        <p className="text-gray-700 mt-[.5rem] flex items-center gap-[.5rem]">
          <FaRegCalendarAlt />
          Member since: {profile?.date_joined}
        </p>
        <div className="flex gap-[1rem] mt-[1rem]">
          <FollowInfo number={profile?.following_count ?? 0} text="Following" />
          <FollowInfo number={profile?.followers_count ?? 0} text="Followers" />
        </div>
      </div>
      <div className="mt-[1rem] flex">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            label={tab}
            activeTab={activeTab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>
      <div className="">
        {activeTab == "Posts" && posts?.map(post => (
          <Post
            key={post.id}
            post={post}
            commentsOn={true}
            likeTarget="post"
          />
        ))}
      </div>
    </div>
  )
}

export default Account
