interface ErrorMessageProps {
  message: string;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <span style={{ fontSize: `1em` }} className="text-red-500">
      {message}
    </span>
  );
};
