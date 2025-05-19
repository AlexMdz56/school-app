"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
// import { TablaCalificaciones } from "./tabla-calificaciones";
import TablaCalificacionesAGGrid from "./tabla-cali-ag-grid";

export default function Grades() {
    const router = useRouter();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Sistema de Calificaciones</h1>
            <p className="text-muted-foreground mb-6">
                Haz clic en cualquier horario para ver sus detalles completos,
                editarlo o eliminarlo. Para crear una nueva calificación, usa el botón
                Nueva Calificación.
            </p>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Lista de Califiaciones</h2>
                <div className="flex gap-2">
                    <Button onClick={() => router.push('/')} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Regresar al inicio
                    </Button>
                    <Button onClick={() => router.push("/calificaciones/nueva-calificacion")} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nueva Calificación
                    </Button>
                </div>
            </div>
            {/* <TablaCalificaciones /> */}
            <TablaCalificacionesAGGrid />
        </div>
    )
}
