interface FollowInfoProps {
  number: number,
  text: string,
  onClick: () => void,
}

const FollowInfo = ({ number, text, onClick }: FollowInfoProps) => {
  return (
    <div
      className="
        flex gap-[.3rem] text-[.9rem] text-gray-500 cursor-pointer
        hover:text-black transition-colors duration-300
      "
      onClick={onClick}
    >
      <p className="text-black font-bold">{number}</p>
      {text}
    </div>
  )
}

export default FollowInfo
