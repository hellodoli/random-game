import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'antd'
import { BaseModalProps, BaseModal, useModal } from 'modules/modal'
import {
  getStyleSheetRules,
  resetMirrorCss,
  updateMirrortheme,
  updateMainTheme,
  getInjectedMirrorCss,
  DEFAULT_MIRROR_CSS,
} from 'utils/settings'
import type { MapCssProp } from 'utils/settings'
import { actions } from 'modules/PercentGame/slices'
import Layout from './Layout'
import Custom from './Custom'

const navButtons = [
  { id: 1, text: 'global colors' },
  { id: 2, text: 'gradient colors' },
]

const EditTheme = ({ type: modalType }: BaseModalProps) => {
  const { isOpen, onClose, modalExtraProps } = useModal(modalType)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)
  const [activeNav, setActiveNav] = useState(navButtons[0].id)
  const [isResetDefault, setIsResetDefault] = useState(false)
  const mapCssProp = useRef<MapCssProp>({})

  const colorGlobalRules = useMemo(
    () =>
      getStyleSheetRules(
        {},
        {
          colorsGlobal: true,
          colorsGradient: false,
          global: false,
        },
        true,
      ),
    [activeNav, isResetDefault],
  )

  const colorGradientRules = useMemo(
    () =>
      getStyleSheetRules(
        {},
        {
          colorsGlobal: false,
          colorsGradient: true,
          global: false,
        },
        true,
      ),
    [activeNav, isResetDefault],
  )

  const onCancel = useCallback(() => {
    resetMirrorCss()
  }, [])

  const onOk = useCallback(() => {
    updateMainTheme({ ...mapCssProp.current })
  }, [])

  const updateMapCssProp = useCallback((cssProp: MapCssProp) => {
    mapCssProp.current = {
      ...mapCssProp.current,
      ...cssProp,
    }
  }, [])

  const applyThemeColor = useCallback(
    (pro: string, color: string) => {
      const cssProp = { [pro]: color }
      updateMirrortheme(cssProp)
      updateMapCssProp(cssProp)
      setIsResetDefault(false)
    },
    [updateMapCssProp],
  )

  const getRules = useCallback(
    (activeId: number) => {
      switch (activeId) {
        case 1:
          return colorGlobalRules
        case 2:
          return colorGradientRules
        default:
          return colorGlobalRules
      }
    },
    [colorGlobalRules, colorGradientRules],
  )

  const resetDefault = () => {
    if (isResetDefault) return
    setIsDirty(true)
    setIsResetDefault(true)
    resetMirrorCss({ resetDefault: true })
    updateMapCssProp(getInjectedMirrorCss(DEFAULT_MIRROR_CSS))
  }

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
          <div className="lg:-m-1">
            <Button
              type="text"
              className="uppercase w-full lg:w-auto lg:m-1 mt-2"
              onClick={resetDefault}
            >
              Reset to default
            </Button>
            {navButtons.map(({ id, text }) => {
              const isActive = activeNav === id
              return (
                <Button
                  key={id}
                  type="primary"
                  className={`${
                    isActive ? 'btn-linear' : 'btn-outline'
                  } uppercase w-full lg:w-auto lg:m-1 mt-2`}
                  style={{ ...(isActive && { color: '#fff' }) }}
                  onClick={() => setActiveNav(id)}
                >
                  {text}
                </Button>
              )
            })}
          </div>
        </div>
        <Form form={form} layout="horizontal">
          <Custom
            applyThemeColor={applyThemeColor}
            setIsDirty={setIsDirty}
            rules={getRules(activeNav)}
            isResetDefault={isResetDefault}
          />
        </Form>
      </Layout>
    </BaseModal>
  )
}

export default EditTheme
