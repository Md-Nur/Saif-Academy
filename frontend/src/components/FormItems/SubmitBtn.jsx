import Link from "next/link";

const SubmitBtn = ({
  label,
  msg = "",
  link = "",
}) => {
  return (
    <div className="flex items-center justify-between">
      <button className="btn btn-info" type="submit">
        {label}
      </button>
      {msg && link && (
        <Link href={link} className="text-info font-bold">
          {msg}
        </Link>
      )}
    </div>
  );
};

export default SubmitBtn;
