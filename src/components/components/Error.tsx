interface ErrorProps {
  message: string;
}

function ErrorComponent({ message }: ErrorProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-5 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
}

export default ErrorComponent;
