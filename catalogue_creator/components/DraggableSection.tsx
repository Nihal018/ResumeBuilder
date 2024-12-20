// components/DraggableSection.tsx
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { DragSourceMonitor, DropTargetMonitor } from "react-dnd";

interface DragItem {
  id: string;
  index: number;
  type: string;
  boundingRect?: DOMRect;
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
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "SECTION",
    item: () => {
      // Store the initial bounding rect when drag starts
      const boundingRect = ref.current?.getBoundingClientRect();
      return { id, index, type: "SECTION", boundingRect };
    },
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
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Get the bounding rect of the hover target
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle of hover target
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;

      // Get mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveSection(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  const opacity = isDragging ? 0.4 : 1;
  const scale = isDragging ? 1.02 : 1;

  return (
    <div
      ref={ref}
      className={`border rounded-lg p-4 mb-4 transform transition-all duration-200 ${
        isDragging ? "shadow-lg bg-gray-50" : "bg-white"
      }`}
      style={{
        opacity,
        transform: `scale(${scale})`,
        cursor: "move",
      }}
      data-handler-id={handlerId}
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
