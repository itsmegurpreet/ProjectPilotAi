"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WbsNode } from "@/types/project";

function Node({
  node,
  expandedIds,
  onToggle,
}: {
  node: WbsNode;
  expandedIds: string[];
  onToggle: (id: string) => void;
}) {
  const hasChildren = Boolean(node.children?.length);
  const expanded = expandedIds.includes(node.id);

  return (
    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => hasChildren && onToggle(node.id)}
      >
        <div className="flex items-center gap-2">
          {hasChildren ? (
            expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : (
            <span className="h-4 w-4" />
          )}
          <span className="font-medium">
            {node.id} {node.title}
          </span>
        </div>
        <span className="text-sm text-slate-500">{node.estimateHours}h</span>
      </button>
      {hasChildren && expanded ? (
        <div className="mt-3 space-y-2 border-l border-slate-200 pl-4 dark:border-slate-700">
          {node.children?.map((child) => (
            <Node
              key={child.id}
              node={child}
              expandedIds={expandedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function WbsTree({ data }: { data: WbsNode[] }) {
  const [expanded, setExpanded] = useState<string[]>(
    data.map((node) => node.id),
  );
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    return data
      .map((node) => ({
        ...node,
        children: node.children?.filter((child) =>
          `${child.id} ${child.title}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        ),
      }))
      .filter(
        (node) =>
          `${node.id} ${node.title}`
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          (node.children && node.children.length > 0),
      );
  }, [data, query]);

  const toggle = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <Input
          className="pl-9"
          placeholder="Search task or ID"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="space-y-3">
        {filtered.map((node) => (
          <Node
            key={node.id}
            node={node}
            expandedIds={expanded}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}
