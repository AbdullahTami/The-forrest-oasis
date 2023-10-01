import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  // To clear any confusion on this component, the Modal is always rendred with the button, howerver, the window essentially depends on the click of the button which sets its name to the opens and then the widow children are rendred
  return (
    <Modal>
      {/* Model.Open component is responsibale for opening */}
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
