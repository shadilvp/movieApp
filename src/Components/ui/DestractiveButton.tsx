import { Button } from "./button";

interface ButtonDestructiveProps {
  onClick: () => void;
}

export function ButtonDestructive({ onClick }: ButtonDestructiveProps) {
  return (
    <Button variant="destructive" onClick={onClick} className="bg-red-500">
      Clear
    </Button>
  );
}