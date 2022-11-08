import { useRef, useState } from "react";

const AddTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState("");
  const inputRef = useRef();

  // posting data
  const postData = async (text) => {
    const res = await fetch(
      "https://aluminum-delicate-snowshoe.glitch.me/tasks",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    postData(task);
    setTask("");
    inputRef.current.blur();
  };

  return (
    <form
      className="p-10 bg-gray-900 container mx-auto flex flex-col gap-5 justify-center items-center md:flex-row md:justify-between lg:max-w-4xl"
      onSubmit={addTaskHandler}
    >
      <input
        required
        ref={inputRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        type="text"
        placeholder="What things to do?"
        className="bg-transparent outline-none border-b-2 border-gray-500 py-2 px-5 focus:border-teal-400 text-center md:text-left"
      />
      <button
        type="submit"
        className="border-2 border-teal-500 py-2 px-5 rounded bg-teal-500/10 hover:bg-teal-500 duration-300 text-teal-500 hover:text-gray-900"
      >
        Add task
      </button>
    </form>
  );
};

export default AddTask;
