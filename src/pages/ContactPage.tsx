import React, { useState } from 'react'

interface FormValues {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactPage() {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {}
    if (values.name.length < 2) {
      errors.name = 'Le nom doit contenir au moins 2 caractères'
    }
    if (!/^\S+@\S+$/.test(values.email)) {
      errors.email = 'Email invalide'
    }
    if (values.message.length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères'
    }
    return errors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validate(formValues)
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      console.log(formValues)
      // Ici nous ajouterons plus tard la logique d'envoi du formulaire
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>Contact</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Nos Coordonnées</h2>
            <p style={{ margin: 0 }}>Route de Zinal 42</p>
            <p style={{ margin: 0 }}>3961 Zinal</p>
            <p style={{ margin: 0 }}>Téléphone: +41 27 475 XX XX</p>
            <p style={{ margin: 0 }}>Email: info@bistrotzinal.ch</p>
            <p style={{ margin: 0 }}>
              Horaires:
              <br />
              Tous les jours de 9h à 23h
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Envoyez-nous un message</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label htmlFor="name" style={{ fontWeight: 'bold' }}>Nom</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Votre nom"
                  value={formValues.name}
                  onChange={handleChange}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
                {formErrors.name && (
                  <span style={{ color: 'red', fontSize: '0.875rem' }}>{formErrors.name}</span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formValues.email}
                  onChange={handleChange}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
                {formErrors.email && (
                  <span style={{ color: 'red', fontSize: '0.875rem' }}>{formErrors.email}</span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label htmlFor="message" style={{ fontWeight: 'bold' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Votre message"
                  value={formValues.message}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
                {formErrors.message && (
                  <span style={{ color: 'red', fontSize: '0.875rem' }}>{formErrors.message}</span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#228be6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}