import ShowAlert from "../components/showAlert.ts"

const url = "http://localhost:8000"

const createPost = async (tokenAccess: string, content: string, image?: File) => {
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
    ShowAlert("success", "published")
  else
    ShowAlert("error", "could not publish")
}

export default createPost 
