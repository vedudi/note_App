import CustomForm from "../components/Form";
import { NoteData, Tag } from "../types";
export type CreateProps = {
  createTag: (tag: Tag) => void;
  handleSubmit: (noteData: NoteData) => void;
  availableTags: Tag[];
} & Partial<NoteData>

const Create = ({ handleSubmit, createTag, availableTags }: CreateProps) => {
  return (
    <div className="container py-5">
      <h2 className="">yeni not oluştur</h2>
      <CustomForm
        handleSubmit={handleSubmit}
        createTag={createTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default Create;
