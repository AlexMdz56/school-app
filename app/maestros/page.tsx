"use client";

import { useRouter } from "next/navigation";
import TablaMaestros from "./tabla-maestros";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

export default function Maestros() {
    const router = useRouter();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Sistema de Maestros</h1>
            <p className="text-muted-foreground mb-6">
                Haz clic en cualquier maestro para ver sus detalles completos,
                editarlo o eliminarlo. Para crear un nuevo maestro, usa el botón
                Nuevo Maestro.
            </p>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Lista de Maestros</h2>
                <div className="flex gap-2">
                    <Button onClick={() => router.push('/')} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Regresar al inicio
                    </Button>
                    <Button onClick={() => router.push("/maestros/nuevo-maestro")} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nuevo Maestro
                    </Button>
                </div>
            </div>
            <TablaMaestros />
        </div>
    );
}