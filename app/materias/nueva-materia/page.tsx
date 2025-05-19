"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function NuevaMateria() {
    const saveSubject = useMutation(api.functions.subject.saveSubject);
    const router = useRouter();

    const [formData, setFormData] = useState({
        identificador: '',
        materia: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await saveSubject(formData);
            router.push('/materias');
        } catch (error) {
            console.error("Error al crear materia:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container px-4 sm:px-6 lg:px-8 py-10 mx-auto">
            <div className="flex flex-col items-center sm:justify-between gap-4 mb-8">
                <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Crear Nueva Materia
                    </h1>
                </div>
            </div>

            <Card className="w-full max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-semibold text-center">Información de la Materia</CardTitle>
                    </CardHeader>

                    <CardContent className="grid grid-cols-1 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="identificador">Identificador</Label>
                            <Input
                                id="identificador"
                                name="identificador"
                                value={formData.identificador}
                                onChange={handleChange}
                                placeholder="Ej: BIO, MAT, FIS"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="materia">Nombre de la Materia</Label>
                            <Input
                                id="materia"
                                name="materia"
                                value={formData.materia}
                                onChange={handleChange}
                                placeholder="Nombre de la materia"
                                required
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                        >
                            {isSubmitting ? "Creando..." : "Crear Materia"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>

    );
}