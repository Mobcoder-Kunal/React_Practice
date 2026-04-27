import "../styles/card.css";

function Card({ name, role, skills }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{skills}</p>
    </div>
  );
}

export default Card;
