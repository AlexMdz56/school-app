import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

export function TablaHorarios() {
  const horarios = useQuery(api.functions.schedule.getSchedules);
  const router = useRouter();

  if (horarios === undefined) {
    return <div>Cargando horarios...</div>;
  }

  const handleVerHorario = (id: string) => {
    router.push(`/horarios/${id}`);
  };

  return (
    <Table>
      <TableCaption>Lista de horarios registrados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Periodo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {horarios.length === 0 ? (
          <TableRow>
            <TableCell className="text-center">
              No hay horarios registrados
            </TableCell>
          </TableRow>
        ) : (
          horarios.map((horario) => (
            <TableRow
              key={horario._id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleVerHorario(horario._id)}
            >
              <TableCell>{horario.periodo}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}