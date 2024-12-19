// components/DraggableSection.tsx
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { DragSourceMonitor, DropTargetMonitor } from "react-dnd";

// Define the structure of a draggable item
interface DragItem {
  id: string;
  index: number;
  type: string;
}

interface DraggableSectionProps {
  id: string;
  index: number;
  moveSection: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

export function DraggableSection({
  id,
  index,
  moveSection,
  children,
}: DraggableSectionProps) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "SECTION",
    item: () => ({ id, index, type: "SECTION" }),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: "SECTION",
    collect: (monitor: DropTargetMonitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: DragItem, monitor: DropTargetMonitor) => {
      if (!monitor.isOver({ shallow: true })) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      moveSection(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Combine drag and drop refs
  const ref = useRef<HTMLDivElement>(null);
  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={`border rounded-lg p-4 mb-4 ${
        isDragging ? "opacity-50 bg-gray-50" : "bg-white"
      }`}
      data-handler-id={handlerId}
      style={{ cursor: "move" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
        <span className="text-sm text-gray-500">Drag to reorder</span>
      </div>
      {children}
    </div>
  );
}
