import { motion } from 'motion/react'

type TabsProps<T extends string> = {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  'aria-label': string
}

export function Tabs<T extends string>({ options, value, onChange, ...props }: TabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={props['aria-label']}
      className="bg-off-white/10 inline-flex items-center gap-1 rounded-full p-1"
    >
      {options.map((option) => {
        const isActive = option.value === value

        return (
          <motion.button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors motion-reduce:transition-none ${
              isActive ? 'bg-off-white text-brown-deep' : 'text-off-white/70 hover:text-off-white'
            }`}
          >
            {option.label}
          </motion.button>
        )
      })}
    </div>
  )
}
