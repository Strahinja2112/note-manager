type Props = {
  title: string;
};

export default function NoteTitle({ title }: Props) {
  return (
    <div className="flex pt-2 justify-center">
      <span className="text-gray-400">{title}</span>
    </div>
  );
}
