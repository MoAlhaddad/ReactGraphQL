import React from "react";

const EditUserModal = ({ formData, onChange, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="input"
              required
            />
          </label>
          <label className="flex flex-col">
            Position:
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={onChange}
              className="input"
              required
            />
          </label>
          <label className="flex flex-col">
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={onChange}
              className="input"
              min={18}
              max={100}
              required
            />
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isMarried"
              checked={formData.isMarried}
              onChange={onChange}
            />
            Married
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
