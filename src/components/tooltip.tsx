import { PropsWithChildren } from "react";
import {
  TooltipProvider,
  Tooltip as BaseTooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

export function Tooltip(props: TooltipProps) {
  return (
    <TooltipProvider>
      <BaseTooltip>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent>{props.content}</TooltipContent>
      </BaseTooltip>
    </TooltipProvider>
  );
}

type TooltipProps = {
  content: string | JSX.Element;
} & PropsWithChildren<{}>;
