import { useState } from "react";

import { useStory } from "../../hooks/useStory";
import IsError from "../StatusMessage/IsError";
import IsLoading from "../StatusMessage/IsLoading";
import CommentItem from "./CommentItem/CommentItem";

const CommentList = ({ storyId }) => {
  const { isLoading, isError, data: storyData, isSuccess } = useStory(storyId, false);
  const [isCountLimited, setIsCountLimited] = useState(true);   // todo: save state locally
  const replyDepthLimit = 3;
  const defaultCount = 10;

  const handleClick = (e) => {
    e.preventDefault();
    setIsCountLimited(false);
  }

  return isLoading ? (<IsLoading />) : isError || !storyData ? (<IsError />) : isSuccess && (  
    <div className="grid content-start gap-3 pt-1 pb-3 bg-white sm:border-brandDefault sm:border-brandBorder sm:rounded sm:p-3 sm:shadow-sm">
      {/* mobile comment count (displayed by default) */}
      <div className="px-4 sm:hidden">
        <span className="font-bold text-xs sm:hidden">
          { storyData.descendants === 0 ? "No" : storyData.descendants } Comment{ storyData.descendants !== 1 && "s" }
        </span>
      </div>

      {/* desktop comment count (only displayed if there are no comments) */}
      { storyData.descendants === 0 && (
        <div className="hidden sm:block">
          <span className="font-medium">
            No Comments
          </span>
        </div>
      )}
      
      {/* comment list */}
      { storyData.kids && (
        <div className="group grid content-start gap-5">
          {
            [...storyData.kids].slice(0, isCountLimited ? defaultCount : storyData.kids.length).map((commentId) => (
              <CommentItem
                key={commentId}
                commentId={commentId}
                submitterId={storyData.by}
                replyDepthLimit={replyDepthLimit}
              />
            ))
          }
        </div>
      )}

      {/* load more comments trigger */}
      { isCountLimited && storyData.kids && storyData.kids.length > defaultCount && (
        <div className="px-4">
          <button
            className="font-bold text-xs text-brandButtonInlineText tracking-wider text-left hover:underline sm:text-brandTextPrimary"
            onClick={(e) => handleClick(e)}
          >
            Show all { storyData.kids.length - defaultCount} comments
          </button>
        </div>
      )}
    </div>
  );
}
 
export default CommentList;