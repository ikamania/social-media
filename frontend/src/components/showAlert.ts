import Swal from "sweetalert2"

const ShowAlert = (icon: "success" | "error", text: string) => {
  Swal.fire({ icon, text, timer: 1500 })
}

export default ShowAlert
