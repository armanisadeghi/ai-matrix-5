import { useRef, type RefObject } from 'react'

export function useSubmit(): {
  formRef: RefObject<HTMLFormElement>
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
} {
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (
      !event.shiftKey &&
      !event.nativeEvent.isComposing &&
      event.key === 'Enter'
    ) {
      formRef.current?.requestSubmit()
      event.preventDefault()
    }
  }

  return { formRef, onKeyDown: handleKeyDown }
}
