'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Loader2, FolderOpen } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string | null;
  author: string | null;
  status: 'IN_PROGRESS' | 'PLANNED' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

const STATUS_LABELS: Record<Project['status'], string> = {
  IN_PROGRESS: 'Probíhá',
  PLANNED: 'Plánovaný',
  COMPLETED: 'Dokončený',
};

const STATUS_COLORS: Record<Project['status'], string> = {
  IN_PROGRESS: 'bg-amber-100 text-amber-800 border-amber-200',
  PLANNED: 'bg-blue-100 text-blue-800 border-blue-200',
  COMPLETED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export default function ProjectsListPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/projects', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setError(data.error || 'Chyba při načítání projektů');
        return;
      }
      const data = await res.json();
      setProjects(data.projects || []);
    } catch {
      setError('Chyba sítě při načítání projektů');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Opravdu smazat projekt „${title}"? Akce je nevratná.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Chyba při mazání projektu');
        return;
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('Chyba sítě při mazání projektu');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-[var(--spsd-navy)] mb-2">Projekty</h1>
          <p className="text-[var(--spsd-navy)]/70">Spravuj projekty oboru IT.</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Nový projekt</span>
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--spsd-red)]" />
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-semibold text-[var(--spsd-navy)] mb-1">
            Zatím žádné projekty
          </p>
          <p className="text-sm text-[var(--spsd-navy)]/60 mb-6">
            Vytvoř svůj první projekt kliknutím na tlačítko výše.
          </p>
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--spsd-red)] text-white text-sm font-semibold hover:bg-[var(--spsd-red)]/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Vytvořit projekt
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">
                    Název
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">
                    Autor
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">
                    Stav
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">
                    Datum
                  </th>
                  <th className="text-right px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-600">
                    Akce
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-[var(--spsd-navy)]">{p.title}</div>
                      <div className="text-xs text-[var(--spsd-navy)]/60 mt-0.5 line-clamp-1">
                        {p.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--spsd-navy)]/80">
                      {p.author || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[p.status]}`}
                      >
                        {STATUS_LABELS[p.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--spsd-navy)]/70">
                      {p.date ? new Date(p.date).toLocaleDateString('cs-CZ') : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/projects/${p.id}`}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:text-[var(--spsd-navy)] hover:bg-gray-100 transition-colors"
                          aria-label="Upravit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.title)}
                          disabled={deletingId === p.id}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-red-600 hover:text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                          aria-label="Smazat"
                        >
                          {deletingId === p.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
