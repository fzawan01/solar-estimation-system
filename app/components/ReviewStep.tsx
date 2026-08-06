type PropertyData = {
  propertyType: string;
  roofArea: string;
  areaUnit: string;
  city: string;
  roofDirection: string;
  roofType: string;
};
type EnergyData = {
  monthlyBill: string;
  monthlyConsumption: string;
  powerOutages: string;
  primaryGoal: string;
  batteryStorage: string;
  futureAppliances: string;
};

type PreferencesData = {
  budget: string;
  timeline: string;
  systemType: string;
  roofShading: string;
  comments: string;
};

type ReviewStepProps = {
  propertyData: PropertyData;
  energyData: EnergyData;
  preferencesData: PreferencesData;
};

export default function ReviewStep({
  propertyData,
  energyData,
  preferencesData,
}: ReviewStepProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center">
        Review Your Information
      </h2>

      <p className="text-center text-gray-500 mt-2 mb-10">
        Please review your details before we generate your solar estimate.
      </p>

      {/* Property */}
      <div className="border rounded-lg p-5 mb-6 gap-2 shadow-lg">
        <div className="flex flex-row gap-1">
          <h3>🏠︎ </h3>
          <h3 className="text-blue-600 font-semibold mb-3"> Your Property</h3>
        </div>
        <div className="flex flex-wrap gap-8">
          <p><span className="font-semibold">Property Type:</span> {propertyData.propertyType}</p>
          <p><span className="font-semibold">Roof Area:</span> {propertyData.roofArea} {propertyData.areaUnit}</p>
          <p><span className="font-semibold">Roof Type:</span> {propertyData.roofType}</p>
          <p><span className="font-semibold">Roof Direction:</span> {propertyData.roofDirection}</p>
        </div>
      </div>

      {/* Energy */}
      <div className="border rounded-lg p-5 mb-6 gap-2 shadow-lg">
        <h3 className="text-blue-600 font-semibold mb-3">⚡Energy Usage</h3>
        <div className="flex flex-wrap gap-7">
          <p><span className="font-semibold">Monthly Bill:</span> {energyData.monthlyBill}</p>
          <p><span className="font-semibold">Monthly Consumption:</span> {energyData.monthlyConsumption}</p>
          <p><span className="font-semibold">Power Outages:</span> {energyData.powerOutages}</p>
          <p><span className="font-semibold">Primary Goal:</span> {energyData.primaryGoal}</p>
          <p><span className="font-semibold">Battery Storage:</span> {energyData.batteryStorage}</p>
          <p><span className="font-semibold">Future Appliances:</span> {energyData.futureAppliances}</p>
        </div>
      </div>

      {/* Preferences */}
      <div className="border rounded-lg p-5 gap-2 shadow-lg">
        <h3 className="text-blue-600 font-semibold mb-3">
          ⚙️ System Preferences
        </h3>
        <div className="flex flex-wrap gap-8">
          <p><span className="font-semibold">Budget: </span>{preferencesData.budget}</p>
          <p><span className="font-semibold">Installation Timeline: </span>{preferencesData.timeline}</p>
          <p><span className="font-semibold">System Type:</span> {preferencesData.systemType}</p>
          <p><span className="font-semibold">Roof Shading:</span>{preferencesData.roofShading}</p>
        </div>
      </div>
    </div>
  );
}