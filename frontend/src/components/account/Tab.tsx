interface TabProps {
  label: string,
  active: boolean,
  onClick: () => void,
}

const Tab = ({ label, active, onClick }: TabProps) => {
  return (
    <div className="w-full h-[2rem] flex justify-center">
      <div className="flex flex-col items-center gap-1">
        <p
          className={
            `font-medium cursor-pointer w-fit transition-color
            ${active ? "text-black" : "text-gray-500"}`
          }
          onClick={onClick}
        >
          {label}
        </p>
        <hr className={`
        h-[.2rem] bg-blue-400 border-0
        transition-all duration-300 w-0
        ${active ? "w-full" : "w-0"}
      `}></hr>
      </div>
    </div>
  )
}

export default Tab
