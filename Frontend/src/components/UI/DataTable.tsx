import React from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  return (
    <table className="min-w-full border border-gray-200">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.label} className="border px-4 py-2">
              {col.label}
            </th>
          ))}
          {(onEdit || onDelete) && (
            <th className="border px-4 py-2">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col.label} className="border px-4 py-2">
                {col.render
                  ? col.render((row as any)[col.key], row)
                  : (row as any)[col.key]}
              </td>
            ))}
            {(onEdit || onDelete) && (
              <td className="border px-4 py-2 space-x-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
