'use client'

import CategoryList from '@/components/CategoryList'
import { Loader, LoaderGrid } from '@/components/Loader'
import { GridLayout, RoomItem } from '@/components/RoomList'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { RoomType } from '@/interface'
import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const pageRef = useIntersectionObserver(ref, {})
  const isPageEnd = useRef(false)

  const fetchRoom = async ({ pageParam = 1 }) => {
    const { data } = await axios('/api/room?page=' + pageParam, {
      params: {
        limit: 12,
        page: pageParam,
      },
    })

    return data
  }

  const {
    data: rooms,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery('rooms', fetchRoom, {
    getNextPageParam: (lastPage, pages) => (lastPage?.data?.length > 0 ? lastPage.page + 1 : undefined),
  })
  useEffect(() => {
    let timeId: NodeJS.Timeout | undefined;
    if (isPageEnd.current && hasNextPage) {
      timeId = setTimeout(() => {
        fetchNextPage();
      }, 500);
    }
    return () => {
      if (timeId) clearTimeout(timeId);
    };
  }, [isPageEnd, hasNextPage, fetchNextPage]);

  
  return (
    <>
      <CategoryList />
      <GridLayout>
        {isLoading || isFetching ? (
          <LoaderGrid />
        ) : (
          rooms?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page?.data?.map((room: RoomType) => (
                <RoomItem room={room} key={room.id} />
              ))}
            </React.Fragment>
          ))
        )}
      </GridLayout>
      {(isFetching || isLoading) && <Loader className="mt-60 mb-40" />}
      <div ref={ref} className='w-full touch-none h-10 mb-10'/>
    </>
  )
}
