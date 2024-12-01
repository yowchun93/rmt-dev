import { useActiveId } from "../lib/hooks";
import { jobItems } from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";

type JobItemContentProps = {
  jobItem: JobItem | null; // null on firstLoad
}

export default function JobItemContent({ jobItem }: JobItemContentProps) {
  const activeId = useActiveId();
  const [jobItem, isLoading] = useJobItem(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (!jobItem) {
    return <EmptyJobContent />;
  }

  return (
    <div className="job-content">
      <header className="job-content__header">
        <h2 className="second-heading">{jobItem.title}</h2>
        <p className="job-content__company">{jobItem.company}</p>
        <time className="job-content__time">{jobItem.date}</time>
      </header>

      <div className="job-content__main">
        <div className="job-content__left">
          <div className="job-content__badge">{jobItem.badgeLetters}</div>
          <BookmarkIcon id={jobItem.id} />
        </div>

        <div className="job-content__right">
          <p className="job-content__description">{jobItem.description}</p>
        </div>
      </div>
    </div>
  );
}
