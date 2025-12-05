interface FollowInfoProps {
  number: number,
  text: string,
}

const FollowInfo = ({ number, text }: FollowInfoProps) => {
  return (
    <div className="flex gap-[.4rem] text-[.9rem] text-gray-500 cursor-pointer">
      <p className="text-black font-bold">{number}</p>
      <p>{text}</p>
    </div>
  )
}

export default FollowInfo
