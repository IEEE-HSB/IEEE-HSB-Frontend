import { chairpersonsData } from "@/data/ChairpersonsData";
import ChairCard from "../common/ChairCard";

const ChairPersons = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {chairpersonsData.map((card) => (
            <ChairCard key={card.id} chairperson={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChairPersons;