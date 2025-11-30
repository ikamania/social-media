import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"

import X from "./auth/X.tsx"
import AuthBox from "./auth/AuthBox.tsx"
import Input from "./auth/Input.tsx"
import Or from "./auth/Or.tsx"
import Link from "./auth/Link.tsx"

const Login = () => {
  return (
    <div className="w-full h-full">
      <X />
      <div className="p-[3rem]">
        <p className="text-[1.5rem] font-bold">Sign in</p>

        <AuthBox text="Sign in with Google" icon={FcGoogle} to="/auth/login/" css="text-gray-500" />
        <AuthBox text="Sign in with Apple" icon={FaApple} to="/auth/login/" css="text-gray-500" />
        <Or />
        <div className="px-[1.3rem] mt-[1rem]">
          <Input type="text" placeholder="Email or phone" />
          <Input type="password" placeholder="Password" />
          <AuthBox text="Next" to="/auth/" css="text-white bg-black" />
        </div>
        <p className="text-[.9rem] text-gray-400 px-[.5rem] pt-[1rem]">
          Don't have an account? <Link text="Sign up" to="/auth/register" />
        </p>
      </div>

    </div>
  )
}

export default Login
