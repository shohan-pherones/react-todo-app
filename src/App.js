import { createContext, useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

export const DeleteHandlerContext = createContext();
export const EditHandlerContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editedText, setEditedText] = useState("");
  const [togglingEditMode, setTogglingEditMode] = useState(true);

  // getting data
  const getData = async () => {
    try {
      const res = await fetch(
        "https://aluminum-delicate-snowshoe.glitch.me/tasks"
      );
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      setTasks(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // deleting data
  const handleDelete = (id) => {
    deleteData(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteData = async (id) => {
    await fetch(`https://aluminum-delicate-snowshoe.glitch.me/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  // editing phase
  const handleEdit = (id) => {
    const [editableTarget] = tasks.filter((task) => task.id === id);
    editableTarget.isEditable = true;
    setEditedText(editableTarget.text);
    setTasks([...tasks]);
    setTogglingEditMode(false);

    tasks
      .filter((task) => task.id !== id)
      .map((target) => (target.isEditable = false));
  };

  // editing task
  const handleEditedSubmit = (e, id) => {
    e.preventDefault();

    setTogglingEditMode(!togglingEditMode);

    const editPersistance = {
      text: editedText,
      id: id,
    };

    putRequest(id, editPersistance);

    const [editableTarget] = tasks.filter((task) => task.id === id);
    editableTarget.isEditable = false;
    editableTarget.text = editPersistance.text;
    setTasks([...tasks]);
  };

  const putRequest = async (id, editPersistance) => {
    await fetch(`https://aluminum-delicate-snowshoe.glitch.me/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editPersistance),
    });
  };

  return (
    <div className="bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 py-10 flex flex-col">
      <DeleteHandlerContext.Provider value={handleDelete}>
        <EditHandlerContext.Provider value={handleEdit}>
          <Header />
          <AddTask tasks={tasks} setTasks={setTasks} />
          <TaskList
            tasks={tasks}
            error={error}
            isLoading={isLoading}
            handleEditedSubmit={handleEditedSubmit}
            editedText={editedText}
            setEditedText={setEditedText}
          />
          <Footer />
        </EditHandlerContext.Provider>
      </DeleteHandlerContext.Provider>
    </div>
  );
};

export default App;
