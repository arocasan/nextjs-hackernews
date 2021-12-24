import Head from "next/head";

import SiteLayout from "../SiteLayout";
import StoryItem from "../Story/StoryItem/StoryItem";
import CommentList from "./CommentList";

const CommentView = ({ storyId, permalinkId }) => {
  return (  
    <>
      <SiteLayout contentClassName="grid-rows-[auto,1fr] gap-2 transition-colors dark:bg-brandDarkObjectBackground sm:gap-4 sm:dark:bg-transparent">
        <StoryItem 
          storyId={storyId} 
          withText 
          isStatic
          useTitle
          noError
        />

        <CommentList 
          storyId={storyId} 
          permalinkId={permalinkId} 
        />
      </SiteLayout>
    </>
  );
}
 
export default CommentView;