/**
 * @fluxloop-ai/pds-ui — 소스 노출형 컴포넌트 패키지.
 *
 * 1차 소비 경로: shadcn CLI 로 앱 레포에 파일 복사.
 *   npx shadcn add https://pluto-design-system-docs.vercel.app/r/separator
 *
 * 2차 소비 경로: 워크스페이스 내부(docs 앱, 동 모노레포 앱)에서는 소스 import.
 *   import { Separator } from "@fluxloop-ai/pds-ui/components/separator";
 */

export type {
  ActionCardDescriptionProps,
  ActionCardLeadingProps,
  ActionCardProps,
  ActionCardTitleProps,
  ActionCardTrailingProps,
} from "./components/action-card";
export {
  ActionCard,
  ActionCardDescription,
  ActionCardLeading,
  ActionCardTitle,
  ActionCardTrailing,
  actionCard,
} from "./components/action-card";
export type {
  ActionTileContentProps,
  ActionTileDescriptionProps,
  ActionTileFooterProps,
  ActionTileHeaderProps,
  ActionTileLeadingProps,
  ActionTileProps,
  ActionTileTitleProps,
} from "./components/action-tile";
export {
  ActionTile,
  ActionTileContent,
  ActionTileDescription,
  ActionTileFooter,
  ActionTileHeader,
  ActionTileLeading,
  ActionTileTitle,
  actionTile,
} from "./components/action-tile";
export type {
  AppShellMainProps,
  AppShellPanelHeaderProps,
  AppShellProps,
  AppShellSidebarProps,
  AppShellSidePanelProps,
  AppShellSplitterProps,
} from "./components/app-shell";
export {
  AppShell,
  AppShellLeadingControls,
  AppShellMain,
  AppShellMainBody,
  AppShellMainHeader,
  AppShellSidebar,
  AppShellSidebarBody,
  AppShellSidebarFooter,
  AppShellSidebarHeader,
  AppShellSidePanel,
  AppShellSidePanelBody,
  AppShellSidePanelHeader,
  AppShellSplitter,
  AppShellTrailingControls,
} from "./components/app-shell";
export type { AvatarProps } from "./components/avatar";
export { Avatar, avatar } from "./components/avatar";
export type { BadgeProps } from "./components/badge";
export { Badge, badge } from "./components/badge";
export type { ButtonProps } from "./components/button";
export { Button, button } from "./components/button";
export type { ChatAssistantMessageProps } from "./components/chat-assistant-message";
export { ChatAssistantMessage, chatAssistantMessage } from "./components/chat-assistant-message";
export type { ChatAttachmentChipProps } from "./components/chat-attachment-chip";
export { ChatAttachmentChip, chatAttachmentChip } from "./components/chat-attachment-chip";
export type { ChatComposerProps } from "./components/chat-composer";
export { ChatComposer, chatComposer } from "./components/chat-composer";
export type { ChatLoadingDotsProps } from "./components/chat-loading-dots";
export { ChatLoadingDots, chatLoadingDots } from "./components/chat-loading-dots";
export type {
  ChatProcessTraceProps,
  ProcessTraceBlock,
  ResolveToolIcon,
  ResolveToolLabel,
} from "./components/chat-process-trace";
export { ChatProcessTrace, chatProcessTrace } from "./components/chat-process-trace";
export type { ChatUserMessageProps } from "./components/chat-user-message";
export { ChatUserMessage, chatUserMessage } from "./components/chat-user-message";
export type { CheckboxProps } from "./components/checkbox";
export { Checkbox, checkbox } from "./components/checkbox";
export type { ChipProps } from "./components/chip";
export { Chip, chip } from "./components/chip";
export type {
  ComboboxContentProps,
  ComboboxFilter,
  ComboboxItemProps,
  ComboboxProps,
} from "./components/combobox";
export {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  combobox,
} from "./components/combobox";
export type { DialogContentProps } from "./components/dialog";
export {
  Dialog,
  DialogActionArea,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogNavigation,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog";
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/dropdown-menu";
export type {
  FormDescriptionProps,
  FormErrorMessageProps,
  FormFieldProps,
  FormLabelProps,
} from "./components/form";
export {
  FormControl,
  FormDescription,
  FormErrorMessage,
  FormField,
  FormLabel,
  form,
} from "./components/form";
export type { IconProps } from "./components/icon";
export { Icon, icon } from "./components/icon";
export type { IconButtonProps } from "./components/icon-button";
export { IconButton, iconButton } from "./components/icon-button";
export type { InputProps } from "./components/input";
export { Input, input } from "./components/input";
export type { PageContainerProps } from "./components/page-container";
export { PageContainer, pageContainer } from "./components/page-container";
export type { PanelCellProps, PanelProps } from "./components/panel";
export { Panel, PanelCell, panel } from "./components/panel";
export type { PopoverContentProps } from "./components/popover";
export {
  Popover,
  PopoverActionArea,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTitleRow,
  PopoverTrigger,
  popover,
} from "./components/popover";
export type { ProgressIndicatorProps, ProgressProps } from "./components/progress";
export { Progress, ProgressIndicator, progress } from "./components/progress";
export type { RadioGroupItemProps, RadioGroupProps } from "./components/radio-group";
export { RadioGroup, RadioGroupItem, radio } from "./components/radio-group";
export type {
  RemovableTab,
  RemovableTabBarProps,
  RemovableTabBarSize,
} from "./components/removable-tab-bar";
export { RemovableTabBar, removableTabBar } from "./components/removable-tab-bar";
export type { ScrollAreaProps } from "./components/scroll-area";
export { ScrollArea, ScrollBar } from "./components/scroll-area";
export type { SectionHeaderProps } from "./components/section-header";
export { SectionHeader, sectionHeader } from "./components/section-header";
export type {
  SegmentedControlItemProps,
  SegmentedControlProps,
} from "./components/segmented-control";
export {
  SegmentedControl,
  SegmentedControlItem,
  segmentedControl,
} from "./components/segmented-control";
export type { SelectContentProps, SelectTriggerProps } from "./components/select";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  select,
} from "./components/select";
export type { SeparatorProps } from "./components/separator";
export { Separator, separator } from "./components/separator";
export type { SidebarListItem, SidebarListProps } from "./components/sidebar-list";
export { SidebarList, sidebarList } from "./components/sidebar-list";
export type { SidebarMenuItem, SidebarMenuProps } from "./components/sidebar-menu";
export { SidebarMenu, sidebarMenu } from "./components/sidebar-menu";
export type { SpinnerProps } from "./components/spinner";
export { Spinner, spinner } from "./components/spinner";
export type { SwitchProps } from "./components/switch";
export { Switch, switchStyles } from "./components/switch";
export type { TabsProps } from "./components/tabs";
export { Tabs, TabsContent, TabsList, TabsTrigger, tabs } from "./components/tabs";
export type { TextButtonProps } from "./components/text-button";
export { TextButton, textButton } from "./components/text-button";
export type { ToastRootProps } from "./components/toast";
export {
  Toast,
  ToastAction,
  ToastProvider,
  ToastViewport,
} from "./components/toast";
export type { TooltipContentProps, TooltipProps } from "./components/tooltip";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  tooltip,
} from "./components/tooltip";
export type {
  ScrollFadeMaskOptions,
  UseScrollFadeOptions,
  UseScrollFadeResult,
} from "./utils/scroll-fade";
export { getScrollFadeMask, useScrollFade } from "./utils/scroll-fade";
