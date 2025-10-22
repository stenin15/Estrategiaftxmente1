import * as React from "react"

interface DialogProps {
  children: React.ReactNode
}

interface DialogTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

interface DialogContentProps {
  className?: string
  children: React.ReactNode
}

const DialogContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

const Dialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

const DialogTrigger = ({ asChild, children }: DialogTriggerProps) => {
  const { setIsOpen } = React.useContext(DialogContext)
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => setIsOpen(true),
    })
  }
  
  return (
    <button onClick={() => setIsOpen(true)}>
      {children}
    </button>
  )
}

const DialogContent = ({ className = "", children }: DialogContentProps) => {
  const { isOpen, setIsOpen } = React.useContext(DialogContext)
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => setIsOpen(false)}
      />
      <div className={`relative bg-background border rounded-lg shadow-lg max-w-4xl max-h-[90vh] overflow-auto ${className}`}>
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export { Dialog, DialogTrigger, DialogContent }