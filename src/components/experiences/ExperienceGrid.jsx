import React from 'react';
import { ExperienceCard } from './ExperienceCard';
import { LoadingSkeleton } from '../common/LoadingSkeleton';
import { EmptyState } from '../common/EmptyState';

export const ExperienceGrid = ({ experiences = [], loading = false, onResetFilter }) => {
  if (loading) {
    return <LoadingSkeleton count={6} type="card" />;
  }

  if (!experiences || experiences.length === 0) {
    return <EmptyState onReset={onResetFilter} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {experiences.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}
    </div>
  );
};

export default ExperienceGrid;
