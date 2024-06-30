import { Badge, Card, CardBody, Stack } from "react-bootstrap";
import { Note } from "../../types";
import styles  from "./card.module.css";
import { useNavigate } from "react-router-dom";


type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  const navigate=useNavigate()
  return (
    <Card
    onClick={()=>navigate(`/note/${note.id}`)}
     className={styles.note_card}>
      <CardBody>
        <Stack className="align-items-center h-100 justify-content-between" gap={3}>
          <span className="fw-bold text-nowrap">{note.title}</span>
          <Stack direction="horizontal" className="justify-content-center" gap={3}>
            {note.tags.map((tag) => (
              <Badge>{tag.label}</Badge>
            ))}
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NoteCard;
