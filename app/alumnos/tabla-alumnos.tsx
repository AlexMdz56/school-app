import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableCaption, TableHeader, TableHead, TableBody, TableRow, TableCell, } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { FileText, Pencil, Trash2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Grade {
    _id: Id<"grades">
    materia: string;
    nota: number;
    alumno: Id<"students">;
}

export default function TablaAlumnos() {
    const alumnos = useQuery(api.functions.student.getStudents);
    const router = useRouter();

    const [alumnoActivo, setAlumnoActivo] = useState<string | null>(null);
    const [calificaciones, setCalificaciones] = useState<Grade[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!alumnoActivo) return;

        const fetchGrades = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/calificaciones?alumno=${alumnoActivo}`);
                const data = await res.json();
                setCalificaciones(data);
            } catch (error) {
                console.error("Error al obtener calificaciones:", error);
                setCalificaciones([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGrades();
    }, [alumnoActivo]);

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
        <>
            <Table>
                <TableCaption>Lista de Estudiantes Registrados</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Calificaciones</TableHead>
                        <TableHead className="text-center">Marícula</TableHead>
                        <TableHead className="text-center">Nombre</TableHead>
                        <TableHead className="text-center">Correo</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
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
                            <TableRow key={alumno.id} className="text-center">
                                <TableCell className="flex justify-center">
                                    <Button
                                        onClick={() => setAlumnoActivo(alumno.id)}
                                        variant="outline"
                                        size="icon"
                                        className="hover:bg-muted cursor-pointer"
                                    >
                                        <FileText className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                                <TableCell>{alumno.matricula}</TableCell>
                                <TableCell>{alumno.nombre}</TableCell>
                                <TableCell>{alumno.correo}</TableCell>
                                <TableCell className="flex justify-center">
                                    <Button
                                        onClick={() => handleClick(alumno.matricula)}
                                        variant="outline"
                                        className="hover:bg-muted cursor-pointer"
                                    >
                                        <User className="h-4 w-4" />
                                        <Pencil className="h-4 w-4" />
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Dialog open={!!alumnoActivo} onOpenChange={() => setAlumnoActivo(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Calificaciones</DialogTitle>
                    </DialogHeader>

                    {loading ? (
                        <p>Cargando calificaciones...</p>
                    ) : calificaciones === null || calificaciones.length === 0 ? (
                        <p>Este alumno no tiene calificaciones registradas.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Materia</TableHead>
                                    <TableHead>Nota</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {calificaciones.map((calificacion) => (
                                    <TableRow key={calificacion._id}>
                                        <TableCell>{calificacion.materia}</TableCell>
                                        <TableCell>{calificacion.nota}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
