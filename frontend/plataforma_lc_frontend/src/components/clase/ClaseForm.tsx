import React, { useEffect, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import type { Clase } from '../../types/Clase'

interface ClaseFormProps {
  onSubmit: (clase: Clase) => Promise<void> | void
  inicial?: Clase
}

function ClaseForm({ onSubmit, inicial }: ClaseFormProps) {
  const [cursoId, setCursoId] = useState<number | ''>('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => {
    if (inicial) {
      setCursoId(inicial.id_curso)
      const fechaObj = new Date(inicial.fecha!)
      setFecha(fechaObj.toISOString().split('T')[0])
      setDescripcion(inicial.descripcion || '')
    } else {
      setCursoId('')
      setFecha(new Date().toISOString().split('T')[0])
      setDescripcion('')
    }
  }, [inicial])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cursoId === '') {
      alert('Por favor, ingresa el ID del curso.')
      return
    }
    const datos: Clase = {
      ...(inicial?.id && { id: inicial.id }),
      id_curso: Number(cursoId),
      fecha: new Date(fecha),
      descripcion
    }
    onSubmit(datos)
  }

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1, minWidth: { sm: 400 } }}
    >
      <TextField
        label="ID del Curso"
        type="number"
        variant="outlined"
        fullWidth
        required
        value={cursoId}
        onChange={(e) => setCursoId(e.target.value !== '' ? Number(e.target.value) : '')}
      />
      <TextField
        label="Fecha"
        type="date"
        variant="outlined"
        fullWidth
        required
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <TextField
        label="Descripción"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {inicial ? 'Guardar Cambios' : 'Registrar Clase'}
      </Button>
    </Box>
  )
}

export default ClaseForm