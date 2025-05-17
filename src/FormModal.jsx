import React from "react";

export const FormModal = ({
  setFormData,
  formData,
  handleUpdate,
  setFormModal,
  formModal,
}) => {
  return (
    <div>
      <div className="flex z-10 bg-black/70 inset-0  fixed justify-center items-center">
        <form className="bg-white p-10 w-1/2 rounded-lg">
          <div>
            <p className="text-3xl font-bold">Edit</p>
            <label>Task</label>
            <input
              type="text"
              className="ring-1 ring-gray-400 p-2 flex rounded w-full"
              value={formData.task}
              onChange={(e) =>
                setFormData({ ...formData, task: e.target.value })
              }
              placeholder="Eg.Finish React project"
            />
          </div>
          <div>
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="ring-1 ring-gray-400 p-2 flex rounded w-full"
            >
              <option value="">--Select Status--</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
              className="ring-1 ring-gray-400 p-2 flex rounded w-full"
            >
              <option value="">--Select Priority--</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="ring-1 ring-gray-400 p-2 flex rounded w-full"
            >
              <option value="">Select Category</option>
              <option value="health">Health</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="tech">Tech</option>
              <option value="career">Career</option>
              <option value="family">Family</option>
              <option value="hobby">Hobby</option>
              <option value="leisure">Leisure</option>
              <option value="travel">Travel</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <label>Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="h-20 w-full ring-1 p-2 resize-none ring-gray-400 rounded col-span-full"
            placeholder="Details about your task"
          />
          <div className="flex gap-x-2">
            <button
              className="bg-blue-700 hover:bg-blue-500 text-white px-2 py-1 rounded col-span-full"
              type="submit"
              onClick={() => handleUpdate(formData)}
            >
              Update
            </button>
            <button
              className="bg-red-700 hover:bg-red-500 text-white px-2 py-1 rounded col-span-full"
              type="submit"
              onClick={() => setFormModal(!formModal)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
