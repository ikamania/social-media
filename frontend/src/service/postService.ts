import showAlert from "../components/showAlert.ts"

const url = "http://localhost:8000"

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

  if (response.ok)
    showAlert("success", "published")
  else
    showAlert("error", "could not publish")
}

export const fetchPosts = async (tokenAccess: string) => {
  try {
    const response = await fetch(`${url}/posts/`, {
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
