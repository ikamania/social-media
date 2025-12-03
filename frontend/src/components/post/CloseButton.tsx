interface CloseButtonProps {
  text: string,
  onClick: () => void,
  css?: string,
}

const CloseButton = ({ text, onClick, css }: CloseButtonProps) => {
  return (

    <button
      type="button"
      onClick={onClick}
      className={`
          absolute text-white bg-black/50
          rounded-full w-[1.5rem] h-[1.5rem] flex
          items-center justify-center cursor-pointer
          ${css ?? ""}
      `}
    >
      {text}
    </button>
  )
}

export default CloseButton
