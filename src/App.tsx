// src/App.tsx
import { TicketForm } from './components/TicketForm'
import { TicketTable } from './components/TicketTable'
import { useTickets } from './hooks/useTickets'

function App() {
  const {
    tickets,
    crearTicket,
    actualizarEstado,
    eliminarTicket,
    eliminarTodos,
  } = useTickets()

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-indigo-700 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-semibold">
            Seguimiento de Solicitudes / Tickets
          </h1>
          <p className="text-xs md:text-sm text-indigo-100 mt-1">
            Registra solicitudes, asigna responsables y controla el estado de
            cada ticket.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <TicketForm onCrearTicket={crearTicket} />

        <TicketTable
          tickets={tickets}
          onCambiarEstado={actualizarEstado}
          onEliminarTicket={eliminarTicket}
          onEliminarTodos={eliminarTodos}
        />
      </main>

      <footer className="mt-8 py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Proyecto Final Grupo 2, Programación
        web I
      </footer>
    </div>
  )
}

export default App
