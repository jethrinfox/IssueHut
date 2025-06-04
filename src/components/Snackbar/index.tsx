"use client"
import { type FC, type PropsWithChildren } from "react"
import { Toaster } from "react-hot-toast"

const Snackbar: FC<PropsWithChildren> = () => {
  return (
    <Toaster
      containerClassName=""
      containerStyle={{}}
      gutter={8}
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  )
}

export default Snackbar
