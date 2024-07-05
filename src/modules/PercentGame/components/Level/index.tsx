import React, { useMemo } from 'react'
import { useSelector /*useDispatch*/ } from 'react-redux'
import { curExpSelector, curLevelSelector } from 'modules/PercentGame/selectors'
import { getTotalExp, getPercentExp } from 'modules/PercentGame/utils/exp'
// import { actions } from 'modules/PercentGame/slices'
import { Help as HelpIcon } from 'components/Icons/Game'
import Progress from 'components/Progress'

const Level = () => {
  // const dispatch = useDispatch()
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
  return (
    <div className="flex-1 ml-3 mr-4">
      <div className="flex items-center text-color-white">
        <HelpIcon
          size={16}
          onClick={() => {}}
          classNames="mr-2 cursor-pointer"
        />
        <span className="mr-2">Level {curLevel}: </span>
        <span className="text-sm">
          <span>{curExp}</span>
          <span className="mx-1">/</span>
          <span>{totalExp}</span>
        </span>
      </div>
      <Progress percent={percent} offTransition={true} showInfo={false} />
    </div>
  )
}

export default Level
