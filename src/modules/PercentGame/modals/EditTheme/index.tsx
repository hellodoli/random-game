import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'antd'
import { BaseModalProps, BaseModal, useModal } from 'modules/modal'
import type { MapCssProp } from 'types/theme'
import { GLOBAL_THEME } from '../../../../constants'
import {
  getStyleSheetRules,
  resetMirrorCss,
  updateMirrortheme,
  updateMainTheme,
  getInjectedMirrorCss,
  getGlobalCss,
} from 'utils/settings'
import {
  STORAGE_KEYS,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  saveLocalStorageByCheckbox,
} from 'utils/storages'
import { actions } from 'modules/PercentGame/slices'

import Layout from './Layout'
import Custom from './Custom'
import NavButtons from './NavButtons'
import CheckBoxSetting from './CheckBoxSetting'

const EditTheme = ({ type: modalType }: BaseModalProps) => {
  const { isOpen, onClose, modalExtraProps } = useModal(modalType)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const [isDirty, setIsDirty] = useState(false)
  const [activeNav, setActiveNav] = useState(1)
  const [isResetDefault, setIsResetDefault] = useState(false)

  const mapCssProp = useRef<MapCssProp>({})
  const cached = useRef<{ isRememberTheme: boolean }>({
    isRememberTheme: !!getLocalStorage(STORAGE_KEYS.IS_REMEMBER_THEME),
  })

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

  const clearSaveTheme = useCallback(() => {
    removeLocalStorage(STORAGE_KEYS.IS_REMEMBER_THEME)
    removeLocalStorage(STORAGE_KEYS.SETTING_GLOBAL_THEME)
  }, [])

  const onCancel = useCallback(() => {
    resetMirrorCss()
    saveLocalStorageByCheckbox(
      cached.current.isRememberTheme,
      STORAGE_KEYS.IS_REMEMBER_THEME,
    )
  }, [])

  const onOk = useCallback(() => {
    // update theme
    const injectedCss = { ...mapCssProp.current }
    updateMainTheme(injectedCss)
    // save theme to localStorage
    const isRememberTheme = getLocalStorage(STORAGE_KEYS.IS_REMEMBER_THEME)
    if (isRememberTheme) {
      const theme = getGlobalCss(injectedCss)
      setLocalStorage(STORAGE_KEYS.SETTING_GLOBAL_THEME, JSON.stringify(theme))
    } else {
      clearSaveTheme()
    }
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

  const resetDefault = useCallback(() => {
    if (isResetDefault) return
    setIsDirty(true)
    setIsResetDefault(true)
    resetMirrorCss({ resetDefault: true })
    updateMapCssProp(getInjectedMirrorCss(GLOBAL_THEME))
  }, [updateMapCssProp])

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
          <div className="section-border p-2 rounded">
            <NavButtons
              activeNav={activeNav}
              resetDefault={resetDefault}
              setActiveNav={setActiveNav}
            />
            <div className="p-2 mt-2">
              <CheckBoxSetting setIsDirty={setIsDirty} />
            </div>
          </div>
        </div>

        <div className="h-full lg:overflow-x-hidden lg:overflow-y-auto">
          <Form form={form} layout="horizontal">
            <Custom
              applyThemeColor={applyThemeColor}
              setIsDirty={setIsDirty}
              rules={getRules(activeNav)}
              isResetDefault={isResetDefault}
            />
          </Form>
        </div>
      </Layout>
    </BaseModal>
  )
}

export default EditTheme
