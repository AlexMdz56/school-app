"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function EditarMateria() {
    const params = useParams();
    const id = params.id as Id<"schedules">;
    const horario = useQuery(api.functions.schedule.getSchedule, { id });
    const updateSchedule = useMutation(api.functions.schedule.updateSchedule);
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        periodo: ""
    });

    const periodos = [
        "8:00 AM - 9:00 AM",
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM",
        "1:00 PM - 2:00 PM"
    ];

    useEffect(() => {
        if (horario) {
            setFormData({
                periodo: horario.periodo,
            });
        }
    }, [horario]);

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!horario) return;
        try {
            await updateSchedule({
                id: horario._id,
                ...formData,
            });
            router.push(`/horarios/${id}`);
        } catch (error) {
            console.error("Error al actualizar horario:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (horario === undefined) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex items-center gap-2 mb-6">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Skeleton className="h-8 w-64" />
                </div>
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <Skeleton className="h-8 w-full mb-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-10 w-24 mr-2" />
                        <Skeleton className="h-10 w-24" />
                    </CardFooter>
                </Card>
            </div>
        );
    }

    if (!horario) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex items-center gap-2 mb-6">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold">Horario no encontrado</h1>
                </div>
                <p>No se pudo encontrar el horario con el ID proporcionado.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center gap-2 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">Editar Horario</h1>
            </div>

            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-semibold text-center">Modificar información del horario</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="periodo">Periodo</Label>
                            <Select
                                onValueChange={(value) => handleSelectChange("periodo", value)}
                                value={formData.periodo}
                            >
                                <SelectTrigger id="periodo">
                                    <SelectValue placeholder="Selecciona el periodo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {periodos.map((periodo) => (
                                        <SelectItem key={periodo} value={periodo}>
                                            {periodo}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !formData.periodo}
                            className="flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}