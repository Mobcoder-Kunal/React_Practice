import Card from "../components/Card";
import useDevelopers from "../hooks/useDevelopers";

function CardPage() {
  const developers = useDevelopers();
  return (
    <div>
      {developers.map((dev) => (
        <Card
          key={dev.id}
          name={dev.name}
          role={dev.role}
          skills={dev.skills}
        />
      ))}
    </div>
  );
}

export default CardPage;
