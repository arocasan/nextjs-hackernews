import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

import { useStory } from "../../../hooks/useStory";
import StoryItemHeader from "./StoryItemHeader";
import StoryItemDisplayLink from "./StoryItemDisplayLink";
import StoryItemFooter from "./StoryItemFooter";

const StoryItemWrapper = ({ storyId }) => {
  const router =useRouter();
  const { isLoading, isError, isSuccess, data } = useStory(storyId);

  return isLoading ? (<IsLoading />) : isError ? (<IsError />) : isSuccess && (
    <div
      className="grid transition-colors cursor-pointer sm:grid-cols-[40px,1fr] sm:border-brandDefault sm:border-brandBorder sm:rounded sm:shadow-sm sm:hover:border-brandBorderHover" 
      onClick={() => router.push('story/' + data.id)}
    >
      {/* karma vertical bar (desktop) */}
      <div className="hidden sm:flex justify-center items-start rounded-l py-2 bg-white/80">
        <span className="font-bold text-xs text-brandTextPrimary">
          { data.type !== "job" && data.score }
        </span>
      </div>

      {/* content */}
      <div className="relative justify-items-start grid gap-2 px-4 pt-2 pb-3 bg-white sm:rounded-r sm:p-2 sm:pb-1">
        {/* wrapper link (mobile only)  */}
        <Link href={'story/' + data.id}>
          <a className="absolute inset-0" />
        </Link>

        {/* header info */}
        <StoryItemHeader storyData={data} />

        {/* title */}
        <h3 className="font-medium text-brandTextPrimary text-lg leading-tight sm:leading-snug">
          {data.title}
        </h3>

        {/* display url */}
        { data.url && 
          (<StoryItemDisplayLink rawLink={data.url} />) 
        }

        {/* footer buttons */}
        <StoryItemFooter storyData={data} />
      </div>
    </div>
  );
}

// fetch loading
const IsLoading = () => {
  return (
    <div className="grid grid-cols-[40px,1fr] break-words overflow-hidden border-brandDefault border-brandBorder rounded">
      <div className="flex justify-center items-start py-2 bg-white/80">
        <div className="rounded-md w-3/4 h-3 bg-brandTextSecondary/30 animate-pulse"></div>
      </div>
      <div className="grid gap-3 items-start bg-white p-2">
        <div className="rounded-md w-8/12 h-4 bg-brandTextSecondary/30 animate-pulse sm:w-5/12"></div>
        <div className="rounded-md w-11/12 h-5 bg-brandTextSecondary/30 animate-pulse sm:w-3/4"></div>
        <div className="rounded-md w-1/2 h-4 bg-brandTextSecondary/30 animate-pulse sm:w-1/3"></div>
        <div className="flex">
          <div className="rounded-md w-28 h-5 bg-brandTextSecondary/30 animate-pulse"></div>
          <div className="rounded-md ml-2 w-28 h-5 bg-brandTextSecondary/30 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// fetch error
const IsError = () => {
  return (
    <div>An error occured.</div>
  )
}
 
export default StoryItemWrapper;