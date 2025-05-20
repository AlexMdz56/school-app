"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function User() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const user = useQuery(api.functions.user.getUserByClerkId, { clerkUserId: id });

  const [modalEliminar, setModalEliminar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setIsSubmitting(true);
    if (!user?._id) return;
    try {
      await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkUserId: user.clerkUserId,
          convexUserId: user._id,
        }),
      });
      router.push("/users");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    } finally {
      setIsSubmitting(false);
      setModalEliminar(false);
    }
  };

  if (user === undefined) {
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
            <Skeleton className="h-10 w-full" />
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

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Usuario no encontrado</h1>
        </div>
        <p>No se pudo encontrar el usuario con el ID proporcionado.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Detalle del Usuario</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">
              {user.nombre}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.push(`/users/${id}/editar`)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setModalEliminar(true)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Nombre</h3>
            <div className="p-2 bg-muted rounded-md">{user.nombre}</div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Correo</h3>
            <div className="p-2 bg-muted rounded-md">{user.correo}</div>
          </div>

          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Rol</h3>
            <div className="p-2 bg-muted rounded-md">{user.rol}</div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de confirmación para eliminar */}
      <Dialog open={modalEliminar} onOpenChange={setModalEliminar}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás completamente seguro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. El usuario será eliminado permanentemente
              de la base de datos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalEliminar(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

