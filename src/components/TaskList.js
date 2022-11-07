import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  error,
  isLoading,
  handleEditedSubmit,
  editedText,
  setEditedText,
}) => {
  return (
    <div className="flex flex-col gap-3 p-10 bg-gray-900 container mx-auto min-h-[300px] lg:max-w-4xl">
      {isLoading ? (
        <p className="text-center">{error ? error : "Loading..."}</p>
      ) : (
        tasks.length === 0 && <p className="text-center">No task here!</p>
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          text={task.text}
          id={task.id}
          isEditable={task.isEditable}
          handleEditedSubmit={handleEditedSubmit}
          editedText={editedText}
          setEditedText={setEditedText}
        />
      ))}
    </div>
  );
};

export default TaskList;
