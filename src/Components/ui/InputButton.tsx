// Components/ui/InputButton.tsx
import type { FormEvent } from "react";
import { Button } from "./button";
import { Input } from "./input";

interface InputWithButtonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (query: string) => void;
}

export const InputWithButton: React.FC<InputWithButtonProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center gap-2"
    >
      <Input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={onChange}
        className="text-white"
      />
      <Button type="submit" variant="outline" className="bg-gray-700 text-white">
        Search
      </Button>
    </form>
  );
};
