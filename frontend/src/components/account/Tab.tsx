interface TabProps {
  label: string,
  activeTab: string,
  onClick: () => void,
}

const Tab = ({ label, activeTab, onClick }: TabProps) => {
  const isActive = label == activeTab

  return (
    <div className="w-full h-[2rem] flex justify-center">
      <p
        className={
          `font-medium relative cursor-pointer
        ${isActive ? "text-black" : "text-gray-500"}`
        }
        onClick={onClick}
      >
        {label}
        {isActive && (
          <span className="absolute w-full h-1 left-0 bottom-0 bg-blue-400 rounded-full"></span>
        )}
      </p>
    </div>
  )
}

export default Tab
