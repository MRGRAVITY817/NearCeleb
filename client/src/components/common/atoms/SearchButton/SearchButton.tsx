interface SearchButtonProps {
  onSubmit: () => void;
}
export const SearchButton: React.FC<SearchButtonProps> = ({ onSubmit }) => {
  return (
    <>
      <button type="button" onClick={() => onSubmit} className="m-2">
        Search
      </button>
    </>
  );
};
