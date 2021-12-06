import { useStory } from "../../hooks/useStory";
import IsError from "../StatusMessage/IsError";
import IsLoading from "../StatusMessage/IsLoading";
import CommentItemWrapper from "./CommentItem/CommentItemWrapper";

const CommentList = ({ storyId }) => {
  const { isLoading, isError, data: storyData, isSuccess } = useStory(storyId);
  const itemLimit = 10;

  return isLoading ? (<IsLoading />) : isError || !storyData ? (<IsError />) : isSuccess && (  
    <div className="grid content-start gap-1 bg-white">
      <div>
        <span>{!storyData.kids ? "No" : storyData.kids.length} Comments</span>
      </div>

      { storyData.kids &&
        [...storyData.kids].slice(0, itemLimit).map((commentId) => (
          <CommentItemWrapper
            key={commentId}
            commentId={commentId}
          />
        ))
      }
    </div>
  );
}
 
export default CommentList;