import { RefObject, useEffect, useState } from 'react'

function useIntersectionObserver(ref: RefObject<HTMLElement>, {threshold = 0.1, root = null, rootMargin = '0px'}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const updateEntry = ([entries]: IntersectionObserverEntry[]):void => {
    setEntry(entries)
  }
  useEffect(() => {
    const node = ref?.current
    const hasIOSupport = !!window.IntersectionObserver
    if (!hasIOSupport || !node) return
    const observerParams = {threshold, root, rootMargin}
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref.current, root, rootMargin, JSON.stringify(threshold)])
  return entry
}

export default useIntersectionObserver