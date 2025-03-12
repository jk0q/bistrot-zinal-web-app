import React from 'react'
import { Container, Title, Text, Stack, Image } from '@mantine/core'

export default function HomePage() {
  return (
    <Container size="lg">
      <Stack gap="xl" align="center">
        <Title order={1}>Bienvenue au Bistrot de Zinal</Title>
        <Image
          src="https://placehold.co/800x400?text=Bistrot+de+Zinal"
          alt="Façade du Bistrot de Zinal"
          height={400}
          width={800}
        />
        <Text size="lg" ta="center">
          Découvrez notre cuisine authentique et chaleureuse au cœur des Alpes valaisannes.
        </Text>
        <Text ta="center">
          Ouvert tous les jours de 9h à 23h
          <br />
          Route de Zinal 42, 3961 Zinal
        </Text>
      </Stack>
    </Container>
  )
}