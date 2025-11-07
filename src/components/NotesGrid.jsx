import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

const NoteCard = ({ note, onOpen }) => {
  return (
    <button
      onClick={() => onOpen(note)}
      className="group w-full text-left rounded-lg border p-4 transition hover:shadow-lg focus:outline-none focus:ring-2"
      style={{ borderColor: '#3a3a40', backgroundColor: '#1f1f24' }}
    >
      <h3 className="text-white font-semibold text-lg line-clamp-1">{note.title || 'Untitled'}</h3>
      <p className="text-gray-300 mt-2 text-sm line-clamp-3 whitespace-pre-wrap">{note.content || 'No content yet.'}</p>
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
        <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Created {formatDate(note.createdAt)}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Edited {formatDate(note.updatedAt)}</span>
      </div>
    </button>
  );
};

const NotesGrid = ({ notes, onOpen }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} onOpen={onOpen} />
      ))}
    </div>
  );
};

export default NotesGrid;
