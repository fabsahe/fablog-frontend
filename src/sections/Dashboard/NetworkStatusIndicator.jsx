import React from 'react'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import WifiIcon from '@mui/icons-material/Wifi'
import { useOnline } from '../../store/networkStore'

export default function NetworkStatusIndicator() {
  const isOnline = useOnline()

  return (
    <IconButton color="inherit">
      {isOnline ? (
        <Badge color="success" variant="dot">
          <WifiIcon />
        </Badge>
      ) : (
        <Badge badgeContent="❌" color="">
          <WifiIcon />
        </Badge>
      )}
    </IconButton>
  )
}
