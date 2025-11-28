
import React from 'react'
import type { EstadoTicket } from '../types/ticket'

interface StatusBadgeProps {
  estado: EstadoTicket
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ estado }) => {
  const base = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold'

  const colores: Record<EstadoTicket, string> = {
    Abierto: 'bg-sky-100 text-sky-700',
    'En Proceso': 'bg-amber-100 text-amber-700',
    Resuelto: 'bg-emerald-100 text-emerald-700',
    Cerrado: 'bg-slate-200 text-slate-700',
  }

  return <span className={`${base} ${colores[estado]}`}>{estado}</span>
}
