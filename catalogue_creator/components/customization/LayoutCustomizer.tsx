import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

export function LayoutCustomizer() {
  const [layout, setLayout] = useState("single");

  return (
    <div className="space-y-4">
      <Select value={layout} onValueChange={setLayout}>
        <SelectTrigger>
          <SelectValue placeholder="Select layout" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="single">Single Column</SelectItem>
          <SelectItem value="two-column">Two Columns</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
