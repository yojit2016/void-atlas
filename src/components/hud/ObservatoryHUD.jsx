import React from 'react'
import ScanOverlay from './ScanOverlay'
import ObservatoryStatus from './ObservatoryStatus'
import ObservatoryStats from './ObservatoryStats'
import AtlasClock from './AtlasClock'
import SectorIndicator from './SectorIndicator'

export default function ObservatoryHUD({ count }) {
  return (
    <>
      <ScanOverlay />
      <ObservatoryStatus count={count} />
      <ObservatoryStats />
      <AtlasClock />
      <SectorIndicator />
    </>
  )
}
