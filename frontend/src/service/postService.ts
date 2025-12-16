import showAlert from "../components/showAlert.ts"

const url = "http://localhost:8000"

// improvment 1
const dispatchWindowEvent = (name: string) => {
  const event = new CustomEvent(name)

  window.dispatchEvent(event)
}

export const createPost = async (tokenAccess: string, content: string, image?: File) => {
  const form = new FormData()

  form.append("content", content)
  if (image)
    form.append("image", image)

  const response = await fetch(`${url}/posts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenAccess}`,
    },
    body: form,
  })

  if (response.ok) {
    showAlert("success", "published")

    dispatchWindowEvent("new post") // 1
  }
  else
    showAlert("error", "could not publish")
}

export const fetchPosts = async (tokenAccess: string, following: boolean) => {
  try {
    const response = await fetch(`${url}/posts${following ? "/following" : ""}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${tokenAccess}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok)
      showAlert("error", "failed to fetch posts")

    const data = await response.json()
    return data
  } catch {
    showAlert("error", "internale error")
  }
}

export const fetchPostsByUsername = async (tokenAccess: string, username: string) => {
  try {
    const response = await fetch(`${url}/posts/by-username/${username}/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${tokenAccess}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok)
      showAlert("error", "failed to fetch posts")

    const data = await response.json()
    return data
  } catch {
    showAlert("error", "internale error")
  }
}

export const toggleLike = async (id: number, likeTarget: "post" | "comment", tokenAccess: string) => {
  const urlPath = (
    likeTarget === "post" ? `/posts/${id}/like/` : `/comments/${id}/like/`
  )

  const response = await fetch(`${url}${urlPath}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${tokenAccess}`,
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()

  return data
}

export const createComment = async (tokenAccess: string, content: string, image?: File, postId?: number) => {
  const form = new FormData()

  form.append("content", content)
  if (postId) {
    form.append("post", postId.toString())
  }
  else {
    showAlert("error", "no postId provided")
  }
  if (image)
    form.append("image", image)

  const response = await fetch(`${url}/comments/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenAccess}`,
    },
    body: form,
  })

  if (response.ok) {
    showAlert("success", "commented")

    dispatchWindowEvent("new comment") // 1
  }
  else
    showAlert("error", "could not comment")
}

export const fetchComments = async (tokenAccess: string, postId: number) => {
  try {
    const response = await fetch(`${url}/comments/?post=${postId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${tokenAccess}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok)
      showAlert("error", "failed to fetch comments")

    const data = await response.json()
    return data
  } catch {
    showAlert("error", "internale error")
  }
}

export const deletePost = async (id: string, token: string, target: "post" | "comment"): Promise<void> => {
  const urlPath = (
    target === "post" ? `/posts/${id}/` : `/comments/${id}/`
  )

  try {
    const response = await fetch(`${url}${urlPath}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response)
      showAlert("error", `could not delete ${target}`)
    else {
      showAlert("success", `${target} deleted`)

      dispatchWindowEvent(target == "post" ? "new post" : "new comment") // 1
    }

  } catch {
    showAlert("error", "internal error")
  }
}
