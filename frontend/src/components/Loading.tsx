const Loading = ({ classes = "" }: { classes: string }) => {
  return (
    <div className={`w-full flex justify-center items-center my-10 ${classes}`}>
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
};

export default Loading;
