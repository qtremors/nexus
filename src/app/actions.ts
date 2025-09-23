'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { Project as ProjectType } from '@/components/Projects';


export async function getProjects() {
  return await db.query.projects.findMany({
    orderBy: (projects, { desc }) => [desc(projects.createdAt)],
  });
}


export async function addProject() {
  await db.insert(projects).values({
    title: 'New Project',
    description: 'Click the edit button to add a description.',
    githubUrl: '',
    demoUrl: '',
  });
  revalidatePath('/projects');
}


export async function updateProject(id: number, updates: Partial<ProjectType>) {
  await db.update(projects).set(updates).where(eq(projects.id, id));
  revalidatePath('/projects');
}


export async function updateProjectProgress(id: number, newProgress: ProjectType['progress']) {
    await db.update(projects).set({ progress: newProgress }).where(eq(projects.id, id));
    revalidatePath('/projects');
}


export async function recycleProject(id: number) {
    await db.update(projects).set({ status: 'recycled' }).where(eq(projects.id, id));
    revalidatePath('/projects');
}


export async function restoreProject(id: number) {
    await db.update(projects).set({ status: 'active' }).where(eq(projects.id, id));
    revalidatePath('/projects');
}


export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath('/projects');
}