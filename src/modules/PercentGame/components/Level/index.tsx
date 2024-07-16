import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { curExpSelector, curLevelSelector } from 'modules/PercentGame/selectors'
import { getTotalExp, getPercentExp } from 'modules/PercentGame/utils/exp'
import { showModalInfo } from 'modules/PercentGame/utils/modal'

import { Help as HelpIcon } from 'components/Icons/Game'
import Progress from 'components/Progress'
import GainExp from 'modules/PercentGame/components/Guide/GainExp'

const modalFuncProps = {
  title: 'How to get exp',
  content: <GainExp />,
}

const modalProps = {
  okButtonProps: {
    style: { display: 'none ' },
  },
}

const Level = () => {
  const curExp = useSelector(curExpSelector)
  const curLevel = useSelector(curLevelSelector)
  const { total: totalExp } = useMemo(() => getTotalExp(curLevel), [curLevel])
  const percent = useMemo(
    () =>
      getPercentExp({
        curExp,
        totalExp,
      }),
    [curExp, totalExp],
  )
  const onOpenGuide = useCallback(() => {
    const modalInfo = showModalInfo(modalFuncProps, true)
    if (modalInfo) {
      const { modal, closeModal } = modalInfo
      modal.update({
        ...modalProps,
        content: <GainExp closeModal={closeModal} />,
      })
    }
  }, [])
  return (
    <div className="flex-1 md:ml-3 md:mr-4">
      <div className="flex items-center text-color-white">
        <HelpIcon
          size={16}
          onClick={onOpenGuide}
          classNames="mr-2 cursor-pointer guide-help-icon"
        />
        <span className="mr-2">Level {curLevel}: </span>
        <span className="text-sm">
          <span>{curExp}</span>
          <span className="mx-1">/</span>
          <span>{totalExp}</span>
        </span>
      </div>
      <Progress
        percent={percent}
        offTransition={true}
        showInfo={false}
        strokeWidth={10}
      />
    </div>
  )
}

export default Level
