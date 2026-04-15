'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft } from 'lucide-react';

export type ProjectStatus = 'IN_PROGRESS' | 'PLANNED' | 'COMPLETED';

export interface ProjectFormValues {
  title: string;
  description: string;
  tags: string[];
  date: string | null;
  author: string | null;
  status: ProjectStatus;
}

interface ProjectFormProps {
  mode: 'create' | 'edit';
  initial?: Partial<ProjectFormValues>;
  projectId?: string;
}

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'IN_PROGRESS', label: 'Probíhá' },
  { value: 'PLANNED', label: 'Plánovaný' },
  { value: 'COMPLETED', label: 'Dokončený' },
];

export const ProjectForm: React.FC<ProjectFormProps> = ({ mode, initial, projectId }) => {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [tagsInput, setTagsInput] = useState((initial?.tags || []).join(', '));
  const [date, setDate] = useState(
    initial?.date ? new Date(initial.date).toISOString().slice(0, 10) : ''
  );
  const [author, setAuthor] = useState(initial?.author || '');
  const [status, setStatus] = useState<ProjectStatus>(initial?.status || 'IN_PROGRESS');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Název je povinný.');
      return;
    }
    if (!description.trim()) {
      setError('Popis je povinný.');
      return;
    }

    setSubmitting(true);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      description: description.trim(),
      tags,
      date: date ? new Date(date).toISOString() : null,
      author: author.trim() || null,
      status,
    };

    try {
      const url = mode === 'create' ? '/api/projects' : `/api/projects/${projectId}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        setError(data.error || 'Chyba při ukládání projektu');
        setSubmitting(false);
        return;
      }

      router.push('/dashboard/projects');
      router.refresh();
    } catch {
      setError('Chyba sítě při ukládání projektu');
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-[var(--spsd-navy)] placeholder-gray-400 focus:border-[var(--spsd-red)] focus:outline-none focus:ring-2 focus:ring-[var(--spsd-red)]/20 transition-all';

  return (
    <div className="max-w-3xl">
      <Link
        href="/dashboard/projects"
        className="inline-flex items-center gap-2 text-sm text-[var(--spsd-navy)]/70 hover:text-[var(--spsd-navy)] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Zpět na seznam
      </Link>

      <h1 className="text-3xl font-bold text-[var(--spsd-navy)] mb-2">
        {mode === 'create' ? 'Nový projekt' : 'Upravit projekt'}
      </h1>
      <p className="text-[var(--spsd-navy)]/70 mb-8">
        {mode === 'create'
          ? 'Vyplň údaje nového projektu.'
          : 'Změň údaje projektu a ulož.'}
      </p>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold text-[var(--spsd-navy)] mb-2">
            Název <span className="text-[var(--spsd-red)]">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="např. Chatbot pro obor"
            disabled={submitting}
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--spsd-navy)] mb-2">
            Popis <span className="text-[var(--spsd-red)]">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} min-h-[120px] resize-y`}
            placeholder="Stručný popis projektu, jeho cíle a očekávaný výstup."
            disabled={submitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--spsd-navy)] mb-2">
              Autor / autoři
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
              placeholder="např. J.T, M.N"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--spsd-navy)] mb-2">
              Datum
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
              disabled={submitting}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--spsd-navy)] mb-2">
            Štítky
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className={inputClass}
            placeholder="oddělené čárkou — např. AI, Chatbot, Studenti"
            disabled={submitting}
          />
          <p className="text-xs text-[var(--spsd-navy)]/50 mt-1.5">
            Více štítků odděl čárkou.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--spsd-navy)] mb-2">
            Stav
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                disabled={submitting}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                  status === opt.value
                    ? 'bg-[var(--spsd-navy)] text-white border-[var(--spsd-navy)]'
                    : 'bg-white text-[var(--spsd-navy)] border-gray-300 hover:border-[var(--spsd-navy)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
            <span>{mode === 'create' ? 'Vytvořit projekt' : 'Uložit změny'}</span>
          </button>
          <Link
            href="/dashboard/projects"
            className="px-6 py-3 rounded-xl border border-gray-300 text-[var(--spsd-navy)] font-semibold hover:bg-gray-50 transition-colors"
          >
            Zrušit
          </Link>
        </div>
      </form>
    </div>
  );
};
