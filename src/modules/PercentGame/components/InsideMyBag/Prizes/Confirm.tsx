import React, {
  useMemo,
  useState,
  ReactNode,
  useImperativeHandle,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react'
import { Radio, Space, InputNumber, InputNumberProps } from 'antd'
import type { RadioChangeEvent } from 'antd'
import {
  Prize,
  SELL_PRIZE_OPTION,
  META_STATUS,
} from 'modules/PercentGame/types'
import type { ConfirmCutForwardRef, ConfirmDeleteForwardRef } from './type'
import {
  getSellPrize,
  getItemTextName,
  showModalConfirm,
  showModalError,
  dispatchChangeMetaStatus,
} from 'modules/PercentGame/utils'
import CrownCoin from 'components/Icons/Game/CrownCoin'

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
    <Radio value={value} className="whitespace-nowrap">
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
  { prize: Prize }
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
    if (typeof value === 'number') setCustomQuantity(value)
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
                size="middle"
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

const ConfirmCutForwardRef: ForwardRefRenderFunction<
  ConfirmCutForwardRef,
  { quantity: number }
> = ({ quantity }, forwardedRef) => {
  const [customQuantity, setCustomQuantity] = useState(1)
  const onChangeCustomQuantity: InputNumberProps['onChange'] = (value) => {
    if (typeof value === 'number') setCustomQuantity(value)
  }

  useImperativeHandle(
    forwardedRef,
    () => ({
      getCutItemValues: () => ({
        itemQuantity: customQuantity,
      }),
    }),
    [customQuantity],
  )

  return (
    <>
      <InputNumber
        min={1}
        max={quantity - 1}
        value={customQuantity}
        onChange={onChangeCustomQuantity}
        size="large"
      />
    </>
  )
}

export const confirm = ({
  title = '',
  content,
  onOk,
  isShowModalError = false,
}: {
  title?: string
  isShowModalError?: boolean
  onOk?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
}) => {
  const setPrepareStatus = () => {
    setTimeout(() => {
      dispatchChangeMetaStatus(META_STATUS.PREPARE)
    })
  }
  if (isShowModalError) {
    showModalError({
      title,
      centered: true,
      onOk: setPrepareStatus,
      onCancel: setPrepareStatus,
    })
    return
  }
  showModalConfirm({
    title,
    centered: true,
    content,
    onOk: () => onOk?.(),
    onCancel: setPrepareStatus,
  })
}

const ConfirmDelete = forwardRef(ConfirmDeleteForwardRef)
const ConfirmCut = forwardRef(ConfirmCutForwardRef)

export type { ConfirmDeleteForwardRef, ConfirmCutForwardRef }
export { ConfirmCut, ConfirmDelete }
