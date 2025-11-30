import AuthBox from "./auth/AuthBox"
import Or from "./auth/Or.tsx"
import Link from "./auth/Link.tsx"

const Auth = () => {

  return (
    <div className="w-full h-full flex justify-center pt-[5rem]">
      <div className="w-full p-[2rem] pr-[4rem]">
        <p className="w-[10rem] text-[2.5rem] font-bold mb-[2rem]">Happening now</p>
        <p className="text-[1.5rem] font-bold">Join today.</p>

        <AuthBox to="/auth/login" text="Sign in" />
        <Or />
        <AuthBox to="/auth/register" text="Create account" css="bg-black text-white" />
        <p className="text-[.7rem] text-gray-400 px-[.5rem]">
          By signing up, you agree to the <Link text="Terms of Service " />
          and <Link text="Privacy Policy," /> including <Link text="Cookie Use." />
        </p>
      </div>
    </div>
  )
}

export default Auth
