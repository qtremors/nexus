'use client';

import { useState } from 'react';
import type { Project, ProgressKey, ProjectUpdatePayload } from './Projects';
import styles from './Projects.module.css';


const GithubIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" height="1em" width="1em"> <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /> </svg>
);
const DemoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"> <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6" /><path d="M10 14L21 3" /> </svg>
);
const RestoreIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"> <path d="M3 3v6h6" /><path d="M21 12A9 9 0 006.49 4.36L3 7" /> </svg>
);
const PermanentDeleteIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em"> <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" /> </svg>
);



interface ProjectCardProps {
  project: Project;
  context: 'active' | 'recycled';
  onProgressChange?: (id: number, milestone: ProgressKey) => void;
  onUpdate?: (id: number, updates: ProjectUpdatePayload) => void;
  onRecycle?: (id: number) => void;
  onRestore?: (id: number) => void;
  onDeletePermanently?: (id: number) => void;
}

const ProjectCard = ({ project, context, ...handlers }: ProjectCardProps) => {
  const progressKeys: ProgressKey[] = ['init', 'push', 'deploy'];
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ProjectUpdatePayload>({
    title: project.title,
    description: project.description,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
  });


  const currentProgress = {
    init: false,
    push: false,
    deploy: false,
    ...(typeof project.progress === 'object' && project.progress),
  };

  const completedSteps = Object.values(currentProgress).filter(Boolean).length;
  const progressPercentage = (completedSteps / progressKeys.length) * 100;

  const handleInputChange = (field: keyof ProjectUpdatePayload, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing && handlers.onUpdate) {
      handlers.onUpdate(project.id, editData);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`${styles.projectCard} ${context === 'recycled' ? styles.recycledCard : ''}`}>
      <div className={styles.cardHeader}>
        {isEditing && context === 'active' ? (
          <input type="text" value={editData.title ?? ''} onChange={(e) => handleInputChange('title', e.target.value)} className={`${styles.editInput} ${styles.editTitle}`} />
        ) : (
          <h3>{project.title}</h3>
        )}
        <div className={styles.cardActions}>
          {context === 'active' ? (
            <>
              <button title={isEditing ? 'Save' : 'Edit'} onClick={handleEditToggle}> {isEditing ? '💾' : '✏️'} </button>
              <button title="Recycle" onClick={() => handlers.onRecycle?.(project.id)}> 🗑️ </button>
            </>
          ) : (
            <>
              <button title="Restore" className={styles.restoreButton} onClick={() => handlers.onRestore?.(project.id)}> <RestoreIcon /> </button>
              <button title="Delete Permanently" className={styles.deleteButton} onClick={() => handlers.onDeletePermanently?.(project.id)}> <PermanentDeleteIcon /> </button>
            </>
          )}
        </div>
      </div>

      {isEditing && context === 'active' ? (
        <div className={styles.editFields}>
          <textarea value={editData.description ?? ''} onChange={(e) => handleInputChange('description', e.target.value)} className={`${styles.editInput} ${styles.editDescription}`} rows={3} placeholder="Description" />
          <input type="text" value={editData.githubUrl ?? ''} onChange={(e) => handleInputChange('githubUrl', e.target.value)} className={styles.editInput} placeholder="GitHub URL" />
          <input type="text" value={editData.demoUrl ?? ''} onChange={(e) => handleInputChange('demoUrl', e.target.value)} className={styles.editInput} placeholder="Demo URL" />
        </div>
      ) : (
        <>
          <p className={styles.cardDescription}>{project.description}</p>
          <div className={styles.cardLinks}>
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"> <GithubIcon /> GitHub </a>
            ) : (
              <span className={styles.linkDisabled}> <GithubIcon /> GitHub </span>
            )}
            {project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"> <DemoIcon /> Demo </a>
            ) : (
              <span className={styles.linkDisabled}> <DemoIcon /> Demo </span>
            )}
          </div>
        </>
      )}

      <div className={styles.cardProgress}>
        <div className={styles.progressBarContainer}>
          {context === 'active' && <div className={styles.progressBarFill} style={{ width: `${progressPercentage}%` }} />}
        </div>
        <div className={styles.progressSteps}>
          {progressKeys.map((key) => (
            <label key={key} className={`${styles.progressStep} ${currentProgress[key] && context === 'active' ? styles.completed : ''}`}>
              {context === 'active' ? (
                <input type="checkbox" checked={currentProgress[key]} onChange={() => handlers.onProgressChange?.(project.id, key)} disabled={isEditing} />
              ) : null}
              {key}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;