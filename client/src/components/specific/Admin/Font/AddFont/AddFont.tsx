export const AddFont = () => {
  return (
    <div>
      <form
        onSubmit={() => console.log("Add Font")}
        className="flex flex-col items-center justify-center p-2 laptop:p-8 border-2 border-gray-600"
      >
        <h1 className="text-3xl">Add Font</h1>
        <h1 className="mt-2 text-xl opacity-80">Not available yet</h1>
      </form>
    </div>
  );
};
