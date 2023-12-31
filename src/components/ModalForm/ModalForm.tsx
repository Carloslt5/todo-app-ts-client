import { ReactNode } from 'react'

const ModalForm = ({ children }: { children: ReactNode }) => {
  return (
    < div className='fixed inset-0 top-0 left-0 right-0 flex items-start justify-center max-w-full max-h-full p-4 overflow-hidden bg-opacity-50 bg-slate-900 dark:bg-zinc-800 dark:bg-opacity-50'>

      {children}

    </div>
  )
}

export default ModalForm