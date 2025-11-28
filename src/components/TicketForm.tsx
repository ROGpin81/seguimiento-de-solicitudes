import React, { useState } from "react";
import { Input } from "./Input";
import { Select } from "./Select";
import type { Prioridad } from "../types/ticket";
interface TicketFormProps {
  onCrearTicket: (data: {
    titulo: string;
    descripcion: string;
    prioridad: Prioridad;
    responsable: string;
  }) => void;
}
export const TicketForm: React.FC<TicketFormProps> = ({ onCrearTicket }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [responsable, setResponsable] = useState("");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo || !descripcion || !prioridad || !responsable) {
      alert("Por favor completa todos los campos.");
      return;
    }
    onCrearTicket({
      titulo,
      descripcion,
      prioridad: prioridad as Prioridad,
      responsable,
    });

    setTitulo("");
    setDescripcion("");
    setPrioridad("");
    setResponsable("");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-5 mb-6 border border-
slate-200"
    >
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Nueva Solicitud / Ticket
      </h2>
      <Input
        label="Título"
        name="titulo"
        value={titulo}
        onChange={setTitulo}
        placeholder="Ej. Error en pantalla de login"
        required
      />

      <div className="flex flex-col gap-1 mb-3">
        <label
          htmlFor="descripcion"
          className="text-sm font-medium text-slate-700"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm
shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe el problema o solicitud..."
          required
          rows={3}
        />
      </div>

      <Select
        label="Prioridad"
        name="prioridad"
        value={prioridad}
        onChange={setPrioridad}
        options={[
          { value: "Alta", label: "Alta" },
          { value: "Media", label: "Media" },
          { value: "Baja", label: "Baja" },
        ]}
        required
      />
      <Input
        label="Responsable asignado"
        name="responsable"
        value={responsable}
        onChange={setResponsable}
        placeholder="Ej. Juan Pérez"
        required
      />
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-
sm font-medium shadow hover:bg-indigo-700 transition-colors"
        >
          Crear Ticket
        </button>
      </div>
    </form>
  );
};
