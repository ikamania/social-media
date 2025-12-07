import X from "../components/auth/X.tsx"
import AuthBox from "../components/auth/AuthBox.tsx"
import Input from "../components/auth/Input.tsx"
import { useAuth } from "../context/AuthContext.tsx"
import { useState } from "react"

const Register = () => {
  const { register } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = () => {
    register(username, email, password)
  }

  return (
    <div className="w-full h-full">
      <X />
      <div className="p-[3rem]">
        <p className="mb-[1rem] text-[1.5rem] font-bold">Create your account</p>

        <div className="px-[1rem]">
          <Input type="text" placeholder="Name" value={username} onChange={setUsername} />
          <Input type="text" placeholder="Email" value={email} onChange={setEmail} />
          <Input type="password" placeholder="Password" value={password} onChange={setPassword} />
          <button className="w-full" onClick={handleRegister}>
            <AuthBox text="Register" to="/auth/register" css="bg-black text-white hover:!bg-black/80" />
          </button>
        </div>
        <p className="pt-[2rem] mb-[1rem] text-[.9rem] font-bold">Already have an account?</p>
        <AuthBox text="Sign in" to="/auth/login" />
        <AuthBox text="Get the app" to="/auth/register" />
      </div>
    </div>
  )
}

export default Register
