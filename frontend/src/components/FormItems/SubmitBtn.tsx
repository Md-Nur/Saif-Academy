import Link from "next/link";

const SubmitBtn = ({
  label,
  msg,
  link,
  disabled = false,
}: {
  label: string;
  msg?: string;
  link?: string;
  disabled?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <button disabled={disabled} className="btn btn-info uppercase" type="submit">
        {label}
      </button>
      {msg && link && (
        <Link href={link} className="text-info">
          {msg}
        </Link>
      )}
    </div>
  );
};

export default SubmitBtn;
