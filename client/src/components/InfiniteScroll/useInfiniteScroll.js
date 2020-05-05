import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false)

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
  }, [])

  // useEffect(() => {
  //   if (!isFetching) return
  //
  //   callback(() => {
  //     console.log('called back')
  //   })
  // }, [callback, isFetching])

  function handleScroll () {
    if (pageNumber >= totalPages) return
    if ((window.innerHeight + document.documentElement.scrollTop) / document.documentElement.offsetHeight < 0.85) return
    dispatch(callback(pageNumber + 1))
    setIsFetching(true)
  }

  // return [isFetching, setIsFetching]
}

export default useInfiniteScroll