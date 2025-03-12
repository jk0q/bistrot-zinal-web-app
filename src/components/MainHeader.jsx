import React from 'react'
import { Group, Title, Button } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function MainHeader() {
  return (
    <Group justify="space-between" h="100%" px="md">
      <Title order={1}>Bistrot de Zinal</Title>
      <Group>
        <Button component={Link} to="/" variant="subtle">
          Accueil
        </Button>
        <Button component={Link} to="/menu" variant="subtle">
          Menu
        </Button>
        <Button component={Link} to="/contact" variant="subtle">
          Contact
        </Button>
      </Group>
    </Group>
  )
}