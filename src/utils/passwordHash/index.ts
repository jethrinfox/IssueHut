import { hash as argonHash, verify as argonVerify } from "@node-rs/argon2"

const ARGON_OPTIONS = {
  memoryCost: 19456,
  outputLen: 32,
  parallelism: 1,
  timeCost: 2,
}

export const verify = (hashed: string, password: string) => {
  return argonVerify(hashed, password, ARGON_OPTIONS)
}

export const hash = (password: string) => {
  return argonHash(password, ARGON_OPTIONS)
}
