export const DeleteFont = () => {
  return (
    <div>
      <form
        onSubmit={() => console.log("Delete Font")}
        className="flex flex-col items-center justify-center p-2 laptop:p-8 border-2 border-gray-600"
      >
        <h1 className="text-3xl">Delete Font</h1>
        <h1 className="mt-2 text-xl opacity-80">Not available yet</h1>
      </form>
    </div>
  );
};
