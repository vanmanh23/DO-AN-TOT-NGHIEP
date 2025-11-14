import { CircleArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "../../../components/ui/skeleton";

type InforCardProps = {
  title: string;
  iconsvg: string;
  linkValue: string;
  bg_color?: string;
  content: string;
  isLoading?: boolean;
};
export default function MoreInforCard({
  title,
  iconsvg,
  linkValue,
  bg_color,
  content,
  isLoading,
}: InforCardProps) {
  if (isLoading) {
    return (
      <div>
        <Skeleton className="flex w-full h-12 bg-slate-100" />
        <Skeleton className="flex w-full h-12 bg-slate-100" />
        <Skeleton className="flex w-full h-12 bg-slate-100" />
      </div>
    );
  }
  return (
    <div className={`flex flex-col w-full gap-2 p-2 rounded-md ${bg_color}`}>
      <div className="flex flex-row justify-between">
        <div>
          <p className="font-bold">{title}</p>
          <p>{content}</p>
        </div>
        <div>
          <img src={iconsvg} alt="#" className="w-14 h-14" />
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <Link to={linkValue} className="text-sm">
          <div className="flex flex-row text-secondary items-center gap-1 justify-center hover:text-secondary/85">
            <p>More infor</p>
            <CircleArrowRight size={14} />
          </div>
        </Link>
      </div>
    </div>
  );
}
