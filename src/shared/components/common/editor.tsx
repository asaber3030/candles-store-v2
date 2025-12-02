"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";

import { useEffect } from "react";
import { Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Heading3, Heading4, List, ListOrdered, Quote, Link as LinkIcon, Unlink, AlignLeft, AlignCenter, AlignRight, TableIcon, ImageIcon } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, TextAlign.configure({ types: ["heading", "paragraph"] }), Table.configure({ resizable: true }), TableRow, TableCell, TableHeader, Image],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[200px] p-3 outline-none prose prose-sm max-w-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const setLink = () => {
    const url = prompt("Enter a URL");
    if (url) {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const insertTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const insertImage = () => {
    const url = prompt("Enter image URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="space-y-2 border rounded-md">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b p-2 bg-gray-50">
        <ToolbarButton icon={<Bold size={16} />} onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} />
        <ToolbarButton icon={<Italic size={16} />} onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} />
        <ToolbarButton icon={<UnderlineIcon size={16} />} onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} />
        <ToolbarButton icon={<Heading1 size={16} />} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} />
        <ToolbarButton icon={<Heading2 size={16} />} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} />
        <ToolbarButton icon={<Heading3 size={16} />} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} />
        <ToolbarButton icon={<Heading4 size={16} />} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} />
        <ToolbarButton icon={<List size={16} />} onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} />
        <ToolbarButton icon={<ListOrdered size={16} />} onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} />
        <ToolbarButton icon={<Quote size={16} />} onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} />
        <ToolbarButton icon={<LinkIcon size={16} />} onClick={setLink} />
        <ToolbarButton icon={<Unlink size={16} />} onClick={() => editor.chain().focus().unsetLink().run()} />

        {/* New features */}
        <ToolbarButton icon={<AlignLeft size={16} />} onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} />
        <ToolbarButton icon={<AlignCenter size={16} />} onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} />
        <ToolbarButton icon={<AlignRight size={16} />} onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} />
        <ToolbarButton icon={<TableIcon size={16} />} onClick={insertTable} />
        <ToolbarButton icon={<ImageIcon size={16} />} onClick={insertImage} />
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="p-2" />
    </div>
  );
}

function ToolbarButton({ icon, onClick, active = false }: { icon: React.ReactNode; onClick: () => void; active?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`p-1 rounded hover:bg-gray-200 ${active ? "bg-gray-300" : ""}`}>
      {icon}
    </button>
  );
}
