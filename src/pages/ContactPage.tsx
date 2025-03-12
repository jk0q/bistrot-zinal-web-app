import React from 'react'
import { Container, Title, Stack, Grid, TextInput, Textarea, Button, Text, Group } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function ContactPage() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      name: (value) => (value.length < 2 ? 'Le nom doit contenir au moins 2 caractères' : null),
      message: (value) => (value.length < 10 ? 'Le message doit contenir au moins 10 caractères' : null),
    },
  })

  const handleSubmit = form.onSubmit((values) => {
    console.log(values)
    // Ici nous ajouterons plus tard la logique d'envoi du formulaire
  })

  return (
    <Container size="lg">
      <Stack gap="xl">
        <Title order={1} ta="center">Contact</Title>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Title order={2}>Nos Coordonnées</Title>
              <Text>Route de Zinal 42</Text>
              <Text>3961 Zinal</Text>
              <Text>Téléphone: +41 27 475 XX XX</Text>
              <Text>Email: info@bistrotzinal.ch</Text>
              <Text>
                Horaires:
                <br />
                Tous les jours de 9h à 23h
              </Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <Title order={2}>Envoyez-nous un message</Title>
                
                <TextInput
                  label="Nom"
                  placeholder="Votre nom"
                  {...form.getInputProps('name')}
                />

                <TextInput
                  label="Email"
                  placeholder="votre@email.com"
                  {...form.getInputProps('email')}
                />

                <Textarea
                  label="Message"
                  placeholder="Votre message"
                  minRows={4}
                  {...form.getInputProps('message')}
                />

                <Group justify="flex-end">
                  <Button type="submit">Envoyer</Button>
                </Group>
              </Stack>
            </form>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  )
}