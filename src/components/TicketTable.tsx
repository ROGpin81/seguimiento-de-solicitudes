import React from 'react'
import type { Ticket, EstadoTicket } from '../types/ticket'
import { StatusBadge } from './StatusBadge'
import { Select } from './Select'
import Swal from 'sweetalert2'

interface TicketTableProps {
  tickets: Ticket[]
  onCambiarEstado: (id: number, nuevoEstado: EstadoTicket) => void
  onEliminarTicket: (id: number) => void
  onEliminarTodos: () => void
}

function formatearFecha(fechaISO: string | null): string {
  if (!fechaISO) return '-'
  const fecha = new Date(fechaISO)
  return fecha.toLocaleString()
}

export const TicketTable: React.FC<TicketTableProps> = ({
  tickets,
  onCambiarEstado,
  onEliminarTicket,
  onEliminarTodos,
}) => {
  const handleEliminarTicket = (id: number) => {
    Swal.fire({
      title: '¿Eliminar solicitud?',
      text: 'Confirma que quieres borrar la solicitud',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        onEliminarTicket(id)
        Swal.fire({
          icon: 'success',
          title: 'Solicitud eliminada',
          text: 'La solicitud se ha borrado correctamente.',
        })
      }
    })
  }

  const handleEliminarTodos = () => {
    if (tickets.length === 0) return

    Swal.fire({
      title: '¿Eliminar lista de solicitudes?',
      text: 'Confirma que quieres borrar la lista de solicitudes',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar todo',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) {
        onEliminarTodos()
        Swal.fire({
          icon: 'success',
          title: 'Lista vacía',
          text: 'Se han borrado todas las solicitudes.',
        })
      }
    })
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Lista de solicitudes
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          No hay solicitudes registradas todavía. Crea un ticket en el
          formulario superior.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Lista de solicitudes
          </h2>
          <p className="text-xs text-slate-500">
            Administra el estado de cada ticket y realiza el seguimiento.
          </p>
        </div>

        <button
          type="button"
          onClick={handleEliminarTodos}
          className="mt-2 md:mt-0 inline-flex items-center px-3 py-2 rounded-lg bg-red-700 text-white text-xs md:text-sm font-medium shadow hover:bg-red-800 transition-colors"
        >
          Borrar lista de solicitudes
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-xs md:text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left">
              <th className="px-3 py-2">Título</th>
              <th className="px-3 py-2">Prioridad</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Responsable</th>
              <th className="px-3 py-2">Fecha creación</th>
              <th className="px-3 py-2">Fecha último cambio</th>
              <th className="px-3 py-2">Cambiar estado</th>
              <th className="px-3 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map(ticket => (
              <tr key={ticket.id} className="align-top">
                <td className="px-3 py-2">
                  <p className="font-medium text-slate-800">{ticket.titulo}</p>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {ticket.descripcion}
                  </p>
                </td>

                <td className="px-3 py-2">
                  <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                    {ticket.prioridad}
                  </span>
                </td>

                <td className="px-3 py-2">
                  <StatusBadge estado={ticket.estado} />
                </td>

                <td className="px-3 py-2">
                  <p className="text-sm text-slate-800">
                    {ticket.responsable}
                  </p>
                </td>

                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="text-xs text-slate-600">
                    {formatearFecha(ticket.fechaCreacion)}
                  </span>
                </td>

                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="text-xs text-slate-600">
                    {formatearFecha(ticket.fechaUltimoCambioEstado)}
                  </span>
                </td>

                <td className="px-3 py-2">
                  <Select
                    label=""
                    name={`estado-${ticket.id}`}
                    value={ticket.estado}
                    onChange={value =>
                      onCambiarEstado(ticket.id, value as EstadoTicket)
                    }
                    options={[
                      { value: 'Abierto', label: 'Abierto' },
                      { value: 'En Proceso', label: 'En Proceso' },
                      { value: 'Resuelto', label: 'Resuelto' },
                      { value: 'Cerrado', label: 'Cerrado' },
                    ]}
                  />
                </td>

                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => handleEliminarTicket(ticket.id)}
                    className="inline-flex items-center px-3 py-1 rounded-lg bg-red-600 text-white text-xs font-medium shadow hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
