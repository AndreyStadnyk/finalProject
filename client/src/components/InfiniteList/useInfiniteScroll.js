import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

const useInfiniteScroll = (handler) => {
  const isFetching = useSelector(state => state.posts.pending)

  const dispatch = useDispatch()

  const pageNumber = useSelector(state => {
    return state.posts.pageNumber
  })

  const totalPages = useSelector(state => {
    return state.posts.totalPages
  })

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!isFetching) return

    handler(() => {
      console.log('called back')
    })
  }, [handler, isFetching])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleScroll () {
    if (pageNumber >= totalPages - 1) return
    if ((window.innerHeight + document.documentElement.scrollTop) / document.documentElement.offsetHeight < 0.85 || isFetching) return
    dispatch(handler(pageNumber + 1))
  }

  return isFetching
}

export default useInfiniteScroll