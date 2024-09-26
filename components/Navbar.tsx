'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { MdModeOfTravel } from 'react-icons/md'
import { RxDividerVertical } from 'react-icons/rx'
import { AiOutlineSearch } from 'react-icons/ai'

import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { AiOutlineMinusCircle } from 'react-icons/ai'

import Calendar from 'react-calendar'

import cn from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

const menus = [
  { id: 1, title: '로그인', url: '/users/login' },
  { id: 2, title: '회원가입', url: '/users/signup' },
  { id: 3, title: 'FAQ', url: '/faqs' },
]

type DetailFilterType = 'location' | 'checkIn' | 'checkOut' | 'guest'
interface FilterProps {
  location: string
  checkIn: string
  checkOut: string
  guest: number
}

export default function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [detailFilter, setDetailFilter] = useState<null | DetailFilterType>(
    null,
  )
  const [filterValue, setFilterValue] = useState<FilterProps>({
    location: '',
    checkIn: '',
    checkOut: '',
    guest: 0,
  })
  const router = useRouter()

  return (
    <nav
      className={cn(
        'border border-b-gray-20 w-full shadow-sm p-4 sm:px-10 flex justify-between items-center align-middle fixed top-0 bg-white',
        {
          '!h-44': showFilter === true,
          '!items-start': showFilter === true,
        },
      )}
    >
      <div className="grow basis-0 hidden font-semibold text-lg sm:text-xl text-rose-500 cursor-pointer sm:flex sm:gap-2">
        <MdModeOfTravel className="text-4xl my-auto" />
        <div className="my-auto">Nextbnb</div>
      </div>
      {showFilter === false ? (
        <div className="w-full sm:w-[280px] border py-1.5 border-gray-200 rounded-full shadow hover:shadow-lg cursor-pointer flex justify-between pl-6 pr-2">
          <div
            role="presentation"
            className="flex justify-center gap-1 cursor-pointer"
            onClick={() => setShowFilter(true)}
          >
            <div className="my-auto font-semibold text-sm">어디든지</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm">언제든</div>
            <RxDividerVertical className="text-gray-200 my-auto text-2xl" />
            <div className="my-auto font-semibold text-sm">게스트</div>
          </div>
          <button
            type="button"
            onClick={() => setShowFilter(true)}
            className="bg-rose-500 text-white rounded-full w-8 h-8 my-auto"
          >
            <AiOutlineSearch className="text-lg m-auto font-semibold" />
          </button>
        </div>
      ) : (
        <div className="sm:w-[340px] cursor-pointer w-full relative">
          <div className="flex justify-center gap-7 h-14 text-center items-center">
            <button
              type="button"
              className="font-semibold underline underline-offset-8"
            >
              숙소
            </button>
            <button
              type="button"
              className="text-gray-700"
              onClick={() => window.alert('서비스 준비중입니다.')}
            >
              체험
            </button>
            <button
              type="button"
              className="text-gray-700"
              onClick={() => window.alert('서비스 준비중입니다.')}
            >
              온라인 체험
            </button>
            <button
              type="button"
              className="underline underline-offset-8 text-gray-500 hover:text-black"
              onClick={() => setShowFilter(false)}
            >
              필터 닫기
            </button>
          </div>
          <div className="w-[90%] sm:max-w-3xl flex flex-col sm:flex-row border border-gray-200 rounded-lg py-4 sm:py-2 sm:rounded-full shadow-sm bg-white hover:shadow-lg cursor-pointer justify-between fixed top-20 inset-x-0 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-4 w-full relative sm:pl-2">
              <button
                type="button"
                onClick={() => setDetailFilter('location')}
                className={cn(
                  'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                  {
                    'shadow bg-white': detailFilter === 'location',
                  },
                )}
              >
                여행지
                <div className="text-gray-500 text-xs">
                  {filterValue?.location || '여행지 검색'}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter('checkIn')}
                className={cn(
                  'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                  {
                    'shadow bg-white': detailFilter === 'checkIn',
                  },
                )}
              >
                체크인
                <div className="text-gray-500 text-xs">
                  {filterValue?.checkIn || '날짜 추가'}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter('checkOut')}
                className={cn(
                  'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                  {
                    'shadow bg-white': detailFilter === 'checkOut',
                  },
                )}
              >
                체크아웃
                <div className="text-gray-500 text-xs">
                  {filterValue?.checkOut || '날짜 추가'}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDetailFilter('guest')}
                className={cn(
                  'font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left',
                  {
                    'shadow bg-white': detailFilter === 'guest',
                  },
                )}
              >
                여행자
                <div className="text-gray-500 text-xs">
                  {`${filterValue?.guest} 명` || '게스트 추가'}
                </div>
              </button>
              {detailFilter === 'location' && (
                <LocationFilter
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  setDetailFilter={setDetailFilter}
                />
              )}
              {detailFilter === 'checkIn' && (
                <CheckInFilter
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  setDetailFilter={setDetailFilter}
                />
              )}
              {detailFilter === 'checkOut' && (
                <CheckOutFilter
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  setDetailFilter={setDetailFilter}
                />
              )}
              {detailFilter === 'guest' && (
                <GuestFilter
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                  setDetailFilter={setDetailFilter}
                />
              )}
            </div>
            <button
              type="button"
              className="bg-rose-600 text-white rounded-full h-10 mx-4 sm:w-24 mt-4 sm:mt-2 md:mt-0 my-auto flex justify-center gap-1 px-3 py-2 hover:shadow hover:bg-rose-500"
              onClick={() => {
                setShowFilter(false)
                setDetailFilter(null)
              }}
            >
              <AiOutlineSearch className="font-semibold text-xl my-auto" />
              <div className="my-auto">검색</div>
            </button>
          </div>
        </div>
      )}

      <div className="grow basis-0 hidden md:flex gap-4 align-middle justify-end relative">
        <button
          type="button"
          className="font-semibold text-sm my-auto px-4 py-3 rounded-full hover:bg-gray-50"
        >
          당신의 공간을 등록해주세요
        </button>
        <button
          type="button"
          onClick={() => setShowMenu((val) => !val)}
          className="flex align-middle gap-3 rounded-full border border-gray-20 shadow-sm px-4 py-3 my-auto hover:shadow-lg"
        >
          <AiOutlineMenu />
          <AiOutlineUser />
        </button>
        {showMenu && (
          <div className="border border-gray-200 shadow-lg py-2 flex flex-col absolute top-12 bg-white w-60 rounded-lg">
            {menus?.map((menu) => (
              <button
                type="button"
                key={menu.id}
                className="h-10 hover:bg-gray-50 pl-3 text-sm text-gray-700 text-left"
                onClick={() => router.push(menu.url)}
              >
                {menu.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

interface FilterComponentProps {
  filterValue: FilterProps
  setFilterValue: React.Dispatch<React.SetStateAction<FilterProps>>
  setDetailFilter: React.Dispatch<React.SetStateAction<DetailFilterType | null>>
}

const LocationFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  return (
    <div className="absolute top-80 sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl md:w-[780px] sm:w-[640px] rounded-xl">
      <div className="text-sm font-semibold">지역으로 검색하기</div>
      <div className="flex flex-wrap gap-4 mt-4">
        {['서울', '부산', '대구', '인천', '광주', '대전', '울산']?.map(
          (value) => (
            <button
              key={value}
              type="button"
              className={cn(
                'border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-rose-500',
                {
                  'bg-rose-600 text-white': filterValue.location === value,
                },
              )}
              onClick={() => {
                setFilterValue({
                  ...filterValue,
                  location: value,
                })
                setDetailFilter('checkIn')
              }}
            >
              {value}
            </button>
          ),
        )}
      </div>
    </div>
  )
}

const CheckInFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkIn: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('checkOut')
  }

  return (
    <div className="absolute top-80 sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl md:w-[780px] sm:w-[640px] rounded-xl">
      <div className="text-sm font-semibold">체크인 날짜 설정하기</div>
      <Calendar
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={new Date()}
        defaultValue={
          filterValue.checkIn ? new Date(filterValue.checkIn) : null
        }
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </div>
  )
}

const CheckOutFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const onChange = (e: any) => {
    setFilterValue({
      ...filterValue,
      checkOut: dayjs(e).format('YYYY-MM-DD'),
    })
    setDetailFilter('guest')
  }

  return (
    <div className="absolute top-80 sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl md:w-[780px] sm:w-[640px] rounded-xl">
      <div className="text-sm font-semibold">체크아웃 날짜 설정하기</div>
      <Calendar
        className="mt-8 mx-auto"
        onChange={onChange}
        minDate={
          filterValue.checkIn ? new Date(filterValue.checkIn) : new Date()
        }
        defaultValue={
          filterValue.checkOut ? new Date(filterValue.checkOut) : null
        }
        formatDay={(locale, date) => dayjs(date).format('DD')}
      />
    </div>
  )
}

const GuestFilter = ({
  filterValue,
  setFilterValue,
  setDetailFilter,
}: FilterComponentProps) => {
  const [counter, setCounter] = useState<number>(filterValue.guest || 0)

  return (
    <div className="absolute top-[19rem] sm:top-[70px] border border-gray-200 px-8 py-10 flex flex-col bg-white w-full mx-auto inset-x-0 sm:max-w-3xl md:w-[780px] sm:w-[640px] rounded-xl">
      <div className="text-sm font-semibold">게스트 수 추가하기</div>
      <div className="mt-4 border border-gray-200 rounded-lg py-2 px-4 flex justify-between items-center">
        <div>
          <div className="font-semibold text-sm">게스트 수 추가</div>
          <div className="text-gray-500 text-xs">숙박 인원을 입력해주세요</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            className="rounded-full w-8 h-8 disabled:border-gray-200 hover:border-black"
            disabled={counter <= 0}
            onClick={() => {
              setCounter((val) => val - 1)
              setFilterValue({
                ...filterValue,
                guest: counter - 1,
              })
            }}
          >
            <AiOutlineMinusCircle
              className={cn('m-auto', { 'text-gray-200': counter <= 0 })}
            />
          </button>
          <div className="w-3 text-center">{counter}</div>
          <button
            type="button"
            className="rounded-full w-8 h-8 disabled:border-gray-200 hover:border-black"
            disabled={counter >= 20}
            onClick={() => {
              setCounter((val) => val + 1)
              setFilterValue({
                ...filterValue,
                guest: counter + 1,
              })
            }}
          >
            <AiOutlinePlusCircle
              className={cn('m-auto', { 'text-gray-200': counter >= 20 })}
            />
          </button>
        </div>
      </div>
    </div>
  )
}