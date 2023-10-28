'use client';

import Loading from '~/components/loading';

import { useSubject } from '~/lib/bangumi/subjects';

interface Props {
  params: { id: string }
}

export default function Subject({ params }: Props) {
  const { data, isLoading, error } = useSubject(params.id);

  if (error) throw error;
  if (!data || isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="w-max mb-4">
        <h1 className="font-bold text-2xl">{data.name}</h1>
      </div>
    </div>
  );
}
