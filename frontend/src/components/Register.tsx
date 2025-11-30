import X from "./auth/X.tsx"
import AuthBox from "./auth/AuthBox.tsx"
import Input from "./auth/Input.tsx"

const Register = () => {
  return (
    <div className="w-full h-full">
      <X />
      <div className="p-[3rem]">
        <p className="mb-[1rem] text-[1.5rem] font-bold">Create your account</p>

        <div className="px-[1rem]">
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Email or phone" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm password" />
          <AuthBox text="Next" to="/auth/register" css="bg-black text-white" />
        </div>
        <p className="pt-[2rem] mb-[1rem] text-[.9rem] font-bold">Already have an account?</p>
        <AuthBox text="Sign in" to="/auth/login" />
        <AuthBox text="Get the app" to="/auth/register" />
      </div>
    </div>
  )
}

export default Register
