"use client";

import { useRouter } from "next/navigation";
import TablaMaterias from "./tabla-materias";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

export default function Materias() {
    const router = useRouter();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Sistema de Materias</h1>
            <p className="text-muted-foreground mb-6">
                Haz clic en cualquier materia para ver sus detalles completos,
                editarla o eliminarla. Para crear una nueva materia, usa el botón
                Nueva Materia.
            </p>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Lista de Materias</h2>
                <div className="flex gap-2">
                    <Button onClick={() => router.push('/')} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Regresar al inicio
                    </Button>
                    <Button onClick={() => router.push("/materias/nueva-materia")} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nueva Materia
                    </Button>
                </div>
            </div>
            <TablaMaterias />
        </div>
    );
}