import { useEffect, useRef, type PropsWithChildren } from 'react'

type ModalProps = PropsWithChildren<{
  open: boolean
  onClose: () => void
  titleId: string
}>

export function Modal({ open, onClose, titleId, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    dialogRef.current?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="bg-brown-deep/60 fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="rounded-editorial bg-off-white w-full max-w-md p-8 shadow-xl focus:outline-none"
      >
        {children}
      </div>
    </div>
  )
}
