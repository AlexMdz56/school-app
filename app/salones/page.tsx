"use client";

import { useRouter } from "next/navigation";
import TablaSalones from "./tabla-salones";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

export default function Salones() {
    const router = useRouter();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Sistema de Salones</h1>
            <p className="text-muted-foreground mb-6">
                Haz clic en cualquier salón para ver sus detalles completos,
                editarlo o eliminarlo. Para crear un nuevo salón, usa el botón
                Nuevo Salón.
            </p>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Lista de Salones</h2>
                <div className="flex gap-2">
                    <Button onClick={() => router.push('/')} className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Regresar al inicio
                    </Button>
                    <Button onClick={() => router.push("/salones/nuevo-salon")} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nuevo Salón
                    </Button>
                </div>
            </div>
            <TablaSalones />
        </div>
    );
}