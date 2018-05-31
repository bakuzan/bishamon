import { SwimlaneStatus } from 'constants/status';

const STATUS_MAP = SwimlaneStatus.reduce((p, c) => p.set(c, []), new Map());

export function createStatusMapForBoard(data) {
  return data.reduce((p, c) => {
    const v = p.get(c.status) || [];
    return p.set(c.status, [...v, c]);
  }, new Map([...STATUS_MAP.entries()]));
}
