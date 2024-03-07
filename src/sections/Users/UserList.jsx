import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Loader from '../../components/Loader'
import userService from '../../services/userService'
import { useUserToken, useAuthActions } from '../../store/authStore'

function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}

export default function UserList() {
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)

  const token = useUserToken()

  const { getUserToken } = useAuthActions()

  const getUsers = async () => {
    try {
      setLoading(true)
      const response = await userService.getAllUsers(token)
      const { data } = response
      setUserList(data)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUserToken()
  }, [])

  useEffect(() => {
    if (token) {
      getUsers()
    }
  }, [token])

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Paper
        sx={{
          px: 2,
          pt: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Listado de usuarios
        </Typography>

        {loading ? (
          <Loader />
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {userList &&
              userList.map((user) => (
                <Box key={user.email}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar {...stringAvatar(user.name)} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="subtitle2"
                            color="text.primary"
                          >
                            {user.role_name}
                          </Typography>
                          {` — ${user.email}`}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Box>
              ))}
          </List>
        )}
      </Paper>
    </Container>
  )
}
