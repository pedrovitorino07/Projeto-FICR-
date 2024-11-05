import "../styles/MainEvent.css";
import Lixeira from "../assets/thrash.png";
import Lapis from "../assets/pencil.png";
import Eye from "../assets/eye.png";
import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../services/eventService";
import { Link } from "react-router-dom";

function MainEvent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setData(events.list);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este evento?");
    if (confirmDelete) {
      try {
        await deleteEvent(id);
        setData((prevData) => prevData.filter(event => event.id !== id));
        alert("Evento excluído com sucesso!");
      } catch (error) {
        console.error('Erro ao excluir o evento:', error);
        alert("Erro ao excluir o evento. Tente novamente.");
      }
    }
  };

  return (
    <div className="main-event">
      <h1>Eventos</h1>
      <div className="tabela">
        <div className="indice linha">
          <span className="celula">Título</span>
          <span className="celula">Data e hora</span>
          <span className="celula">Detalhes</span>
          <span className="celula">Excluir</span>
        </div>

        {data.map((event) => (
          <div key={event.id} className="linha">
            <span className="celula">
              <img src={event.imagePath} alt={event.title} className="imagem-evento" />
            </span>
            <span className="celula">{event.title}</span>
            <span className="celula">{event.description}</span>
            <span className="celula">
              {new Date(event.scheduling).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
            <span className="celula">
              <Link
                to="/update-event"
                state={{
                  id: event.id,
                  title: event.title,
                  description: event.description,
                  imagePath: event.imagePath,
                  scheduling: event.scheduling,
                }}
              >
                <img src={Eye} alt="Editar" />
              </Link>
            </span>
            <span className="celula">
              <img
                src={Lixeira}
                alt="Excluir"
                onClick={() => handleDelete(event.id)}
                style={{ cursor: "pointer" }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainEvent;
