"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  AllCommunityModule,
  ColDef,
  colorSchemeDark,
  ModuleRegistry,
  RowSelectionOptions,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface Grade {
  _id: Id<"grades">;
  materia: string;
  nota: number;
  alumno: Id<"students">;
}

export default function TablaCalificacionesAGGrid() {
  const [grades, setGrades] = useState<Grade[] | null>(null);
  const [studentMap, setStudentMap] = useState<Record<string, string>>({});
  const convex = useConvex();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/calificaciones");
      const data = await res.json();
      setGrades(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchStudents() {
      if (!grades) return;
      const map: Record<string, string> = {};

      for (const c of grades) {
        try {
          const res = await convex.query(api.functions.student.getStudentById, {
            id: c.alumno,
          });
          if (res) {
            map[c.alumno] = res.nombre;
          }
        } catch (error) {
          console.error("Error obteniendo estudiante:", error);
        }
      }

      setStudentMap(map);
    }

    fetchStudents();
  }, [grades, convex]);

  const columnDefs: ColDef[] = [
    { headerName: "Materia", field: "materia", filter: true, flex: 1 },
    {
      headerName: "Alumno",
      field: "alumno",
      filter: true,
      valueGetter: (params) => studentMap[params.data.alumno] || "Cargando...",
      flex: 2
    },
    { headerName: "Nota", field: "nota", filter: true, flex: 1 },
  ];

  const rowSelection = useMemo(() => {
    return { mode: "single" };
  }, []);

  const themeDark = themeQuartz.withPart(colorSchemeDark);

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Lista de calificaciones registradas</h2>
      <div className="ag-theme-quartz-dark w-[90%] h-[60vh]">
        <AgGridReact
          rowData={grades || []}
          columnDefs={columnDefs}
          theme={themeDark}
          rowSelection={rowSelection as RowSelectionOptions}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 30, 50]}
          onRowClicked={(e) => {
            const id = e.data._id;
            router.push(`/calificaciones/${id}`);
          }}
        />
      </div>
    </div>
  );
}
