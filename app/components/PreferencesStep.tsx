type PreferencesData = {
  budget: string;
  timeline: string;
  systemType: string;
  roofShading: string;
  comments: string;
};

type PreferencesStepProps = {
  data: PreferencesData;
  setData: React.Dispatch<React.SetStateAction<PreferencesData>>;
  errors: Partial<Record<keyof PreferencesData, boolean>>;
};

export default function PreferencesStep({
  data,
  setData,
  errors,
}: PreferencesStepProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center">
        Installation Preferences
      </h2>

      <p className="text-center text-gray-500 mt-2 mb-10">
        Tell us about your installation preferences and budget.
      </p>

      <div className="grid grid-cols-2 gap-x-10 gap-y-8">

        {/* Estimated Budget */}
        <div>
          <label className="font-medium">
            What is your estimated budget?
          </label>

          <div
            className={`flex mt-2 rounded-lg overflow-hidden border ${
              errors.budget ? "border-red-500" : "border-gray-300"
            }`}
          >
          <input
            type="number"
            min={0}
            value={data.budget}
            onChange={(e) =>
              setData({ ...data, budget: e.target.value })
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
            placeholder="e.g. 1000000"
            className="flex-1 p-3 outline-none"
          />

            <span className="border-l px-4 flex items-center bg-white">
              PKR
            </span>
          </div>
        </div>

        {/* Installation Timeline */}
        <div>
          <label className="font-medium">
            When do you want the installation?
          </label>

          <select
            value={data.timeline}
            onChange={(e) =>
              setData({ ...data, timeline: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.timeline ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>Immediately</option>
            <option>Within 1–3 months</option>
            <option>Just exploring</option>
          </select>
        </div>

        {/* Preferred System Type */}
        <div>
          <label className="font-medium">
            Which type of solar system do you prefer?
          </label>

          <select
            value={data.systemType}
            onChange={(e) =>
              setData({ ...data, systemType: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.systemType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>On-grid</option>
            <option>Off-grid</option>
            <option>Hybrid</option>
            <option>Not Sure</option>
          </select>
        </div>

        {/* Roof Shading */}
        <div>
          <label className="font-medium">
            Is your roof shaded during the day?
          </label>

          <select
            value={data.roofShading}
            onChange={(e) =>
              setData({ ...data, roofShading: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.roofShading ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>No</option>
            <option>Partially</option>
            <option>Heavily</option>
            <option>Not Sure</option>
          </select>
        </div>

        {/* Additional Requirements */}
        <div className="col-span-2">
          <label className="font-medium">
            Any additional requirements or comments?
          </label>

          <textarea
            rows={2}
            value={data.comments}
            onChange={(e) =>
              setData({ ...data, comments: e.target.value })
            }
            placeholder="Enter any additional information..."
            className="w-full border border-gray-300 rounded-lg p-3 mt-2 resize-none"
          />
        </div>

      </div>
    </div>
  );
}