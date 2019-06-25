import React, { useContext } from 'react'
import './App.scss'
import { useFixedViewport } from './hooks'
import { AppBar, Step, ImageUploader, Preset, PresetList, Exporter, SettingBlock, FormItem } from './components'
import iconAndroid from './assets/android.svg'
import iconIOS from './assets/ios.svg'
import iconWeb from './assets/web.svg'
import iconWindows from './assets/windows.svg'
import { PresetContext } from 'context'

interface IconProps {
  android: string,
  ios: string,
  web: string,
  windows: string,
  [index: string]: string
}

const ICONS: IconProps = {
  android: iconAndroid,
  ios: iconIOS,
  web: iconWeb,
  windows: iconWindows
}

const App = () => {
  useFixedViewport()

  const {
    presets,
    fillColor,
    togglePreset,
    setFillColor
  } = useContext(PresetContext)

  const presetKeys: {name: string, chosen: boolean}[] = []
  presets.forEach(n => {
    if (!presetKeys.find(m => m.name === n.name && m.chosen === n.chosen)) {
      presetKeys.push({ name: n.name, chosen: n.chosen })
    }
  })

  const isWindowsChosen = presetKeys.some(n => n.name === 'Windows' && n.chosen)

  return (
    <div id='app' className='app'>
      <AppBar />

      <main className='main'>

        <Step className='step-1' title='第 1 步：上传图片'>
          <ImageUploader />
        </Step>

        <Step className='step-2' title='第 2 步：选择预设'>
          <div className='step-2-wrapper'>
            <PresetList title='预设'>
              { presetKeys.map(n =>
                <Preset
                  key={n.name}
                  icon={ICONS[n.name.toLowerCase()]}
                  value={n.name}
                  chosen={n.chosen}
                  onClick={() => { togglePreset(n.name) }}
                />
              )}
            </PresetList>

            <SettingBlock title='Windows Tile 设定'>
              <FormItem
                id='fill-color'
                title='Fill Color'
                type='color'
                disabled={!isWindowsChosen}
                value={fillColor}
                onChange={val => {
                  setFillColor(val)
                }}
              />
            </SettingBlock>

          </div>
        </Step>

        <Step className='step-3' title='第 3 步：预览结果'>
          <Exporter />
        </Step>

      </main>
    </div>
  )
}

export default App
