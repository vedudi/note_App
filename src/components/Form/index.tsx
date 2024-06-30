import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { CreateProps } from "../../pages/Create";
import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactSelectCreatable from "react-select/creatable";
import { Tag } from "../../types";
import { v4 } from "uuid";
import styles  from "./form.module.css";


const CustomForm = ({
  handleSubmit,
  createTag,
  availableTags,
  markdown="",
  title="",
  tags=[]
}: CreateProps) => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit({
      title: inputRef.current?.value as string,
      markdown: textareaRef.current?.value as string,
      tags: selectedTags,
    });
    navigate("/");
  };
  return (
    <Form onSubmit={handleSend} className="mt-5">
      <Stack className={styles.note_form}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>başlık</Form.Label>
              <Form.Control defaultValue={title} ref={inputRef} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>etiketler</Form.Label>
              <ReactSelectCreatable
              onChange={(allTags)=>setSelectedTags(allTags as Tag[])}
                onCreateOption={(text: string) => {
                  const newTag: Tag = { label: text, value: v4() };
                  createTag(newTag);
                  setSelectedTags([...selectedTags, newTag])
                }}
                isMulti
                className="text-black"
                value={selectedTags}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mt-4">
          <Form.Label>içerik (markdown destekler)</Form.Label>
          <Form.Control
          defaultValue={markdown}
            as="textarea"
            ref={textareaRef}
            style={{ minHeight: "300px", maxHeight: "500px" }}
          />
        </Form.Group>
        <Stack
          gap={4}
          direction="horizontal"
          className="justify-content-end mt-5"
        >
          <Button type="submit"> Kaydet</Button>
          <Link to="/">
          <Button type="button" variant="secondary">
            {" "}
            Geri
          </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default CustomForm;
