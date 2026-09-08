import { createError, defineEventHandler, readBody } from 'h3'

interface AntyeshtiRequestBody {
  name?: unknown
  phone?: unknown
  location?: unknown
}

export default defineEventHandler(async (event) => {
  const body = await readBody<AntyeshtiRequestBody>(event)
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const location = typeof body.location === 'string' ? body.location.trim() : ''

  if (!name || !location || !/^\+[1-9]\d{7,14}$/.test(phone)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request details' })
  }

  return {
    ok: true,
    requestId: crypto.randomUUID()
  }
})
