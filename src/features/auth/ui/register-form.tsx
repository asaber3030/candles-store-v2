"use client";

import z from "zod";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAllCountries } from "@/entities/country/hooks/useCountries";
import { useRegister } from "@/entities/auth/hooks/useAuth";
import { useCountry } from "@/entities/country/hooks/useCountry";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { userRoutes } from "@/shared/config/routes";

import { PasswordField, SelectField, TextareaField, TextField } from "@/shared/components/form/form";
import { AuthRegisterSchema } from "@/entities/auth/model/auth.schema";
import { InputSkeleton } from "@/shared/components/skeletons/input";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";

export const RegisterForm = () => {
  const t = useTranslations();

  const form = useForm({
    resolver: zodResolver(AuthRegisterSchema),
  });

  const [selectedCountryId, setSelectedCountryId] = useState<number>(1);

  const { countries, isCountriesLoading } = useAllCountries();
  const { country, refetchCountry } = useCountry(selectedCountryId);
  const { register, isRegisterPending } = useRegister(userRoutes.login);

  const handleLogin = (data: z.infer<typeof AuthRegisterSchema>) => {
    register({ data });
  };

  useEffect(() => {
    setSelectedCountryId(Number(form.watch("countryId")));
    refetchCountry();
  }, [form.watch("countryId"), form, refetchCountry]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <TextField control={form.control} name="name" label={t("Name")} placeholder={t("Name")} />
        <TextField control={form.control} name="email" label={t("Email")} placeholder={t("Email")} />
        <TextField control={form.control} name="phoneNumber" label={t("Phone Number")} placeholder={t("Phone Number")} />
        <PasswordField control={form.control} name="password" type="password" label={t("Password")} placeholder={t("Password")} />

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          {isCountriesLoading ? (
            <InputSkeleton />
          ) : (
            <SelectField
              valueAsNumber
              name="countryId"
              label={t("Country")}
              control={form.control}
              options={
                countries?.map((country) => ({
                  label: country.name,
                  value: country.id.toString(),
                })) || []
              }
            />
          )}

          <SelectField
            valueAsNumber
            name="cityId"
            label={t("City")}
            control={form.control}
            options={
              country?.cities.map((city) => ({
                label: city.name,
                value: city.id.toString(),
              })) || []
            }
          />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
          <TextField control={form.control} name="streetName" label={t("Street Name")} placeholder={t("Street Name")} />
          <TextField control={form.control} name="streetNo" label={t("Street No")} placeholder={t("Street No")} />
        </div>

        <TextareaField name="notes" control={form.control} label={t("Additional Notes")} placeholder={t("Additional Notes")} />

        {!form.watch("countryId") || !form.watch("cityId") ? (
          <p className="text-sm text-red-600">{t("Please select a country and city")}</p>
        ) : (
          <Button className="w-full" loading={isRegisterPending} variant="indigo">
            {t("Register")}
          </Button>
        )}
      </form>
    </Form>
  );
};
