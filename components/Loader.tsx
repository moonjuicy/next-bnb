import cn from 'classnames'

export default function Loader({ className }: { className?: string }) {
  return (
    <div className={cn('flex gap-4 justify-center', className)}>
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
      <div className="w-2 h-2 rounded-full bg-gray-500 animate-ping" />
    </div>
  )
}