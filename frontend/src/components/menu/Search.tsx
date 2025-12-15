import { IoSearch } from "react-icons/io5"
import { useState } from "react"
import type { SimpleUser } from "../../types/user"
import { searchUsers } from "../../service/userService"
import { useAuth } from "../../context/AuthContext"
import ShowAlert from "../showAlert"
import SimpleUserBox from "../account/SimpleUserBox"

const Search = () => {
  const { token } = useAuth()
  const [showResults, setShowResults] = useState(false)
  const [search, setSearch] = useState("")
  const [searched, setSearched] = useState("")
  const [results, setResults] = useState<SimpleUser[] | []>([])

  const handleSearch = async () => {
    const text = search.trim()
    if (showResults && text && searched != text) {
      try {
        const data = await searchUsers(token.access, text)

        setResults(data)
        setSearched(text)
      } catch {
        ShowAlert("error", "internal error")
      }
    } else {
      setShowResults(prev => !prev)
    }
  }

  return (
    <div className={`
      transition-colors duration-200 ease-in-out border-gray-300 
      w-[15rem] absolute top-3 right-1 p-[.5rem]
      rounded-2xl ${showResults ? "border bg-white" : ""}
    `}>
      <div className="flex items-center justify-end ">
        <input
          type="text"
          className={`
          transition-all duration-200 ease-in-out pl-[.2rem] pb-[.2rem]
          ${showResults ? "w-full" : "w-0 opacity-0"}
          text-[1rem] outline-none border-b border-gray-500
        `}
          placeholder="Search"
          value={search}
          autoFocus={showResults}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch
          className="cursor-pointer text-[1.5rem] shrink-0 ml-2"
          onClick={handleSearch}
        />
      </div>
      {showResults && (
        <div className="
          h-fit bg-white flex flex-col mt-[1rem] gap-[.5rem] relative z-100">
          {results && results.map(result => (
            <SimpleUserBox user={result} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
