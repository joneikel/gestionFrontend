import { Modal } from "antd";
import { ProjectFilters } from "../index";
import ProjectList from "./ProjectList";

const ProjectListModal = ({
  filters,
  isOpen,
  onClose,
}: {
  filters?: ProjectFilters;
  isOpen?: boolean;
  onClose: Function;
}) => {
  return (
    <Modal
      title="Lista de proyectos"
      footer={null}
      width={"90%"}
      visible={isOpen}
      onCancel={() => onClose()}
    >
      <ProjectList projectFilters={filters} />
    </Modal>
  );
};

export default ProjectListModal;
