import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { IoIosArrowRoundBack } from "react-icons/io"
import testphoto2 from "../assets/5HdM0_7C_400x400.jpg"
import showAlert from "../components/showAlert"
import { FaRegCalendarAlt } from "react-icons/fa"
import FollowInfo from "../components/account/FollowInfo"
import Tab from "../components/account/Tab.tsx"
import { followOrUnfollow, getFollowersOrFollowing } from "../service/userService.ts"
import { fetchPostsByUsername } from "../service/postService.ts"
import PostCard from "../components/post/PostCard.tsx"
import { type Post } from "../types/post.ts"
import { type User } from "../types/user.ts"
import ProfileEditPopUp from "../components/account/ProfileEditPopUp.tsx"
import Loading from "./Loading.tsx"
import { type SimpleUser, FollowBox } from "../components/account/FollowBox.tsx"

const Account = () => {
  const { username } = useParams()
  const { user, loadUser, loadByUsername, token } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("Posts")
  const tabs = ["Posts", "Replies", "Media"];
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [profileSetUp, setProfileSetUp] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [followers, setFollowers] = useState<SimpleUser[] | []>([])
  const [following, setFollowing] = useState<SimpleUser[] | []>([])


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
    load()
  }, [username])

  const handleFollowing = async () => {
    if (following.length == 0 && profile) {
      const data = await getFollowersOrFollowing(token.access, profile.id, "following")

      setFollowing(data)
      console.log(data)
    }
    setShowFollowing(true)
  }

  const handleFollowers = async () => {
    if (followers.length == 0 && profile) {
      const data = await getFollowersOrFollowing(token.access, profile.id, "followers")

      setFollowers(data)
    }
    setShowFollowers(true)
  }

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

  if (!profile || !user)
    return <Loading />

  return (
    <div>
      {profileSetUp && profile && <ProfileEditPopUp setHidden={setProfileSetUp} user={profile} />}
      {showFollowers && <FollowBox label="Followers" count={profile.followers_count} users={followers} onClose={() => setShowFollowers(false)} />}
      {showFollowing && <FollowBox label="Following" count={profile.following_count} users={following} onClose={() => setShowFollowing(false)} />}

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
          >{profile?.name} {profile?.surname}</p>
          <p>{posts?.length} posts</p>
        </div>
      </div>
      <div className="w-full h-[10rem] bg-gray-300 relative">
        <img src={profile?.image ?? testphoto2} className="
          w-36 h-36 object-cover absolute rounded-full -bottom-18
          left-5 border-[.3rem] border-white
        "/>
      </div>
      <div className="w-full h-[4rem] flex justify-end items-center pr-[1rem]">
        {user?.email == profile?.email ? (
          <p className="
            font-bold text-[.9rem] border-1 border-gray-300 
            px-[.8rem] py-[.5rem] rounded-full cursor-pointer
            hover:bg-gray-100 transition-colors duration-300
          "
            onClick={() => setProfileSetUp(prev => !prev)}
          >Set up profile</p>
        ) : (
          <p className="
            font-bold text-[.9rem] text-white bg-black/80
            px-[.8rem] py-[.5rem] rounded-full cursor-pointer 
            hover:bg-black transition-colors duration-300
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
          <FollowInfo
            number={profile?.following_count ?? 0}
            text="Following"
            onClick={handleFollowing}
          />
          <FollowInfo
            number={profile?.followers_count ?? 0}
            text="Followers"
            onClick={handleFollowers}
          />
        </div>
      </div>
      <div className="mt-[1rem] flex">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            label={tab}
            active={tab == activeTab}
            onClick={() => { setActiveTab(tab) }}
          />
        ))}
      </div>
      <div className="">
        {activeTab == "Posts" && posts?.map(post => (
          <PostCard
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
