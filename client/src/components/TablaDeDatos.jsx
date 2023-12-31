import { Button, ButtonGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

const TablaDeDatos = (props) => {
  const { lista, usuario } = props;

  const navigate = useNavigate();

  const ver = (id) => {
    navigate("/ver/" + id);
  };
  const editar = (id) => {
    navigate("/editar/" + id);
  };

  const eliminar = (id) => {
    navigate("/eliminar/" + id);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Avatar</th>
          <th>Autor</th>
          <th>Publicacion</th>
        </tr>
      </thead>
      <tbody>
        {lista.map((item, key) => (
          <tr key={key}>
            <td>{key + 1}</td>
            <td>
              <img
                src={item.autor.avatarURL}
                alt="avatar"
                width={60}
                height={60}
              />
            </td>
            <td>{item.autor.nombres + ", " + item.autor.apellidos}</td>
            <td>{item.titulo}</td>
            <td>
              <ButtonGroup style={{ maxWidth: "50px" }}>
                <Button variant="primary" onClick={() => ver(item._id)}>
                  Ver
                </Button>

                {usuario && usuario.id === item.autor._id && (
                  <>
                    <Button variant="success" onClick={() => editar(item._id)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => eliminar(item._id)}>
                      Eliminar
                    </Button>
                  </>
                )}
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaDeDatos;
