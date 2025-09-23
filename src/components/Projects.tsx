'use client';

import { useState } from 'react';
import styles from './Projects.module.css';
import ProjectCard from './ProjectCard';
import {
  addProject,
  updateProject,
  updateProjectProgress,
  recycleProject,
  restoreProject,
  deleteProject,
} from '@/app/actions';


import type { projects } from '@/lib/db/schema';
import type { InferSelectModel } from 'drizzle-orm';

export type Project = InferSelectModel<typeof projects>;
export type ProgressKey = 'init' | 'push' | 'deploy';
export type ProjectUpdatePayload = Partial<Pick<Project, 'title' | 'description' | 'githubUrl' | 'demoUrl'>>;


type ProgressStatus = {
  init: boolean;
  push: boolean;
  deploy: boolean;
};


export default function Projects({ initialProjects }: { initialProjects: Project[] }) {
  const [showRecycleBin, setShowRecycleBin] = useState(false);


  const projects = initialProjects;

  const handleProgressChange = async (projectId: number, milestone: ProgressKey) => {
    const project = projects.find(p => p.id === projectId);
    if (!project || !project.progress) return;


    const newProgress = { ...project.progress } as ProgressStatus;
    const isChecking = !newProgress[milestone];

    if (isChecking) {
        if (milestone === 'deploy') { newProgress.init = true; newProgress.push = true; newProgress.deploy = true; }
        else if (milestone === 'push') { newProgress.init = true; newProgress.push = true; }
        else { newProgress.init = true; }
    } else {
        if (milestone === 'init') { newProgress.init = false; newProgress.push = false; newProgress.deploy = false; }
        else if (milestone === 'push') { newProgress.push = false; newProgress.deploy = false; }
        else { newProgress.deploy = false; }
    }

    await updateProjectProgress(projectId, newProgress);
  };

  const activeProjects = projects.filter((p) => p.status === 'active');
  const recycledProjects = projects.filter((p) => p.status === 'recycled');
  const ongoingProjects = activeProjects.filter((p) => !(p.progress as ProgressStatus)?.init || !(p.progress as ProgressStatus)?.push || !(p.progress as ProgressStatus)?.deploy);
  const completedProjects = activeProjects.filter((p) => (p.progress as ProgressStatus)?.init && (p.progress as ProgressStatus)?.push && (p.progress as ProgressStatus)?.deploy);

  return (
    <section className={styles.projectsContainer}>
        <div className={styles.headerRow}>
            <h1 className={styles.title}>Projects Dashboard</h1>
            <div className={styles.headerActions}>
                <button className={styles.recycleBinButton} onClick={() => setShowRecycleBin(!showRecycleBin)}>
                    ♻️ Recycle Bin ({recycledProjects.length})
                </button>
                <button className={styles.addButton} onClick={() => addProject()}>
                    + Add Project
                </button>
            </div>
        </div>

        {showRecycleBin && (
            <div className={styles.projectsSection}>
                <h2>Recycle Bin</h2>
                <div className={styles.cardGrid}>
                    {recycledProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            context="recycled"
                            onRestore={restoreProject}
                            onDeletePermanently={deleteProject}
                        />
                    ))}
                </div>
            </div>
        )}

        <div className={styles.projectsSection}>
            <h2>Ongoing</h2>
            <div className={styles.cardGrid}>
                {ongoingProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        context="active"
                        onProgressChange={handleProgressChange}
                        onRecycle={recycleProject}
                        onUpdate={updateProject}
                    />
                ))}
            </div>
        </div>

        <div className={styles.projectsSection}>
            <h2>Completed</h2>
            <div className={styles.cardGrid}>
                {completedProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        context="active"
                        onProgressChange={handleProgressChange}
                        onRecycle={recycleProject}
                        onUpdate={updateProject}
                    />
                ))}
            </div>
        </div>
    </section>
  );
}