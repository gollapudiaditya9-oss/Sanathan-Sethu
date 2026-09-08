import { createError, defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)
  const kind = typeof body.kind === 'string' ? body.kind : ''
  if (!['partner-application', 'consultant-routing', 'consultation', 'waitlist'].includes(kind)) {
    throw createError({ statusCode: 400, statusMessage: 'Unknown request type' })
  }

  const requestId = crypto.randomUUID()
  await useStorage('requests').setItem(requestId, {
    ...body,
    requestId,
    createdAt: new Date().toISOString()
  })

  return { ok: true, requestId }
})
