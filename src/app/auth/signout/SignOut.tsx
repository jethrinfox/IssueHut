"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/trpc/react"
import { useRouter } from "next/navigation"

const Login = () => {
  const { mutateAsync } = api.user.signOut.useMutation()
  const router = useRouter()

  const handleButton = async () => {
    await mutateAsync()

    router.push("/")
  }

  return (
    <Card className="m-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="mb-2 text-2xl">Esta seguro?</CardTitle>

        <Button className="w-full" onClick={handleButton}>
          Cerrar sesión
        </Button>
      </CardHeader>
    </Card>
  )
}

export default Login
