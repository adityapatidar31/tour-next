import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Welcome to the Home Page!</h2>
      <div className="mt-4">
        <Link to="/home/1" className="text-violet-600 hover:underline">
          Go to Content 1
        </Link>
      </div>
      <div className="mt-2">
        <Link to="/home/2" className="text-violet-600 hover:underline">
          Go to Content 2
        </Link>
      </div>
      <div className="mt-2">
        <Link to="/home/3" className="text-violet-600 hover:underline">
          Go to Content 3
        </Link>
      </div>
    </div>
  );
}
