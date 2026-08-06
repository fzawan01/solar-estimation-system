"use client";

import EnergyStep from "../components/EnergyStep";
import PropertyStep from "../components/PropertyStep";
import PreferencesStep from "../components/PreferencesStep";
import ReviewStep from "../components/ReviewStep";
import EstimationResult from "../components/EstimationResult";

import { useState } from "react";
import { generateSolarEstimation } from "../services/geminiApi";

export default function EstimatePage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    
    type SolarEstimation = {
    systemSize: string;
    systemType: string;
    installationCost: string;
    installationTime: string;
    annualEnergy: string;
    monthlySavings: string;
    annualSavings: string;
    paybackPeriod: string;
    roi: string;
    withoutSolar: number;
    withSolar: number;
    recommendations: string[];
    };

    const [estimationResult, setEstimationResult] =
    useState<SolarEstimation | null>(null);

    const [propertyData, setPropertyData] = useState({
        propertyType: "",
        roofArea: "",
        areaUnit: "sq ft",
        city: "",
        roofDirection: "",
        roofType: "",
    });

    const [errors, setErrors] = useState({});

    const [preferencesData, setPreferencesData] = useState({
        budget: "",
        timeline: "",
        systemType: "",
        roofShading: "",
        comments: "",
    });

    const [preferencesErrors, setPreferencesErrors] = useState({});
    
    const [energyData, setEnergyData] = useState({
        monthlyBill: "",
        monthlyConsumption: "",
        powerOutages: "",
        primaryGoal: "",
        batteryStorage: "",
        futureAppliances: "",
    });

    const [energyErrors, setEnergyErrors] = useState({});

    const handleFinish = async () => {
        setIsLoading(true);
        setApiError(null);
        
        try {
            const result = await generateSolarEstimation(
                propertyData,
                energyData,
                preferencesData
            );
            
        if (result.success) {
            setEstimationResult(result.estimation || null);
            setStep(5); // Go to result step
        } else {
            setApiError(result.error || "Failed to generate estimation. Please try again.");
        }
        } catch (error) {
            setApiError("An unexpected error occurred. Please try again.");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = () => {
        if (step === 1) {
            const newErrors = {
                propertyType: !propertyData.propertyType,
                roofArea: !propertyData.roofArea,
                city: !propertyData.city,
                roofDirection: !propertyData.roofDirection,
                roofType: !propertyData.roofType,
            };

            setErrors(newErrors);

            if (Object.values(newErrors).includes(true)) {
                return;
            }
        }
        if (step === 2) {
            const newErrors = {
                monthlyBill: !energyData.monthlyBill,
                monthlyConsumption: !energyData.monthlyConsumption,
                powerOutages: !energyData.powerOutages,
                primaryGoal: !energyData.primaryGoal,
                batteryStorage: !energyData.batteryStorage,
                futureAppliances: !energyData.futureAppliances,
            };

            setEnergyErrors(newErrors);

            if (Object.values(newErrors).includes(true)) {
                return;
            }
        }
        if (step === 3) {
            const newErrors = {
                budget: !preferencesData.budget,
                timeline: !preferencesData.timeline,
                systemType: !preferencesData.systemType,
                roofShading: !preferencesData.roofShading,
            };

            setPreferencesErrors(newErrors);

            if (Object.values(newErrors).includes(true)) {
                return;
            }
        }
        if (step === 4) {
            handleFinish();
            return;
        }
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const handleReset = () => {
        setStep(1);
        setEstimationResult(null);
        setApiError(null);
        setPropertyData({
            propertyType: "",
            roofArea: "",
            areaUnit: "sq ft",
            city: "",
            roofDirection: "",
            roofType: "",
        });
        setEnergyData({
            monthlyBill: "",
            monthlyConsumption: "",
            powerOutages: "",
            primaryGoal: "",
            batteryStorage: "",
            futureAppliances: "",
        });
        setPreferencesData({
            budget: "",
            timeline: "",
            systemType: "",
            roofShading: "",
            comments: "",
        });
        setErrors({});
        setEnergyErrors({});
        setPreferencesErrors({});
    };

    return (
        <>
            <header className="h-15">
                <h1 className="pl-4 md:pl-12 pt-4 text-base md:text-xl italic text-blue-900">
                    Solar Estimation System
                </h1>
            </header>

            <main>
                {step === 5 ? (
                    // Step 5 - Result page with bg_solar3
                    <section className="relative min-h-screen bg-[url('/bg_solar3.png')] bg-cover bg-center px-4 md:pl-10 overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative pt-4 md:pt-6 px-2 md:pl-10 flex justify-center">
                            <div className="w-full max-w-7xl mx-auto">
                                <EstimationResult
                                    estimation={estimationResult}
                                    onBack={() => setStep(4)}
                                    onReset={handleReset}
                                />
                            </div>
                        </div>
                    </section>
                ) : (
                    // Steps 1-4 with bg_solar2
                    <section className="relative min-h-screen bg-[url('/bg_solar2.png')] bg-cover bg-center px-3 md:pl-10 overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative pt-4 md:pt-6 px-2 flex items-center justify-center md:justify-start">
                            <div className="bg-white w-full max-w-[1000px] min-h-[600px] md:h-[700px] rounded-2xl shadow-xl flex flex-col mx-auto " >
                                <div className="p-4 md:p-12 flex-1 overflow-y-auto">
                                    <>
                                        {/* Progress Bar - Mobile Responsive */}
                                        <div className="relative flex justify-between items-start mb-7 px-2 md:px-0">
                                            <div className="absolute top-6 left-[6%] right-[6%] h-1 bg-gray-300 rounded-full hidden sm:block"></div>
                                            <div
                                                className="absolute top-6 left-[6%] h-1 bg-blue-600 rounded-full transition-all duration-500 hidden sm:block"
                                                style={{
                                                    width:
                                                        step === 1
                                                            ? "0%"
                                                            : step === 2
                                                            ? "29%"
                                                            : step === 3
                                                            ? "58%"
                                                            : "87%",
                                                }}
                                            ></div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <div
                                                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold border-2 sm:border-4 ${
                                                        step >= 1
                                                            ? "bg-blue-600 border-blue-600 text-white"
                                                            : "bg-white border-gray-300 text-gray-500"
                                                    }`}
                                                >
                                                    1
                                                </div>
                                                <span className={`mt-1 sm:mt-2 text-xs sm:text-base font-medium ${step >= 1 ? "text-blue-600" : "text-gray-500"}`}>
                                                    Property
                                                </span>
                                            </div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <div
                                                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold border-2 sm:border-4 ${
                                                        step >= 2
                                                            ? "bg-blue-600 border-blue-600 text-white"
                                                            : "bg-white border-gray-300 text-gray-500"
                                                    }`}
                                                >
                                                    2
                                                </div>
                                                <span className={`mt-1 sm:mt-2 text-xs sm:text-base font-medium ${step >= 2 ? "text-blue-600" : "text-gray-500"}`}>
                                                    Energy
                                                </span>
                                            </div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <div
                                                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold border-2 sm:border-4 ${
                                                        step >= 3
                                                            ? "bg-blue-600 border-blue-600 text-white"
                                                            : "bg-white border-gray-300 text-gray-500"
                                                    }`}
                                                >
                                                    3
                                                </div>
                                                <span className={`mt-1 sm:mt-2 text-xs sm:text-base font-medium ${step >= 3 ? "text-blue-600" : "text-gray-500"}`}>
                                                    Preferences
                                                </span>
                                            </div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <div
                                                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold border-2 sm:border-4 ${
                                                        step >= 4
                                                            ? "bg-blue-600 border-blue-600 text-white"
                                                            : "bg-white border-gray-300 text-gray-500"
                                                    }`}
                                                >
                                                    4
                                                </div>
                                                <span className={`mt-1 sm:mt-2 text-xs sm:text-base font-medium ${step >= 4 ? "text-blue-600" : "text-gray-500"}`}>
                                                    Review
                                                </span>
                                            </div>
                                        </div>

                                        {step === 1 && <PropertyStep
                                            data={propertyData}
                                            setData={setPropertyData}
                                            errors={errors}
                                        />}

                                        {step === 2 && (
                                            <EnergyStep
                                                data={energyData}
                                                setData={setEnergyData}
                                                errors={energyErrors}
                                            />
                                        )}

                                        {step === 3 && (
                                            <PreferencesStep
                                                data={preferencesData}
                                                setData={setPreferencesData}
                                                errors={preferencesErrors}
                                            />
                                        )}

                                        {step === 4 && (
                                            <ReviewStep
                                                propertyData={propertyData}
                                                energyData={energyData}
                                                preferencesData={preferencesData}
                                            />
                                        )}

                                        {apiError && (
                                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                                {apiError}
                                            </div>
                                        )}

                                        <div className="border-t border-gray-300 px-4 md:px-12 pb-6 md:pb-10 mt-6 md:mt-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                                            <button
                                                onClick={() => {
                                                    if (step > 1) {
                                                        setStep(step - 1);
                                                    }
                                                }}
                                                disabled={step === 1}
                                                className={`w-full sm:w-auto px-6 md:px-10 py-2 md:py-3 rounded-xl border-2 transition pt-2 mt-4 sm:mt-7 ${
                                                    step === 1
                                                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                                        : "border-blue-600 text-blue-600 hover:bg-blue-50"
                                                }`}
                                            >
                                                ← Back
                                            </button>

                                            <button
                                                onClick={handleNext}
                                                disabled={isLoading}
                                                className={`w-full sm:w-auto bg-white px-6 md:px-10 py-2 md:py-3 mt-2 sm:mt-7 border-blue-600 text-blue-600 hover:bg-blue-50 border-2 rounded-xl transition ${
                                                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                            >
                                                {isLoading ? "Generating..." : step === 4 ? "Finish" : "Next →"}
                                            </button>
                                        </div>
                                    </>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <footer>
                {/* Footer */}
            </footer>
        </>
    );
}