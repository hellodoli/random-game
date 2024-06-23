import React from 'react'
import IconWrapper from 'components/Icons/Wrapper'
import { GameIcon } from '../types'

const FairyWand = (props: GameIcon) => {
  return (
    <IconWrapper {...props}>
      <g transform="translate(0,0)">
        <path
          d="M250.53 22.03c-57.055 45.157-80.673 37.81-100.31.22 16.598 61.517 10.408 66.415-44.72 116.594 67.324-35.666 96.206-34.238 130.97 7.187-34.906-53.112-30.954-75.35 14.06-124zm18.407.126l11.688 114.938-99.875 58.094 97.75 21.093c-9.58 8.352-20.214 19.028-31.28 30.095l-.032.03L18.563 472.438v19.438h32.156L273.343 272.5c10.26-10.263 18.902-19.538 25.78-27.75l18.938 87.75 58.094-99.875 114.938 11.688-77.03-86.094 46.655-105.69-105.69 46.657-86.092-77.03zM26.875 55.938c33.765 27.66 35.21 42.767 30.75 87.78 18.975-53.73 27.964-67.297 64.5-82C82.972 71.094 66.21 73 26.875 55.94zm54.75 102.406c24.955 27.012 26.97 43.684 24.25 72.062 14.775-34.45 22.072-45.66 55.625-64.312-34.56 11.183-45.5 10.22-79.875-7.75zm325.594 95c9.27 51.694-4.61 73.708-32.845 106.687 43.3-37.043 57.852-44.284 96.844-38.75-38.597-11.457-47.426-20.624-64-67.936zm-55.658 72.812c-18.705 68.79-45.304 83.944-107.625 70.125 54.126 20.1 56.34 21.07 53.532 85.25 24.757-55.42 46.49-52.217 95.06-37.217-41.775-31.838-45.71-48.97-40.967-118.157zm109.344 55.97c-15.32 17.994-22.932 17.49-43.812 9.343 22.828 18.444 17.596 34.024 10.844 59.405 16.05-19.12 23.516-25.237 50.312-12.688-22.86-21.342-27.13-29.857-17.344-56.062z"
          fill="#fff"
          fillOpacity={1}
        ></path>
      </g>
    </IconWrapper>
  )
}

export default FairyWand
