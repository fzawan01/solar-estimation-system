import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function generateSolarEstimation(
  propertyData: any,
  energyData: any,
  preferencesData: any
) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    const prompt = `
You are a professional solar energy consultant.

Based on the user's information below, estimate a suitable solar system.

User Information:
- Property Type: ${propertyData.propertyType}
- Roof Area: ${propertyData.roofArea} ${propertyData.areaUnit}
- Location: ${propertyData.city}
- Roof Direction: ${propertyData.roofDirection}
- Roof Type: ${propertyData.roofType}

- Monthly Electricity Bill: ${energyData.monthlyBill} PKR
- Monthly Consumption: ${energyData.monthlyConsumption} kWh
- Power Outages: ${energyData.powerOutages}
- Primary Goal: ${energyData.primaryGoal}
- Battery Storage: ${energyData.batteryStorage}
- Future Appliances: ${energyData.futureAppliances}

- Budget: ${preferencesData.budget} PKR
- Installation Timeline: ${preferencesData.timeline}
- Preferred System Type: ${preferencesData.systemType}
- Roof Shading: ${preferencesData.roofShading}
- Additional Comments: ${preferencesData.comments || "None"}

Return ONLY valid JSON.

Do NOT include markdown.
Do NOT include \`\`\`json.
Do NOT include explanations before or after the JSON.

Use this exact structure:

{
  "systemSize": "",
  "systemType": "",
  "installationCost": "",
  "installationTime": "",
  "annualEnergy": "",
  "monthlySavings": "",
  "annualSavings": "",
  "paybackPeriod": "",
  "roi": "",
  "withoutSolar": 0,
  "withSolar": 0,
  "recommendations": [
    "",
    "",
    "",
    ""
  ]
}

Rules:
- systemSize should include units (example: "8 kW")
- installationCost should be in PKR.
- installationTime should include days.
- annualEnergy should include kWh/year.
- monthlySavings should be in PKR.
- annualSavings should be in PKR.
- paybackPeriod should include years.
- roi should include %.
- withoutSolar should be the estimated monthly electricity cost before installing solar (NUMBER ONLY).
- withSolar should be the estimated monthly electricity cost after installing solar (NUMBER ONLY).
- recommendations should contain exactly four short recommendation strings.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    let estimation;

    try {
      estimation = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON:", parseError);
      console.error("Gemini Response:", text);

      return {
        success: false,
        error: "Gemini returned an invalid response format.",
      };
    }

    return {
      success: true,
      estimation,
      rawData: {
        propertyData,
        energyData,
        preferencesData,
      },
    };
  } catch (error) {
    console.error("Error generating estimation:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate estimation",
    };
  }
}