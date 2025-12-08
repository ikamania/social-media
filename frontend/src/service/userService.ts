import showAlert from "../components/showAlert.ts"

const url = "http://localhost:8000"

export const followOrUnfollow = async (tokenAccess: string, id: number, target: "follow" | "unfollow") => {
  try {
    const response = await fetch(`${url}/users/${id}/${target}/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${tokenAccess}`,
        "Content-Type": "application/json",
      },
    })

    if (!response)
      showAlert("error", "bad response")

  } catch {
    showAlert("error", "internal error")
  }
}

export const getFollowersOrFollowing = async (tokenAccess: string, id: number, target: "following" | "followers") => {
  try {
    console.log(tokenAccess)
    const response = await fetch(`${url}/users/${id}/${target}/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${tokenAccess}`,
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()

      return data
    } else
      throw new Error("bad response")

  } catch {
    showAlert("error", "internal error")
  }
}

export const get = () => { }
