<script setup lang="ts">
import { nextTick, ref } from 'vue'

definePageMeta({ layout: 'chat' })

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<ChatMessage[]>([])
const input = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const scrollAnchor = ref<HTMLElement | null>(null)

const starterQuestions = [
  'What is Griha Pravesh and why is it performed?',
  'Explain karma yoga from the Bhagavad Gita',
  'What is the significance of the Gayatri Mantra?',
  'What are the four Vedas?'
]

const scrollToBottom = () => {
  nextTick(() => scrollAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'end' }))
}

const sendMessage = async (text: string) => {
  const question = text.trim()
  if (!question || isLoading.value) return

  errorMessage.value = ''
  messages.value.push({ role: 'user', content: question })
  input.value = ''
  scrollToBottom()
  isLoading.value = true

  try {
    const { reply } = await $fetch<{ reply: string }>('/api/setu-ai/chat', {
      method: 'POST',
      body: { messages: messages.value }
    })
    messages.value.push({ role: 'assistant', content: reply })
  } catch (error) {
    const statusMessage = (error as { data?: { statusMessage?: string }, statusMessage?: string })
    errorMessage.value = statusMessage?.data?.statusMessage
      || statusMessage?.statusMessage
      || 'Setu AI could not answer that just now. Please try again.'
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const handleSubmit = () => sendMessage(input.value)
</script>

<template>
  <div class="setu-ai">
    <div class="setu-ai__wrap" :class="{ 'has-messages': messages.length }">
      <!-- Empty state: centered hero, like CraftGPT's landing screen -->
      <div v-if="!messages.length" class="setu-ai__hero">
        <span class="setu-ai__eyebrow">The Library — early beta</span>
        <h1 class="setu-ai__title">What do you seek to know?</h1>

        <form class="setu-ai__pill-form" @submit.prevent="handleSubmit">
          <input
            v-model="input"
            type="text"
            class="setu-ai__pill-input"
            placeholder="Ask Setu AI anything about Hindu dharma..."
            :disabled="isLoading"
            aria-label="Ask Setu AI a question"
          >
          <button type="submit" class="setu-ai__pill-send" :disabled="isLoading || !input.trim()" aria-label="Send question">
            <span aria-hidden="true">&rarr;</span>
          </button>
        </form>

        <p v-if="errorMessage" class="setu-ai__error" role="alert">{{ errorMessage }}</p>

        <div class="setu-ai__chips">
          <button
            v-for="question in starterQuestions"
            :key="question"
            type="button"
            class="setu-ai__chip"
            @click="sendMessage(question)"
          >
            <span>{{ question }}</span>
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </div>

        <p class="setu-ai__disclaimer font-inter text-h-10">
          Can make mistakes. Verify anything ritual-critical with a
          <NuxtLink to="/consultants">verified consultant</NuxtLink>.
        </p>
      </div>

      <!-- Conversation state: thread + docked pill input -->
      <template v-else>
        <div class="setu-ai__thread" role="log" aria-live="polite">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="setu-ai__bubble-row"
            :class="message.role === 'user' ? 'is-user' : 'is-assistant'"
          >
            <p class="setu-ai__bubble">{{ message.content }}</p>
          </div>

          <div v-if="isLoading" class="setu-ai__bubble-row is-assistant">
            <p class="setu-ai__bubble setu-ai__bubble--loading" aria-label="Setu AI is answering">
              <span /><span /><span />
            </p>
          </div>

          <div ref="scrollAnchor" />
        </div>

        <p v-if="errorMessage" class="setu-ai__error" role="alert">{{ errorMessage }}</p>

        <form class="setu-ai__pill-form setu-ai__pill-form--docked" @submit.prevent="handleSubmit">
          <input
            v-model="input"
            type="text"
            class="setu-ai__pill-input"
            placeholder="Ask another question..."
            :disabled="isLoading"
            aria-label="Ask Setu AI a question"
          >
          <button type="submit" class="setu-ai__pill-send" :disabled="isLoading || !input.trim()" aria-label="Send question">
            <span aria-hidden="true">&rarr;</span>
          </button>
        </form>

        <p class="setu-ai__disclaimer font-inter text-h-10">
          Can make mistakes. Verify anything ritual-critical with a
          <NuxtLink to="/consultants">verified consultant</NuxtLink>.
        </p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.setu-ai {
  min-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px 24px 32px;
}

.setu-ai__wrap {
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.setu-ai__wrap.has-messages {
  justify-content: flex-start;
  max-width: 736px;
}

/* --- Empty state / hero --- */

.setu-ai__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
  padding-bottom: 24px;
}

.setu-ai__eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(26, 22, 20, 0.5);
}

.setu-ai__title {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #1a1614;
  margin: 0;
}

.setu-ai__chips {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  max-width: 560px;
}

.setu-ai__chip {
  /* Opaque background (not tinted-transparent) so its text contrast is
     self-contained and doesn't depend on where in the page gradient the
     hero happens to land — same reasoning as the pill input below. */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px dashed rgba(26, 22, 20, 0.25);
  background: linear-gradient(120deg, #fbf8f1 0%, #f6f1e8 100%);
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #3a3230;
  transition: border-color 150ms ease-out, transform 150ms ease-out;
}

.setu-ai__chip:hover {
  border-color: #bf4028;
  transform: translateY(-1px);
}

/* --- Pill input (shared between hero and docked states) --- */

.setu-ai__pill-form {
  /* Concentric with the button: pill cap radius is height/2 (28px @ 56px
     tall); button radius is 22px (44px fixed circle); the 6px padding is
     exactly cap-radius minus button-radius, so the button floats inside
     the cap sharing its center, not stretched to fill it. */
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 6px 6px 20px;
  border-radius: 999px;
  border: 1px solid rgba(26, 22, 20, 0.08);
  background: linear-gradient(165deg, #fbf8f1 0%, #f6f1e8 100%);
  box-shadow: 0 20px 40px -28px rgba(26, 22, 20, 0.5);
}

.setu-ai__pill-form--docked {
  margin-top: 4px;
  height: 52px;
  padding: 4px 4px 4px 20px;
}

.setu-ai__pill-input {
  /* Overrides the site-wide :where(input){max-width:32.5rem} rule in
     main.css — that rule was capping this input's width, so flex:1
     couldn't actually fill the row, leaving the leftover space stranded
     after the button instead of being absorbed by the input. */
  flex: 1;
  min-width: 0;
  max-width: none;
  border: none;
  background: transparent;
  padding: 0 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #1a1614;
}

.setu-ai__pill-input:focus {
  outline: none;
}

.setu-ai__pill-input:focus-visible {
  outline: none;
}

.setu-ai__pill-send {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: linear-gradient(135deg, #bf4028 0%, #7a2417 100%);
  color: #fbf8f1;
  font-size: 18px;
  transition: transform 150ms ease-out, opacity 150ms ease-out;
}

.setu-ai__pill-form--docked .setu-ai__pill-send {
  width: 44px;
  height: 44px;
}

.setu-ai__pill-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.setu-ai__pill-send:not(:disabled):hover {
  transform: translateY(-1px);
}

/* --- Conversation state --- */

.setu-ai__thread {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  overflow-y: auto;
  padding: 16px 4px;
}

.setu-ai__bubble-row {
  display: flex;
}

.setu-ai__bubble-row.is-user {
  justify-content: flex-end;
}

.setu-ai__bubble-row.is-assistant {
  justify-content: flex-start;
}

.setu-ai__bubble {
  max-width: 78%;
  padding: 14px 18px;
  border-radius: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.is-user .setu-ai__bubble {
  background: linear-gradient(135deg, #bf4028 0%, #7a2417 100%);
  color: #fbf8f1;
  border-bottom-right-radius: 4px;
}

.is-assistant .setu-ai__bubble {
  /* Page background is light now too, so a border alone reads too faint —
     add a soft shadow for definition instead of relying on light-vs-dark
     page contrast. */
  background: linear-gradient(135deg, #fbf8f1 0%, #f6f1e8 100%);
  color: #1a1614;
  border: 1px solid rgba(26, 22, 20, 0.1);
  box-shadow: 0 4px 14px -10px rgba(26, 22, 20, 0.35);
  border-bottom-left-radius: 4px;
}

.setu-ai__bubble--loading {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 16px 20px;
}

.setu-ai__bubble--loading span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6e625a;
  animation: setu-ai-pulse 1.1s ease-in-out infinite;
}

.setu-ai__bubble--loading span:nth-child(2) { animation-delay: 0.15s; }
.setu-ai__bubble--loading span:nth-child(3) { animation-delay: 0.3s; }

@keyframes setu-ai-pulse {
  0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-3px); }
}

.setu-ai__error {
  /* Opaque badge, same reasoning as .setu-ai__chip: appears in both the
     centered hero and the docked thread, so its own background has to
     carry the contrast rather than assuming what's behind it. */
  align-self: center;
  max-width: 480px;
  padding: 8px 16px;
  border-radius: 999px;
  background: #fbf8f1;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #bf4028;
  text-align: center;
}

.setu-ai__disclaimer {
  align-self: center;
  max-width: 480px;
  color: rgba(26, 22, 20, 0.5);
  text-align: center;
}

.setu-ai__disclaimer :deep(a) {
  color: inherit;
  text-decoration: underline;
}

@media (prefers-reduced-motion: reduce) {
  .setu-ai__chip:hover,
  .setu-ai__pill-send:not(:disabled):hover {
    transform: none;
  }
  .setu-ai__bubble--loading span {
    animation: none;
  }
}
</style>
