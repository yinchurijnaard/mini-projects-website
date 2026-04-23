interface TitleCardProps {
  title: string;
}

const TitleCard = ({ title }: TitleCardProps) => {
  return (
    <h1 className="text-xl sm:text-3xl p-8 font-mono text-center border-b-2 border-main-border w-full">
      {title}
    </h1>
  );
};

export default TitleCard;
