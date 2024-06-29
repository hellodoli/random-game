import React from 'react'
import { Form } from 'antd'
import PickColor from './PickColor'

interface Props {
  rules: string[][]
  setIsDirty: (isDirty: boolean) => void
  applyThemeColor: (pro: string, color: string) => void
}

const defaultRules: string[][] = []

const getColorLabel = (pro: string) => {
  const proArr = pro.split('-').filter((item) => item && item !== 'color')
  const proString = proArr.join(' ')
  return proString.toUpperCase()
}

const Custom = ({
  rules = defaultRules,
  applyThemeColor,
  setIsDirty,
}: Props) => {
  return (
    <>
      {rules.map((rule) => {
        const pro = rule[0]
        const color = rule[1]
        return (
          <Form.Item key={pro} label={getColorLabel(pro)}>
            <PickColor
              initColor={color}
              pro={pro}
              setIsDirty={setIsDirty}
              applyThemeColor={applyThemeColor}
            />
          </Form.Item>
        )
      })}
    </>
  )
}

export default Custom
