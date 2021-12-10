import Link from 'next/link';
import * as Tooltip from '@radix-ui/react-tooltip';

import { useFullDateTime, useRelativeTime } from '../../hooks/useDate';

const TimeTooltip = ({ className, unixTime, contentId, isComment }) => {
  const relativeTime = useRelativeTime(unixTime);

  return !unixTime ? null : (  
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        { contentId ? (
          <span className={className}>
            <Link href={(!isComment ? "/story/" : "/comment/") + contentId}>
              <a className="hover:underline">
                { relativeTime }
              </a>
            </Link>
          </span>
        ) : (
          <span className="hover:underline">
            { relativeTime }
          </span>
        )}
      </Tooltip.Trigger>
      <Tooltip.Content 
        className="rounded px-2 py-1 bg-black font-medium text-xs text-white"
        side="top"
        sideOffset={4}
      >
        <span>{ useFullDateTime(unixTime) }</span>
        <Tooltip.Arrow className="my-[-0.5px] text-black fill-current" />
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
 
export default TimeTooltip;