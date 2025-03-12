import React from 'react';
import { Container, Title, Text, Stack, Button, Group } from '@mantine/core';

export default function App() {
  return (
    <Container size="lg" pt={50}>
      <Stack gap="xl" align="center">
        <Title order={1}>Bistrot de Zinal</Title>
        <Text size="lg" ta="center">
          Application en cours de déploiement sur GitHub Pages.
        </Text>
        <Text size="md" ta="center">
          Si vous voyez cette page, le déploiement fonctionne correctement !
        </Text>
        <Group>
          <Button color="blue">Accueil</Button>
          <Button color="green">Menu</Button>
          <Button color="red">Contact</Button>
        </Group>
      </Stack>
    </Container>
  );
}
