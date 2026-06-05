import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export default function useZodForm<T extends FieldValues>(
    schema: z.ZodType<T>,
    defaultValues?: DefaultValues<T>,
) {
    return useForm<T>({
        resolver: zodResolver(schema as any),
        defaultValues,
    });
}
