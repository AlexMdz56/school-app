"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [rol, setRol] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                body: JSON.stringify({ nombre: name, correo: email, rol }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error al crear usuario");
            setResult("Usuario creado correctamente");
            setEmail('');
            setName('');
            setRol('');
            setTimeout(() => {
                setResult(null);
            }, 2000);
        } catch (error) {
            if (error instanceof Error) {
                setResult(`Error: ${error.message}`);
                setEmail('');
                setName('');
                setRol('');
                setTimeout(() => {
                    setResult(null);
                }, 2000);
            } else {
                setResult("Error desconocido al crear usuario");
                setEmail('');
                setName('');
                setRol('');
                setTimeout(() => {
                    setResult(null);
                }, 2000);
            }
        }
        setLoading(false);
    };

    return (
        <div className="container px-4 sm:px-6 lg:px-8 py-10 mx-auto">
            <div className="flex flex-col items-center sm:justify-between gap-4 mb-8">
                <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Crear Nuevo Usuario
                    </h1>
                </div>
            </div>
            <Card className="w-full max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-semibold text-center">Información del Usuario</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Correo"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <select
                                id="rol"
                                name="rol"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                                className="w-full px-4 py-2 border rounded"
                                required
                            >
                                <option value="" className="text-gray-800">Selecciona un rol</option>
                                <option value="admin" className="text-gray-800">Admin</option>
                                <option value="user" className="text-gray-800">User</option>
                            </select>
                        </div>
                        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="w-full sm:w-auto"
                            >
                                Cancelar
                            </Button>
                            {result && (
                                <div className={`mt-2 text-center ${result.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
                                    {result}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full sm:w-auto"
                                disabled={loading}
                            >
                                {loading ? 'Creando...' : 'Crear usuario'}
                            </Button>
                        </CardFooter>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
