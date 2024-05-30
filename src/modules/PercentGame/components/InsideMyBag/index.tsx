import React from 'react'
import Filters from './Filters'
import Prizes from './Prizes'
import Buttons from './Buttons'
import Worker from './Worker'

const InsideMyBag = () => {
  return (
    <div>
      <Worker />
      <Filters />
      <Prizes />
      <Buttons />
    </div>
  )
}

export default InsideMyBag
