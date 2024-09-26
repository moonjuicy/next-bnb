import { DetailFilterType, FilterProps } from '../interface';
import { atom } from 'recoil';
export const detailFilterAtom = atom<null | DetailFilterType>({
  key: 'detailFilter',
  default: null,
})

export const filterState = atom<FilterProps>({
  key: 'filter',
  default: {
    location: '',
    checkIn: '',
    checkOut: '',
    guest: 0,
  },
})
