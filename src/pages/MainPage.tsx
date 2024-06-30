import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ReactSelect from "react-select";
import { useState } from "react";

interface Props {
  notes: Note[];
  availableTags: Tag[];
}

const MainPage = ({ notes, availableTags }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const filterNotes = notes.filter(
    (note) =>
      note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())&&
      selectedTags.every((s_tag) =>
        note.tags.some((noteTag) => noteTag.value == s_tag.value)
      )
  );
  return (
    <div className="container mx-auto py-5">
      <Stack direction="horizontal" className="justify-content-between">
        <h1>notlar</h1>
        <Link to="/new">
          <Button>Oluştur</Button>
        </Link>
      </Stack>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>başlığa göre ara</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>etikete göre ara</Form.Label>
              <ReactSelect
                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                className="text-black"
                options={availableTags}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row className="g-3 mt-4">
        {filterNotes.map((note) => (
          <Col>
            <Card key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainPage;
