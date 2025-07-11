import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  airFryerFormValuesSchema,
  type AirFryerFormValues,
} from "@/lib/validation/air-fryer-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PinInput } from "@/components/air-fryer-survey/pin-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function AirFryerForm() {
  const form = useForm<AirFryerFormValues>({
    resolver: zodResolver(airFryerFormValuesSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      cost: "0.00",
      pin: "",
    },
  });

  const onSubmit = (formValues: AirFryerFormValues) => {
    console.log("form values:", formValues);
    alert("Form submitted successfully! " + JSON.stringify(formValues));
  };

  console.log(form.watch());

  return (
    <div className="pb-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-spidr-foreground">
                  First Name <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="h-12 text-spidr-foreground"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-spidr-foreground">
                  Last Name <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Doe" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-spidr-foreground">
                  Phone Number <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="123-456-7890"
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-spidr-foreground">
                  Email Address <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-spidr-foreground">
                  Guess the Air Fryer's Cost{" "}
                  <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      min="0"
                      max="10000"
                      step="0.01"
                      className="h-12"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-spidr-foreground">
                  Spidr PIN <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <PinInput className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 font-semibold text-spidr-foreground"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
