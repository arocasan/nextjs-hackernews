import { useState } from "react/cjs/react.development";
import { useComment } from "../../../hooks/useComment";
import { useHtmlParser } from "../../../hooks/useHtmlParser";
import ItemIsError from "../../StatusMessage/ItemIsError";

const CommentItemWrapper = ({ commentId, submitterId, replyDepthLimit, parentDepth = 0 }) => {
  const { isLoading, isError, data, isSuccess } = useComment(commentId);
  const [isLoadedManually, setIsLoadedManually] = useState(false);
  const currentDepth = parentDepth + 1;

  return isLoading ? (<IsLoading />) : isError || !data ? (<ItemIsError />) : isSuccess && (
    data.deleted || data.dead ? (<IsDeadOrDeleted />) : (  
      <div className="text-sm border-t-2 border-brandBorder  group-first:bg-red-500 group-first-of-type:border-t-0">
        { data.dead && <p className="text-red-500">dead comment</p>}
        <div className="grid gap-2">
          <p>d{currentDepth} - { data.id }</p>
          <p>{ data.kids && "kids: " + data.kids.length }</p>

          {/* display comment replies if set parameters are met, else display replies trigger */}
          { currentDepth < replyDepthLimit || isLoadedManually ? (
            <CommentItemReplies 
              replyIds={data.kids} 
              replyDepthLimit={replyDepthLimit}
              parentDepth={currentDepth}
              manualLoad={isLoadedManually}
            />
          ) : data.kids && (
            <button 
              className="text-left"
              onClick={() => setIsLoadedManually(true)}
            >
              Load More Replies
            </button>
          )}
          { console.log({parentDepth},{currentDepth},{replyDepthLimit},currentDepth < replyDepthLimit) }
        </div>
      </div>
    )
  );
}

// comment replies
const CommentItemReplies = ({ replyIds, replyDepthLimit, parentDepth }) => {
  return !replyIds ? null : replyIds.length <= 0 ? null : (
    <div className="grid gap-5 ml-5 mt-5">
      { replyIds.map((replyId) => (
        <CommentItemWrapper 
          key={replyId}
          commentId={replyId} 
          replyDepthLimit={replyDepthLimit}
          parentDepth={parentDepth}
        />
      ))}
    </div>
  );
}

// comment item loader
const IsLoading = () => {
  return (
    <div className="grid sm:grid-cols-[40px,1fr] sm:border-brandDefault sm:border-brandBorder sm:rounded">
      <div className="hidden sm:flex justify-center items-start py-2 bg-white/80">
        <div className="rounded-md w-3/4 h-3 bg-brandTextSecondary/30 animate-pulse"></div>
      </div>
      <div className="grid gap-3 items-start bg-white px-4 pt-2 pb-3 sm:p-2">
        <div className="flex items-center">
          <div className="rounded-full mr-[0.375rem] w-6 h-6 bg-brandTextSecondary/30 animate-pulse"></div>
          <div className="rounded-md w-1/2 h-4 bg-brandTextSecondary/30 animate-pulse sm:w-5/12"></div>
        </div>
        <div className="rounded-md w-10/12 h-5 bg-brandTextSecondary/30 animate-pulse sm:w-3/4"></div>
        <div className="rounded-md w-1/2 h-5 bg-brandTextSecondary/30 animate-pulse sm:h-4 sm:w-1/3"></div>
        <div className="mt-[0.375rem] flex sm:mt-0">
          <div className="rounded-md w-20 h-5 bg-brandTextSecondary/30 animate-pulse sm:w-28"></div>
          <div className="rounded-md ml-2 w-14 h-5 bg-brandTextSecondary/30 animate-pulse sm:w-28"></div>
        </div>
      </div>
    </div>
  );
}

const IsDeadOrDeleted = () => {
  return (
    <div>Comment is dead or deleted</div>
  )
}
 
export default CommentItemWrapper;