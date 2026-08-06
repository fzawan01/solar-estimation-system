type EnergyData = {
  monthlyBill: string;
  monthlyConsumption: string;
  powerOutages: string;
  primaryGoal: string;
  batteryStorage: string;
  futureAppliances: string;
};

type EnergyStepProps = {
  data: EnergyData;
  setData: React.Dispatch<React.SetStateAction<EnergyData>>;
  errors: Partial<Record<keyof EnergyData, boolean>>;
};

export default function EnergyStep({
  data,
  setData,
  errors,
}: EnergyStepProps) {

  return (
    <div>
      <h2 className="text-3xl font-bold text-center">
        Tell us about your energy needs
      </h2>

      <p className="text-center text-gray-500 mt-2 mb-10">
        Help us understand your electricity usage and preferences.
      </p>

      <div className="grid grid-cols-2 gap-x-10 gap-y-8">

        {/* Monthly Bill */}
        <div>
          <label className="font-medium">
            What is your average monthly electricity bill?
          </label>

          <div
            className={`flex mt-2 rounded-lg overflow-hidden border ${
              errors.monthlyBill ? "border-red-500" : "border-gray-300"
            }`}
          >
          <input
            type="number"
            min={0}
            value={data.monthlyBill}
            onChange={(e) =>
              setData({ ...data, monthlyBill: e.target.value })
            }
            onKeyDown={(e) => {
              if (["-", "e", "E"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const pasted = e.clipboardData.getData("text");
              if (pasted.includes("-")) {
                e.preventDefault();
              }
            }}
            placeholder="e.g. 15000"
            className="flex-1 p-3 outline-none"
          />

            <span className="border-l px-4 flex items-center bg-white">
              PKR
            </span>
          </div>
        </div>

        {/* Monthly Consumption */}
        <div>
          <label className="font-medium">
            What is your average monthly electricity consumption?
          </label>

          <div
            className={`flex mt-2 rounded-lg overflow-hidden border ${
              errors.monthlyConsumption ? "border-red-500" : "border-gray-300"
            }`}
          >
          <input
            type="number"
            min={0}
            value={data.monthlyConsumption}
            onChange={(e) =>
              setData({ ...data, monthlyConsumption: e.target.value })
            }
            onKeyDown={(e) => {
              if (["-", "e", "E"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const pasted = e.clipboardData.getData("text");
              if (pasted.includes("-")) {
                e.preventDefault();
              }
            }}
            placeholder="e.g. 450"
            className="flex-1 p-3 outline-none"
          />

            <span className="border-l px-4 flex items-center bg-white">
              kWh
            </span>
          </div>
        </div>

        {/* Power Outages */}
        <div>
          <label className="font-medium">
            Do you experience frequent power outages?
          </label>

          <select
            value={data.powerOutages}
            onChange={(e) =>
              setData({ ...data, powerOutages: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.powerOutages ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Occasionally</option>
          </select>
        </div>

        {/* Primary Goal */}
        <div>
          <label className="font-medium">
            What is your primary goal?
          </label>

          <select
            value={data.primaryGoal}
            onChange={(e) =>
              setData({ ...data, primaryGoal: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.primaryGoal ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>Reduce electricity bills</option>
            <option>Backup power</option>
            <option>Environmental benefits</option>
            <option>Both savings and backup</option>
          </select>
        </div>

        {/* Battery Storage */}
        <div>
          <label className="font-medium">
            Do you want battery storage?
          </label>

          <select
            value={data.batteryStorage}
            onChange={(e) =>
              setData({ ...data, batteryStorage: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.batteryStorage ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not Sure</option>
          </select>
        </div>

        {/* Future Appliances */}
        <div>
          <label className="font-medium">
            Are you planning to add high-power appliances in the future?
          </label>

          <select
            value={data.futureAppliances}
            onChange={(e) =>
              setData({ ...data, futureAppliances: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.futureAppliances ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
            <option>Not Sure</option>
          </select>
        </div>

      </div>
    </div>
  );
}