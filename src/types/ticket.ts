export type Prioridad = 'Alta' | 'Media' | 'Baja'
export type EstadoTicket = 'Abierto' | 'En Proceso' | 'Resuelto' |
'Cerrado'
export interface Ticket {
 id: number
 titulo: string
 descripcion: string
 fechaCreacion: string
 prioridad: Prioridad
 estado: EstadoTicket
 responsable: string
 fechaUltimoCambioEstado: string | null
}