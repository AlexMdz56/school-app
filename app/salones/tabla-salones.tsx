import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function TablaSalones() {
    const salones = useQuery(api.functions.classroom.getClassrooms);
    const router = useRouter();

    const handleClick = (id: string) => router.push(`/salones/${id}`);

    if (salones === undefined) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">
                    Cargando salones...
                </h1>
            </div>);
    };

    return (
        <Table>
            <TableCaption>Lista de Salones</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center" >Número</TableHead>
                    <TableHead className="text-center" >Edificio</TableHead>
                    <TableHead className="text-center" >Planta</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {salones?.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center">
                            No hay salones asignados
                        </TableCell>
                    </TableRow>
                ) : (
                    salones?.map(salon => (
                        <TableRow
                            key={salon._id}
                            onClick={() => handleClick(salon._id)}
                            className="cursor-pointer hover:bg-muted">
                            <TableCell>{salon.numero}</TableCell>
                            <TableCell>{salon.edificio}</TableCell>
                            <TableCell>{salon.planta}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}

