interface TimelineProps {
  startDate: string;
  endDate: string;
  items: any;
}

interface MovementType {
  DRAG: number;
  RESIZE: number;
  LEFT: number;
  RIGHT: number;
  NONE: number;
}

interface PassiveEvent {
  passive: boolean;
}
