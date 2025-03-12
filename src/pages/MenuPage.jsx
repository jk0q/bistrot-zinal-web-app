import React from 'react'
import { Container, Title, Stack, Grid, Card, Text, Badge } from '@mantine/core'

const menuItems = [
  {
    name: "Fondue Moitié-Moitié",
    description: "Fondue traditionnelle au Gruyère et Vacherin",
    price: 25,
    category: "Spécialités"
  },
  {
    name: "Raclette",
    description: "Raclette traditionnelle servie avec pommes de terre et condiments",
    price: 28,
    category: "Spécialités"
  },
  {
    name: "Croûte au Fromage",
    description: "Pain grillé, fromage fondu, jambon et œuf",
    price: 22,
    category: "Spécialités"
  },
  {
    name: "Rösti Montagnard",
    description: "Rösti avec lard, fromage et œuf au plat",
    price: 24,
    category: "Plats Principaux"
  }
]

export default function MenuPage() {
  return (
    <Container size="lg">
      <Stack gap="xl">
        <Title order={1} ta="center">Notre Carte</Title>
        
        <Grid>
          {menuItems.map((item, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="sm">
                  <Title order={3}>{item.name}</Title>
                  <Badge>{item.category}</Badge>
                  <Text size="sm" c="dimmed">{item.description}</Text>
                  <Text fw={700}>{item.price} CHF</Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Container>
  )
}