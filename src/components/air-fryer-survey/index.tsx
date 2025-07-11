import { AirFryerForm } from "./form";
import { AirFryerSurveyHeader } from "./header";

export function AirFryerSurvey() {
  return (
    <div className="w-full mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl border-none shadow-none bg-transparent">
      <AirFryerSurveyHeader />
      <AirFryerForm />
    </div>
  );
}
