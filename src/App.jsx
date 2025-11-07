import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSpline from './components/HeroSpline';
import NotesGrid from './components/NotesGrid';
import Editor from './components/Editor';
import { Plus } from 'lucide-react';

const seedNotes = [
  {
    id: '1',
    title: 'Ideas for MoodPad',
    content: 'Design a clean dark theme with hot pink accents. Add autosave and character count. Maybe integrate tags and pinning for quick access.\n\nThink about mobile gestures.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Daily reflection',
    content: 'Grateful for the progress today. Kept focus blocks tight. Next: refine editor toolbar and animations.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '3',
    title: 'Books to read',
    content: 'Deep Work — Cal Newport\nAtomic Habits — James Clear\nShow Your Work — Austin Kleon',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

const App = () => {
  const [notes, setNotes] = useState(seedNotes);
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    if (!search) return notes;
    const q = search.toLowerCase();
    return notes.filter((n) =>
      (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q)
    );
  }, [notes, search]);

  const openNote = (note) => setActive(note);

  const handleEditorChange = (updated) => {
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    setActive(updated);
  };

  const createNote = () => {
    const id = String(Date.now());
    const now = new Date().toISOString();
    const newNote = { id, title: 'Untitled', content: '', createdAt: now, updatedAt: now };
    setNotes((prev) => [newNote, ...prev]);
    setActive(newNote);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#25252b' }}>
      <Navbar onSearchChange={setSearch} />
      <HeroSpline />

      <main className="mx-auto max-w-6xl px-4 pb-24 -mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-semibold">Your Notes</h2>
          <button
            onClick={createNote}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 border text-white text-sm hover:shadow"
            style={{ borderColor: '#ff2770', backgroundColor: '#1f1f24' }}
          >
            <Plus className="h-4 w-4" /> New Note
          </button>
        </div>
        <NotesGrid notes={filtered} onOpen={openNote} />
      </main>

      {active && (
        <Editor
          note={active}
          onChange={handleEditorChange}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
};

export default App;
