interface CommentProps {
  comment?: {
    id: number,
    user: {
      id: number,
      username: string,
      email: string,
    },
    content: string,
    image?: string,
  }
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div>
      <p>Good Shit</p>
    </div>
  )
}

export default Comment
