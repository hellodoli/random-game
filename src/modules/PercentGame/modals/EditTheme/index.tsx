import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'antd'
import { BaseModalProps, BaseModal, useModal } from 'modules/modal'
import {
  getStyleSheetRules,
  resetMirrorCss,
  updateMirrortheme,
  updateMainTheme,
  MapCssProp,
} from 'utils/settings'
import { actions } from 'modules/PercentGame/slices'
import MirrorPreview from './MirrorPreview'
import PickColor from './PickColor'

const getMapCss = {
  colorsGlobal: true,
  colorsGradient: true,
  global: false,
}

const EditTheme = ({ type: modalType }: BaseModalProps) => {
  const { isOpen, onClose, modalExtraProps } = useModal(modalType)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [isDirty, setIsDirty] = useState(false)
  const colorRules = useMemo(() => getStyleSheetRules({}, getMapCss, true), [])
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
      className="game-module-percent-game-modal content-scrollable full-screen split split-left"
      isHideCancel={false}
      isDisabledOk={!isDirty}
      modalExtraProps={modalExtraProps}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div className="col-left">
        <Form form={form} layout="horizontal">
          {colorRules.map((rule) => {
            return (
              <Form.Item key={rule[0]} label={rule[0]}>
                <PickColor
                  initColor={rule[1]}
                  pro={rule[0]}
                  setIsDirty={setIsDirty}
                  applyThemeColor={applyThemeColor}
                />
              </Form.Item>
            )
          })}
        </Form>
      </div>
      <div className="col-right">
        <MirrorPreview />
      </div>
    </BaseModal>
  )
}

export default EditTheme
