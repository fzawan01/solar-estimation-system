type PropertyData = {
  propertyType: string;
  roofArea: string;
  areaUnit: string;
  city: string;
  roofDirection: string;
  roofType: string;
};

type PropertyStepProps = {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
  errors: Partial<Record<keyof PropertyData, boolean>>;
};

export default function PropertyStep({
  data,
  setData,
  errors,
}: PropertyStepProps) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Tell us about your property
      </h2>

      <p className="text-center text-gray-500 mt-2 mb-8 md:mb-10 px-4">
        Answer a few questions to help us provide an accurate estimation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

        {/* Property Type */}
        <div>
          <label className="font-medium">
            What type of property do you have?
          </label>

          <select
            value={data.propertyType}
            onChange={(e) =>
              setData({ ...data, propertyType: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.propertyType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>

        {/* Roof Area */}
        <div>
          <label className="font-medium">
            What is the approximate roof area?
          </label>

          <div
            className={`flex mt-2 rounded-lg overflow-hidden border ${
              errors.roofArea ? "border-red-500" : "border-gray-300"
            }`}
          >
            <input
              type="number"
              min={0}
              value={data.roofArea}
              onChange={(e) =>
                setData({ ...data, roofArea: e.target.value })
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
              placeholder="e.g. 1200"
              className="flex-1 p-3 outline-none"
            />

            <select
              value={data.areaUnit}
              onChange={(e) =>
                setData({ ...data, areaUnit: e.target.value })
              }
              className="border-l px-4 bg-white outline-none"
            >
              <option>sq ft</option>
              <option>sq m</option>
            </select>
          </div>
        </div>

        {/* City */}
        <div>
          <label className="font-medium">
            Where is your property located?
          </label>

          <input
            type="text"
            value={data.city}
            onChange={(e) =>
              setData({ ...data, city: e.target.value })
            }
            placeholder="Enter your city"
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        {/* Roof Direction */}
        <div>
          <label className="font-medium">
            Which direction does your roof face?
          </label>

          <select
            value={data.roofDirection}
            onChange={(e) =>
              setData({ ...data, roofDirection: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.roofDirection ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
            <option>North-East</option>
            <option>North-West</option>
            <option>South-East</option>
            <option>South-West</option>
            <option>Not Sure</option>
          </select>
        </div>

        {/* Roof Type */}
        <div>
          <label className="font-medium">
            What type of roof do you have?
          </label>

          <select
            value={data.roofType}
            onChange={(e) =>
              setData({ ...data, roofType: e.target.value })
            }
            className={`w-full rounded-lg p-3 mt-2 border ${
              errors.roofType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option>Flat Concrete</option>
            <option>Sloped/Shingle</option>
            <option>Metal</option>
            <option>Tile</option>
            <option>Other</option>
          </select>
        </div>

      </div>
    </div>
  );
}