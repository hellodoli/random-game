import React from 'react'
import MirrorPreview from './MirrorPreview'

const Layout = ({
  children,
  isShowMirrorPreview = true,
}: {
  children: React.ReactNode
  isShowMirrorPreview?: boolean
}) => {
  return (
    <div className="flex flex-col w-full lg:overflow-hidden md:flex-row">
      <div className="col-left flex-[0_0_auto] md:w-2/5 md:flex-shrink-0 lg:overflow-x-hidden lg:overflow-y-auto">
        {children}
      </div>
      <div className="col-right flex-1 ml-0 md:ml-4">
        {isShowMirrorPreview && <MirrorPreview />}
      </div>
    </div>
  )
}

export default Layout
