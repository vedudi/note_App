import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../../types";

type Props = {
  notes: Note[];
};

const LayOut = ({ notes }: Props) => {
  const { id } = useParams();
  const foundId = notes.find((i) => i.id === id);
  if (!foundId) return <Navigate to="/" replace />;
  return <Outlet context={foundId} />;
};

export default LayOut;
