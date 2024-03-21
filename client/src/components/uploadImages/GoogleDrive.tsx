import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdDelete } from "react-icons/md";

const GoogleDrive = ({ onSubmitClick }) => {
  const { control, handleSubmit } = useForm();
  const [inputs, setInputs] = useState([
    { id: Math.random().toString(), value: "" },
  ]);

  const addInput = () => {
    setInputs([...inputs, { id: Math.random().toString(), value: "" }]);
  };

  const removeInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const onSubmit = (data) => {
    const links = Object.values(data).filter((value) => value !== "");
    onSubmitClick({ gDriveLinks: links });
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col gap-5">
        {inputs.map((input, index) => (
          <div key={input.id} className="mb-5">
            <label
              htmlFor={`link${index}`}
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Google Drive Folder Link
            </label>
            <div className="flex">
              <Controller
                control={control}
                name={`link${index}`}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id={`link${index}`}
                    className="shadow-sm max-w-xl bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="https://drive.google.com/file/....."
                  />
                )}
              />
              {index > 0 && (
                <button
                  className="ml-5 text-5xl "
                  type="button"
                  onClick={() => removeInput(input.id)}
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" onClick={addInput}>
          Add More Links
        </button>
      </div>
      <button
        className=" ml-5 text-5xl text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default GoogleDrive;
