import { UseMutationOptions, useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"

export function useDefaultMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(params: UseMutationOptions<ApiResponse<TData>, TError, TVariables, TContext>) {
  return useMutation<ApiResponse<TData>, TError, TVariables, TContext>({
    ...params,
    onSuccess: (data, variables, context) => {
      console.log("Mutation data: ", data)
      if (data.status >= 199 && data.status <= 299) {
        toast.success(data.message || "Action completed successfully")
      } else {
        toast.error(data.message || "An error occurred")
      }
      params.onSuccess?.(data, variables, context, undefined as any)
    }
  })
}
