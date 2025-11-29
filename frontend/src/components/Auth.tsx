import AuthBox from "./auth/AuthBox"

interface LinkProps {
  text: string;
}

const Auth = () => {
  const Link = ({ text }: LinkProps) => {
    return (
      <a className="text-blue-700">{text}</a>
    )
  }

  return (
    <div className="w-full h-full flex justify-center pt-[5rem]">
      <div className="w-full p-[2rem] pr-[4rem]">
        <p className="w-[10rem] text-[2.5rem] font-bold mb-[2rem]">Happening now</p>
        <p className="text-[1.5rem] font-bold">Join today.</p>

        <AuthBox to="/auth/login" text="Sign in" />
        <div className="w-full flex justify-center items-center relative">
          <p className="relative w-[3rem] text-center font-bold bg-white z-10">OR</p>
          <span className="absolute w-full h-[.1rem] bg-gray-100"></span>
        </div>
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
