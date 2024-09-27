import RedditFirstAttach from '@/components/RedditFirstAttach'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useRef, useState, createContext, useContext } from 'react'
let options = {
  root: document.querySelector('scroll-area'), // 대상 객체의 가기성 확인.
  rootMargin: '0px', // root 요소의 범위를 확장할 수 있음.
  threshold: 1.0, // 콜백 실행될 타겟 요소의 가시성 퍼센티지를 나타냄. 어느정도 보여졌는 지에 따라 콜백 호출이 가능.
}

export default function CustomIntersectionObsever() {
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const pageRef = useRef(0)
  const elementRef = useRef(null)

  const fetchMoreItems = async () => {
    // 새로운 데이터를 불러올 API 엔드포인트에 요청을 보냅니다.
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${pageRef.current * 10}`,
    )

    // 응답 데이터를 JSON 형식으로 파싱합니다.
    const data = await response.json()

    // 만약 더 이상 불러올 상품이 없다면 hasMore 상태를 false로 설정합니다.
    if (data.products.length === 0) {
      setHasMore(false)
    } else {
      // 불러온 데이터를 현재 상품 목록에 추가합니다.
      // 이전 상품 목록(prevProducts)에 새로운 데이터(data.products)를 연결합니다.
      setProducts((prevProducts) => [...prevProducts, ...data.products])

      // 페이지 번호를 업데이트하여 다음 요청에 올바른 skip 값을 사용합니다.
      pageRef.current += 1
    }
  }

  const onIntersection = (entries) => {
    const firstEntry = entries[0]

    // 첫 번째 entry가 화면에 나타나고 더 많은 데이터를 불러올 수 있는 상태(hasMore)인 경우 fetchMoreItems 함수를 호출.
    if (firstEntry.isIntersecting && hasMore) {
      fetchMoreItems()
    }
  }

  // 컴포넌트 렌더링 이후에 실행되며 Intersection Observer를 설정
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, options)

    //elementRef가 현재 존재하면 observer로 해당 요소를 관찰.
    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    // 컴포넌트가 언마운트되거나 더 이상 관찰할 필요가 없을 때(observer를 해제할 때)반환.
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [hasMore])

  return (
    <>
      <ScrollArea id='scroll-area'>
        <RedditFirstAttach />
        {products.map((item, index) => (
          <span key={index} style={{ width: '600px', margin: '0 auto' }} className={'mb-2'}>
            <img src={item.thumbnail} alt='상품 이미지' style={{ width: '100%', margin: '10px' }} />
            {item.description}
            {item.price}
          </span>
        ))}
        {hasMore && (
          <div ref={elementRef} style={{ textAlign: 'center' }}>
            Load More Items
          </div>
        )}
      </ScrollArea>
    </>
  )
}
