import { ReactNode } from "react";
import { DefaultValues, FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import useZodForm from "@/hooks/use-zod-form";

interface FormProps<T extends FieldValues> {
    schema: z.ZodType<T>;
    onSubmitSuccess: (values: T, form: UseFormReturn<T>) => void;
    defaultValues?: DefaultValues<T>;
    children: (handleSubmit: () => void, form: UseFormReturn<T>) => ReactNode;
}

export default function Form<T extends FieldValues>({ schema, onSubmitSuccess, defaultValues, children }: FormProps<T>) {
    const form = useZodForm(schema, defaultValues);

    return (
        <FormProvider {...form}>
            {children(
                form.handleSubmit((values) => onSubmitSuccess(values, form)),
                form
            )}
        </FormProvider>
    );
}
