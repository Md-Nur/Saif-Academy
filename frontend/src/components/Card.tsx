import Image from "next/image";
import { ReactNode } from "react";

const Card = ({
  key,
  children,
  imgUrl,
}: {
  key: string;
  children: ReactNode;
  imgUrl: string;
}) => {
  return (
    <div key={key} className="bg-base-300 shadow-lg rounded-lg overflow-hidden">
      {imgUrl && (
        <Image
          width={800}
          height={500}
          src={imgUrl}
          alt="Card Image"
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;
