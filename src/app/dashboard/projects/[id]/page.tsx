'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ProjectForm, type ProjectStatus } from '@/components/dashboard/ProjectForm';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string | null;
  author: string | null;
  status: ProjectStatus;
}

export default function EditProjectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`, { credentials: 'include' });
        if (!res.ok) {
          if (res.status === 401) {
            router.push('/login');
            return;
          }
          if (res.status === 404) {
            setError('Projekt nenalezen.');
            return;
          }
          const data = await res.json();
          setError(data.error || 'Chyba při načítání projektu');
          return;
        }
        const data = await res.json();
        setProject(data.project);
      } catch {
        setError('Chyba sítě při načítání projektu');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--spsd-red)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl">
        <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-700">{error}</div>
      </div>
    );
  }

  if (!project) return null;

  return <ProjectForm mode="edit" projectId={project.id} initial={project} />;
}
