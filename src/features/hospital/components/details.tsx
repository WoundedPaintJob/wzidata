import StatRow from "@components/atoms/statrow";
import { formatNumber } from "@helpers/numberHelper";
import { hospitalsSavedAtLevel } from "../lib/helper";
import { HospitalState } from "../lib/types";
import { Settings } from "src/settings";

const HospitalDetails = (props: { hospital: HospitalState }) => {
  return (
    <div className="flex">
      <img src={`${Settings.RewardUrl}Hospital.png`} className="w-6 h-6" />
      <StatRow
        name="Saves"
        value={formatNumber(hospitalsSavedAtLevel(props.hospital))}
      />
    </div>
  );
};
export default HospitalDetails;
