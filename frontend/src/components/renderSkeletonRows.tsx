import { Skeleton } from "./ui/skeleton";

export type itemsCount = {
  counts: number[];
};

export const renderSkeletonRows = ({ counts }: itemsCount) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr
          key={i}
          className="w-full block md:table-row mb-4 md:mb-0 rounded-lg border p-3 "
        >
          {counts.map((item, idx) => (
            <td
              key={idx}
              className={`p-3 block md:table-cell  md:border-0 `}
              colSpan={item}
            >
              <Skeleton className="h-4 w-full bg-slate-100" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
