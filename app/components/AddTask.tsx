import { Button } from '@mui/material';

const AddTask = () => {
  return (
    <form className="mb-4 space-y-3">
      <input
        type="text"
        className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
      />
      <Button
        variant="contained"
        className="w-full px-4 py-2 text-white bg-primary hover:bg-green-800"
        disableElevation
      >
        Add Task
      </Button>
    </form>
  );
};

export default AddTask;
