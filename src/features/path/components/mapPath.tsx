import { ZoneState } from '@features/zone/lib/types';
const MapPath = (props: { zones: ZoneState[] }) => {
  let linePoints = '';
  props.zones.forEach((z) => (linePoints += `${z.Center.X},${z.Center.Y} `));
  return (
    <>
      <polyline
        points={linePoints}
        stroke="black"
        fill="none"
        strokeWidth="6"
      />
      <polyline
        points={linePoints}
        stroke="#39FF14"
        fill="none"
        strokeWidth="4"
        id="path"
      />
    </>
  );
};
export default MapPath;
