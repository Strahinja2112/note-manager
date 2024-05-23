import { useLocation } from "@renderer/hooks/useLocation";
import { myRepoLink, projectRepoLink } from "@shared/constants";
import { ArrowRightIcon, Book, BugIcon, GithubIcon, UserIcon, X } from "lucide-react";

type Props = {};

const links = [
  {
    icon: GithubIcon,
    title: "GitHub Repository",
    href: projectRepoLink
  },
  {
    icon: UserIcon,
    title: "Developer",
    href: myRepoLink
  },
  {
    icon: BugIcon,
    title: "Report an Issue",
    href: `${projectRepoLink}issues`
  },
  {
    icon: Book,
    title: "Learn more about the project",
    href: "https://strahinja.vercel.app/projects/notemanager",
    hidden: true
  }
];

export default function Settings({}: Props) {
  const { setLocation } = useLocation();
  return (
    <main className="flex-1 relative bg-zinc-900/40 p-4 md:p-6 flex flex-col items-center justify-center rounded-none">
      <X className="absolute top-2 right-2 cursor-pointer" onClick={() => setLocation("editor")} />
      <div className="flex flex-col items-center justify-center h-screen space-y-10">
        <div className="space-y-2 flex border-b items-center pb-2 justify-center flex-col">
          <h1 className="text-3xl font-bold">Note Manager</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            A modern note-taking app built with Electron.js, React, Typescript and TailwindCSS.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              target="_blank"
              key={link.href}
              className="border p-2 rounded-md transition-all duration-200 ease-in-out flex items-center justify-between gap-8 hover:border-zinc-700"
              href={link.href}
            >
              <div className="flex items-center justify-center gap-3">
                <link.icon className="text-muted-foreground" />
                <div className="flex flex-col">
                  <h2 className="text-xl">{link.title}</h2>
                  {link.hidden ? null : <p className="text-zinc-600 text-sm">{link.href}</p>}
                </div>
              </div>
              <ArrowRightIcon className="h-6 w-6 text-gray-500 dark:text-gray-400 hover:translate-x-2 transform transition-all duration-200 ease-in-out" />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
