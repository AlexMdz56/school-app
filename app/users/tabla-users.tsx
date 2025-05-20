import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function TablaUsers() {
  const users = useQuery(api.functions.user.getAllUsers);
  const router = useRouter();

  const handleClick = (id: string) => router.push(`/users/${id}`);

  if (users === undefined) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">
          Cargando usuarios...
        </h1>
      </div>);
  };

  return (

    <Table>
      <TableCaption>Lista de Usiarios</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Nombre</TableHead>
          <TableHead className="text-center">Correo</TableHead>
          <TableHead className="text-center">Rol</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No hay usuarios registrados
            </TableCell>
          </TableRow>
        ) : (
          users?.map(user => (
            <TableRow
              key={user.id}
              onClick={() => handleClick(user.clerkUserId)}
              className="cursor-pointer hover:bg-muted">
              <TableCell>{user.nombre}</TableCell>
              <TableCell>{user.correo}</TableCell>
              <TableCell>{user.rol}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
