import { useEffect, useState } from 'react'
import type { Ticket, EstadoTicket, Prioridad } from '../types/ticket'
import Swal from 'sweetalert2'

const STORAGE_KEY = 'seguimiento-solicitudes-tickets'

interface NuevoTicketPayload {
  titulo: string
  descripcion: string
  prioridad: Prioridad
  responsable: string
}

// Lee tickets guardados desde localStorage
function cargarTicketsDesdeLocalStorage(): Ticket[] {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []

    const parsed = JSON.parse(data) as Ticket[]
    if (!Array.isArray(parsed)) return []

    return parsed
  } catch (error) {
    console.error('Error al leer tickets desde localStorage', error)
    return []
  }
}

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>(() =>
    cargarTicketsDesdeLocalStorage(),
  )

  // Guardar cambios en localStorage cada vez que cambie la lista
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
    } catch (error) {
      console.error('Error al guardar tickets en localStorage', error)
    }
  }, [tickets])

  function crearTicket(data: NuevoTicketPayload) {
    const ahora = new Date()

    const nuevoTicket: Ticket = {
      id: Date.now(),
      titulo: data.titulo,
      descripcion: data.descripcion,
      prioridad: data.prioridad,
      responsable: data.responsable,
      estado: 'Abierto',
      fechaCreacion: ahora.toISOString(),
      fechaUltimoCambioEstado: null,
    }

    setTickets(prev => [nuevoTicket, ...prev])
  }

  function actualizarEstado(id: number, nuevoEstado: EstadoTicket) {
    const ahora = new Date()

    // Buscar el ticket actual
    const ticketActual = tickets.find(t => t.id === id)
    if (!ticketActual) return

    // Si el estado es el mismo, no hacemos nada
    if (ticketActual.estado === nuevoEstado) {
      return
    }

    // No permitir volver a "Abierto" desde otro estado
    if (nuevoEstado === 'Abierto' && ticketActual.estado !== 'Abierto') {
      const mensajesPorEstado: Record<EstadoTicket, string> = {
        Abierto: 'Ticket Abierto',
        'En Proceso': 'Ticket en Proceso',
        Resuelto: 'Ticket Resuelto',
        Cerrado: 'Ticket Cerrado',
      }

      Swal.fire({
        icon: 'warning',
        title: 'Cambio no permitido',
        text: mensajesPorEstado[ticketActual.estado],
      })

      return
    }

    // Actualizar lista de tickets
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === id
          ? {
              ...ticket,
              estado: nuevoEstado,
              fechaUltimoCambioEstado: ahora.toISOString(),
            }
          : ticket,
      ),
    )

    // Mensajes según el nuevo estado
    let mensaje = ''

    switch (nuevoEstado) {
      case 'En Proceso':
        mensaje = 'Alguien trabaja en el ticket'
        break
      case 'Resuelto':
        mensaje = 'Solución encontrada'
        break
      case 'Cerrado':
        mensaje = 'Aceptado por el creador'
        break
      default:
        mensaje = ''
    }

    if (mensaje) {
      Swal.fire({
        icon: 'info',
        title: 'Estado actualizado',
        text: mensaje,
      })
    }
  }

  function eliminarTicket(id: number) {
    setTickets(prev => prev.filter(ticket => ticket.id !== id))
  }

  function eliminarTodos() {
    setTickets([])
  }

  return {
    tickets,
    crearTicket,
    actualizarEstado,
    eliminarTicket,
    eliminarTodos,
  }
}
