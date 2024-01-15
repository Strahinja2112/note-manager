type Props = {};

export default function NoteTitle({}: Props) {
  const title = "Note Title";

  return (
    <div className="flex pt-2 justify-center">
      <span className="text-gray-400">{title}</span>
    </div>
  );
}
