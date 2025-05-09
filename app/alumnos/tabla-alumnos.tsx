
import { Table, TableCaption, TableHeader, TableHead, TableBody, TableRow, TableCell, } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function TablaAlumnos() {
    const alumnos = useQuery(api.functions.student.getStudents);

    const router = useRouter();



    const handleClick = (id: string) => router.push(`/alumnos/${id}`);

    if (alumnos === undefined) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">
                    Cargando estudiantes...
                </h1>
            </div>);
    };

    return (
        <Table>
            <TableCaption>Lista de Estudiantes Registrados</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center" >Marícula</TableHead>
                    <TableHead className="text-center" >Nombre</TableHead>
                    <TableHead className="text-center" >Correo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {alumnos?.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center">
                            No hay estudiantes registrados
                        </TableCell>
                    </TableRow>
                ) : (
                    alumnos?.map(alumno => (
                        <TableRow
                            key={alumno._id}
                            onClick={() => handleClick(alumno.matricula)}
                            className="cursor-pointer hover:bg-muted">
                            <TableCell>{alumno.matricula}</TableCell>
                            <TableCell>{alumno.nombre}</TableCell>
                            <TableCell>{alumno.correo}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
