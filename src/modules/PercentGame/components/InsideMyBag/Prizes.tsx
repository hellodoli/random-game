import React, {
  useCallback,
  memo,
  useMemo,
  useState,
  ReactNode,
  useRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Radio, Space, InputNumber, InputNumberProps } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { getState } from 'utils/reduxStore'
import {
  PRIZE_VIEW_OPEN_FROM,
  Prize,
  SELL_PRIZE_OPTION,
} from 'modules/PercentGame/types'
import { isSellingSelector } from 'modules/PercentGame/selectors'
import { actions } from 'modules/PercentGame/slices'
import PrizeView from 'modules/PercentGame/components/PrizeView'
import {
  showModalConfirm,
  getSellPrize,
  getItemTextName,
} from 'modules/PercentGame/utils'
import CrownCoin from 'components/Icons/Game/CrownCoin'

interface ConfirmDeleteForwardRef {
  getDeleteItemValues: () => {
    type: SELL_PRIZE_OPTION
    itemQuantity: number
    customQuantity: number
  }
}

interface ConfirmDeleteProps {
  prize: Prize
}

const CoinIcon = () => (
  <CrownCoin
    size={20}
    classNames="coin-icon"
    fill={'var(--color-gradient-gold-to)'}
    marginLeft={2}
  />
)

const LayoutQuantity = ({
  quantity,
  price,
  renderLeft,
  isHiddenLeft = false,
  leftTitle = '',
  value,
  children,
}: {
  value: SELL_PRIZE_OPTION
  quantity: number
  price: number
  isHiddenLeft?: boolean
  renderLeft?: () => ReactNode
  children?: ReactNode
  leftTitle?: string
}) => {
  return (
    <Radio value={value}>
      <span className="flex items-center">
        {isHiddenLeft ? null : renderLeft ? (
          renderLeft()
        ) : (
          <span className="w-16">{leftTitle}</span>
        )}
        <span
          className="flex items-center ml-1"
          data-quantity={quantity}
          data-price={price}
        >
          {children || (
            <>
              <span>(</span>
              <span>{`${quantity} ${getItemTextName(
                quantity,
              )} = ${price}`}</span>
              <CoinIcon />
              <span>)</span>
            </>
          )}
        </span>
      </span>
    </Radio>
  )
}

const ConfirmDeleteForwardRef: ForwardRefRenderFunction<
  ConfirmDeleteForwardRef,
  ConfirmDeleteProps
> = (props, forwardedRef) => {
  const { prize } = props
  const { gradientSet, number: quantity = 0 } = prize
  const { priceAll, pricePerOne } = useMemo(
    () => getSellPrize(gradientSet, quantity),
    [prize],
  )
  const [value, setValue] = useState(SELL_PRIZE_OPTION.ONE)
  const [customQuantity, setCustomQuantity] = useState(1)
  const customPrice = customQuantity * pricePerOne

  useImperativeHandle(
    forwardedRef,
    () => ({
      getDeleteItemValues: () => {
        return {
          type: value,
          itemQuantity: quantity,
          customQuantity,
        }
      },
    }),
    [value, quantity, customQuantity],
  )

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  const onChangeCustomQuantity: InputNumberProps['onChange'] = (value) => {
    if (typeof value === 'number') {
      setCustomQuantity(value)
    }
  }

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <LayoutQuantity
          leftTitle="One item:"
          quantity={1}
          price={pricePerOne}
          value={SELL_PRIZE_OPTION.ONE}
        />
        <LayoutQuantity
          leftTitle="All item:"
          quantity={quantity}
          price={priceAll}
          value={SELL_PRIZE_OPTION.ALL}
        />
        <LayoutQuantity
          leftTitle="Custom:"
          quantity={customQuantity}
          price={customPrice}
          value={SELL_PRIZE_OPTION.CUSTOM}
        >
          <>
            <span>(</span>
            <span>
              <InputNumber
                min={1}
                max={quantity}
                value={customQuantity}
                onChange={onChangeCustomQuantity}
              />
            </span>
            <span className="ml-1">{`${getItemTextName(
              customQuantity,
            )} = ${customPrice}`}</span>
            <CoinIcon />
            <span>)</span>
          </>
        </LayoutQuantity>
      </Space>
    </Radio.Group>
  )
}

const ConfirmDelete = forwardRef(ConfirmDeleteForwardRef)

const Prizes = () => {
  const isSelling = useSelector(isSellingSelector)
  const dispatch = useDispatch()
  const ref = useRef<ConfirmDeleteForwardRef>(null)

  const onClickPrizeItem = useCallback(
    (id: string) => {
      if (!isSelling) return
      const state = getState()
      const prize = state.percentGame?.prizes?.[id]
      showModalConfirm({
        title: 'Do you want to sell these items?',
        centered: true,
        content: prize ? <ConfirmDelete prize={prize} ref={ref} /> : null,
        onOk: () => {
          if (ref.current) {
            const { type, customQuantity, itemQuantity } =
              ref.current.getDeleteItemValues()
            dispatch(
              actions.sellPrize({ id, customQuantity, itemQuantity, type }),
            )
          }
        },
      })
    },
    [isSelling],
  )

  return (
    <div className="section-prizes my-5">
      <PrizeView
        isBorderWrapper={false}
        from={PRIZE_VIEW_OPEN_FROM.BAG}
        onClick={onClickPrizeItem}
      />
    </div>
  )
}

export default memo(Prizes)
