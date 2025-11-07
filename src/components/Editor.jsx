import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bold, Italic, Underline, Strikethrough, Save, Type, Undo2, Redo2 } from 'lucide-react';

const ToolbarButton = ({ onClick, active, title, children }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`px-2 py-1 rounded-md border text-sm flex items-center justify-center ${active ? 'text-white' : 'text-gray-300'}`}
    style={{ borderColor: '#3a3a40', backgroundColor: '#1f1f24' }}
  >
    {children}
  </button>
);

const richCommands = {
  bold: {
    cmd: 'bold',
    query: () => document.queryCommandState('bold'),
  },
  italic: {
    cmd: 'italic',
    query: () => document.queryCommandState('italic'),
  },
  underline: {
    cmd: 'underline',
    query: () => document.queryCommandState('underline'),
  },
  strikeThrough: {
    cmd: 'strikeThrough',
    query: () => document.queryCommandState('strikeThrough'),
  },
};

const Editor = ({ note, onChange, onClose }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
  }, [note]);

  // Autosave
  useEffect(() => {
    const handler = setTimeout(() => {
      setIsSaving(true);
      onChange?.({ ...note, title, content, updatedAt: new Date().toISOString() });
      setLastSaved(new Date());
      setIsSaving(false);
    }, 700);
    return () => clearTimeout(handler);
  }, [title, content]);

  const exec = (cmd) => {
    document.execCommand(cmd, false, undefined);
  };

  const charCount = useMemo(() => (title + content.replace(/<[^>]+>/g, '')).length, [title, content]);

  return (
    <div className="fixed inset-0 z-40" style={{ backgroundColor: '#25252b' }}>
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b" style={{ borderColor: '#3a3a40' }}>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: isSaving ? '#ff2770' : '#22c55e' }} />
              {isSaving ? 'Saving...' : lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Autosave ready'}
            </span>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white text-sm">Close</button>
        </div>

        <div className="px-4 pt-4 pb-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full bg-transparent outline-none text-white text-2xl font-semibold placeholder:text-gray-500"
          />
        </div>

        <div className="px-4 pb-2 flex items-center gap-2 flex-wrap">
          <ToolbarButton title="Bold" onClick={() => exec(richCommands.bold.cmd)} active={richCommands.bold.query()}>
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Italic" onClick={() => exec(richCommands.italic.cmd)} active={richCommands.italic.query()}>
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Underline" onClick={() => exec(richCommands.underline.cmd)} active={richCommands.underline.query()}>
            <Underline className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Strikethrough" onClick={() => exec(richCommands.strikeThrough.cmd)} active={richCommands.strikeThrough.query()}>
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>
        </div>

        <div className="px-4 pb-3">
          <div
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            className="min-h-[40vh] max-h-[55vh] overflow-y-auto rounded-md p-3 text-gray-200 border focus:outline-none"
            style={{ borderColor: '#3a3a40', backgroundColor: '#1f1f24' }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="mt-2 text-xs text-gray-400">Characters: {charCount}</div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
