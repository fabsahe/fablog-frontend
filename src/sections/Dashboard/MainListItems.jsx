import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EventNoteIcon from '@mui/icons-material/EventNote'
import ViewListIcon from '@mui/icons-material/ViewList'
import AddBoxIcon from '@mui/icons-material/AddBox'
import PeopleIcon from '@mui/icons-material/People'
import RecentActorsIcon from '@mui/icons-material/RecentActors'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useOnline } from '../../store/networkStore'

export default function MainListItems() {
  const [openPosts, setOpenPosts] = useState(true)
  const [openUsers, setOpenUsers] = useState(true)

  const [openDialog, setOpenDialog] = useState(false)

  const isOnline = useOnline()

  const handleClickPosts = () => {
    setOpenPosts(!openPosts)
  }

  const handleClickUsers = () => {
    setOpenUsers(!openUsers)
  }

  const handleOfflineClick = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <ListItemButton component={RouterLink} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>

      <ListItemButton onClick={handleClickPosts}>
        <ListItemIcon>
          <EventNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
        {openPosts ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openPosts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={RouterLink}
            to="/dashboard/posts"
          >
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Listado" />
          </ListItemButton>
          {isOnline ? (
            <ListItemButton
              sx={{ pl: 4 }}
              component={RouterLink}
              to="/dashboard/new-post"
            >
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Nuevo" />
            </ListItemButton>
          ) : (
            <ListItemButton sx={{ pl: 4 }} onClick={handleOfflineClick}>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Nuevo" />
            </ListItemButton>
          )}
        </List>
      </Collapse>

      <ListItemButton onClick={handleClickUsers}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
        {openUsers ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openUsers} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={RouterLink}
            to="/dashboard/users"
          >
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary="Listado" />
          </ListItemButton>
          {isOnline ? (
            <ListItemButton
              sx={{ pl: 4 }}
              component={RouterLink}
              to="/dashboard/new-user"
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Nuevo" />
            </ListItemButton>
          ) : (
            <ListItemButton sx={{ pl: 4 }} onClick={handleOfflineClick}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Nuevo" />
            </ListItemButton>
          )}
        </List>
      </Collapse>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          No hay conexión a Internet
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta función no está disponible sin conexión
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
