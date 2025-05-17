import React from "react";

export const Data = ({
  todos,
  handleDelete,
  handleEditInput,
  categoryColors,
}) => {
  return (
    <div className=" grid grid-cols-4 mx-auto gap-4">
      {todos.map((todo) => (
        <div key={todo.id} className="bg-white shadow-sm rounded p-4 ">
          <h2 className="font-bold text-sm my-1">{todo.task}</h2>
          <p className="text-xs my-1">status: {todo.status}</p>
          <p className="text-xs my-1">Priority: {todo.priority}</p>
          <p className="text-xs my-4">{todo.notes}</p>

          <div className="flex justify-between mt-2">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                categoryColors[todo.category]
              }`}
            >
              {todo.category}
            </span>

            <div className="flex gap-x-2">
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 text-xs"
              >
                Delete
              </button>

              <button
                onClick={() => handleEditInput(todo)}
                className="bg-yellow-300 text-white px-2 py-1 rounded hover:bg-yellow-500 text-xs"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
