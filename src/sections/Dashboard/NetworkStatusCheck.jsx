import React from 'react'
import { useNetworkStatus } from '../../hooks/useNetworkStatus'
import { useNetworkActions } from '../../store/networkStore'

export default function NetworkStatusCheck() {
  const isOnline = useNetworkStatus()
  const firstUpdate = React.useRef(true)

  const { changeNetworkStatus } = useNetworkActions()

  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    changeNetworkStatus(isOnline)
  }, [isOnline])

  return null
}
