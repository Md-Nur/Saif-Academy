"use client";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const Batch = ({ limit = NaN }: { limit: number }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["batches"],
    queryFn: async () => {
      const res = await axios("/batches");
      return res.data;
    },
  });

  return (
    <div className="w-full my-20 max-w-7xl mx-auto">
      <Title>
        {limit ? "Popular Bathes" : "All Batches"}
      </Title>
      {isLoading && <Loading classes="" />}
      {isError && <h2 className="text-center text-error">{error.message}</h2>}
      <div className="sm:m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.length &&
          data.map(
            (
              batch: {
                title: string;
                desc: string;
                imgUrl: string;
              },
              i: number
            ) => (
              <Card key={i.toString()} imgUrl={batch?.imgUrl}>
                <h2 className="text-xl font-bold mb-2">{batch?.title}</h2>
                <p className="mb-4">{batch?.desc}</p>
                <div className="flex justify-evenly">
                  <button className="btn btn-info">Details</button>
                  <button className="btn btn-accent">Enroll</button>
                </div>
              </Card>
            )
          )}
      </div>
      {!Number.isNaN(limit) && (
        <div className="w-full flex justify-center items-center">
          <Link className="btn btn-accent mx-auto" href="/batches">
            Show All Batch
          </Link>
        </div>
      )}
    </div>
  );
};

export default Batch;
