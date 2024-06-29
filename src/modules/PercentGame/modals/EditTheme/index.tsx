import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'antd'
import { BaseModalProps, BaseModal, useModal } from 'modules/modal'
import {
  getStyleSheetRules,
  resetMirrorCss,
  updateMirrortheme,
  updateMainTheme,
  MapCssProp,
} from 'utils/settings'
import { actions } from 'modules/PercentGame/slices'
import Layout from './Layout'
import Custom from './Custom'

const isMirror = true

const colorGlobalRules = getStyleSheetRules(
  {},
  {
    colorsGlobal: true,
    colorsGradient: false,
    global: false,
  },
  isMirror,
)

const colorGradientRules = getStyleSheetRules(
  {},
  {
    colorsGlobal: false,
    colorsGradient: true,
    global: false,
  },
  isMirror,
)

const navButtons = [
  { id: 1, text: 'global colors' },
  { id: 2, text: 'gradient colors' },
]

const getRules = (activeId: number) => {
  switch (activeId) {
    case 1:
      return colorGlobalRules
    case 2:
      return colorGradientRules
    default:
      return colorGlobalRules
  }
}

const EditTheme = ({ type: modalType }: BaseModalProps) => {
  const { isOpen, onClose, modalExtraProps } = useModal(modalType)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)
  const [activeNav, setActiveNav] = useState(navButtons[0].id)
  const mapCssProp = useRef<MapCssProp>({})

  const onCancel = useCallback(() => {
    resetMirrorCss()
  }, [])

  const onOk = useCallback(() => {
    updateMainTheme({ ...mapCssProp.current })
  }, [])

  const applyThemeColor = useCallback((pro: string, color: string) => {
    const css = { [pro]: color }
    updateMirrortheme(css)
    mapCssProp.current = {
      ...mapCssProp.current,
      ...css,
    }
  }, [])

  useEffect(() => {
    return () => {
      dispatch(actions.turnOffIsMirror())
    }
  }, [])

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="game-module-percent-game-modal content-scrollable content-scrollable-always-full full-screen split split-left"
      isHideCancel={false}
      isDisabledOk={!isDirty}
      modalExtraProps={modalExtraProps}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Layout>
        <div className="mb-10">
          {navButtons.map(({ id, text }) => {
            const isActive = activeNav === id
            return (
              <Button
                key={id}
                type="primary"
                className={`${
                  isActive ? 'btn-linear' : 'btn-outline'
                } uppercase mt-2 lg:mt-0 lg:ml-2 first:ml-0 first:mt-0 w-full lg:w-auto`}
                style={{ ...(isActive && { color: '#fff' }) }}
                onClick={() => setActiveNav(id)}
              >
                {text}
              </Button>
            )
          })}
        </div>
        <Form form={form} layout="horizontal">
          <Custom
            applyThemeColor={applyThemeColor}
            setIsDirty={setIsDirty}
            rules={getRules(activeNav)}
          />
        </Form>
      </Layout>
    </BaseModal>
  )
}

export default EditTheme
