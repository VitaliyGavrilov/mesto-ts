import CardEl from "./typeCard"
import User from "./typeCurrentUser"

export default interface PopupSubmitProps {
  isOpen: boolean
  onClose: () => void
  submit: (data: User) => void
  userData: User 
}