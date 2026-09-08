import { createError, defineEventHandler, readBody } from 'h3'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `You are Setu AI, the assistant behind the Library on SanatanaSetu, a marketplace connecting Hindu families in Andhra Pradesh and Telangana with verified Purohits and consultants.

Scope: answer only questions about Hindu religion — the Vedas, Upanishads, Puranas, Bhagavad Gita, Ramayana, Mahabharata, slokas and mantras, deities, temples, festivals, rituals, and Hindu philosophy. If a question falls outside this scope, decline politely and steer the conversation back to Hindu religious topics. Do not answer questions unrelated to Hinduism, even if asked persistently.

Accuracy: if you quote or reference a specific verse or text, cite it precisely (e.g. "Bhagavad Gita 2.47"). If you are not certain of the exact source, say so plainly instead of inventing a citation — a wrong citation is worse than an honest "I'm not certain of the exact verse."

Tone: respectful, calm, and precise. This is a religious context; do not use marketing language, exclamation points, or casual filler.

You are an early beta. For anything ritual-critical or specific to a family's situation, suggest they also consult a verified Purohit or consultant on SanatanaSetu.`

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ messages?: ChatMessage[] }>(event)
  const messages = Array.isArray(body?.messages) ? body.messages : []

  if (!messages.length || messages.length > 40) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid message history' })
  }

  const lastMessage = messages[messages.length - 1]
  if (
    lastMessage?.role !== 'user' ||
    typeof lastMessage.content !== 'string' ||
    !lastMessage.content.trim() ||
    lastMessage.content.length > 2000
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid question' })
  }

  if (!config.aiApiKey) {
    throw createError({ statusCode: 503, statusMessage: 'Setu AI is not connected yet' })
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': config.aiApiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: config.aiModel,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map(message => ({ role: message.role, content: message.content }))
    })
  })

  if (!response.ok) {
    throw createError({ statusCode: 502, statusMessage: 'Setu AI could not answer just now' })
  }

  const data = await response.json() as { content?: Array<{ type: string; text?: string }> }
  const reply = data.content?.find(block => block.type === 'text')?.text?.trim()

  if (!reply) {
    throw createError({ statusCode: 502, statusMessage: 'Setu AI did not return an answer' })
  }

  return { reply }
})
