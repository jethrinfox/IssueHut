import redirectAuth from "@/utils/auth/redirectAuth"

import CambiarContrasena from "./CambiarContrasena"

export default async function CambiarContrasenaPage() {
  await redirectAuth()

  return (
    <div className="flex flex-col">
      <h1 className="mb-12 text-lg font-semibold md:text-2xl">
        Cambiar Contraseña
      </h1>
      <CambiarContrasena />
    </div>
  )
}
