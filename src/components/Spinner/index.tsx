import { ReloadIcon } from "@radix-ui/react-icons"
import { type FC } from "react"

const Spinner: FC = () => {
  return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
}

export default Spinner
