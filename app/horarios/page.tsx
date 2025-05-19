"use client";

import { useRouter } from "next/navigation";
import { TablaHorarios } from "./tabla-horarios";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

export default function Horarios() {
    const router = useRouter();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Sistema de Horarios</h1>
            <p className="text-muted-foreground mb-6">
                Haz clic en cualquier horario para ver sus detalles completos,
                editarlo o eliminarlo. Para crear un nuevo horario, usa el botón
                Nuevo Horario.
            </p>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Lista de Horarios</h2>
                <div className="flex gap-2">
                    <Button onClick={() => router.push('/')} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Regresar al inicio
                    </Button>
                    <Button onClick={() => router.push("/horarios/nuevo-horario")} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nuevo Horario
                    </Button>
                </div>
            </div>
            <TablaHorarios />
        </div>
    );
}