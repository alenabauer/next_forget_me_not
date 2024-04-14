import TaskList from "../components/task_list";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-24">
      <h1>
        Forget Me Not
      </h1>
      <TaskList />
    </main>
  );
}
