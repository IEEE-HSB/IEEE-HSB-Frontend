import { chairpersonsData } from "@/data/ChairpersonsData";
import ChairCard from "../common/ChairCard";


const ChairPersons = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center my-16 px-2">
      {chairpersonsData.map((card) => (
        <ChairCard key={card.id} chairperson={card} />
      ))}
    </div>
  );
};

export default ChairPersons;
