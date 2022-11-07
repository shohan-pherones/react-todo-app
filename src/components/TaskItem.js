import { useContext, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { DeleteHandlerContext, EditHandlerContext } from "../App";

const TaskItem = ({
  text,
  id,
  isEditable,
  handleEditedSubmit,
  editedText,
  setEditedText,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleDelete = useContext(DeleteHandlerContext);
  const handleEdit = useContext(EditHandlerContext);

  return (
    <div className="flex items-center bg-gradient-to-r from-gray-800 to-slate-800 justify-between p-5 rounded hover:from-teal-900 hover:to-gray-800 group">
      <div className="flex gap-3">
        <span>
          <input
            type="checkbox"
            className="accent-teal-400 cursor-pointer"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </span>
        {!isEditable && (
          <p
            className={`group-hover:text-teal-400 ${
              isChecked
                ? `line-through text-gray-500 group-hover:text-teal-600`
                : null
            }`}
          >
            {text}
          </p>
        )}
        {isEditable && (
          <form onSubmit={(e) => handleEditedSubmit(e, id)}>
            <input
              required
              className="bg-transparent outline-none border-b-2 border-gray-500 focus:border-teal-400 pb-1"
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </form>
        )}
      </div>
      <div className="flex gap-3 text-gray-500">
        <button
          className="hover:text-teal-400 duration-300 cursor-pointer"
          onClick={() => handleEdit(id)}
        >
          <FiEdit />
        </button>
        <button
          className="hover:text-rose-500 duration-300 cursor-pointer"
          onClick={() => handleDelete(id)}
        >
          <FiTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
