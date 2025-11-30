interface InputProps {
  type: string
  placeholder?: string
}

const Input = ({ type, placeholder }: InputProps) => {
  return (
    <div className="relative py-[.5rem]">
      <input
        className="peer w-full h-[3rem] p-[.5rem] pt-[1rem] border-1 border-gray-200"
        type={type} placeholder=""
      />
      <label
        className="
        absolute left-[1rem] top-1/2 -translate-y-1/2 text-gray-500 text-[.9rem]
        peer-focus:top-[.5rem] peer-focus:-translate-y-0 peer-focus:text-[.8rem]
        pointer-events-none transition-all duration-200
        peer-not-placeholder-shown:text-[.8rem]
        peer-not-placeholder-shown:top-[.5rem]
        peer-not-placeholder-shown:-translate-y-0
        "
      >{placeholder}</label>
    </div>
  )
}

export default Input
