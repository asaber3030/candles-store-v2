import z from "zod"

import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { AuthLoginSchema, AuthRegisterSchema } from "../model/auth.schema"
import { TLoginType } from "../model/auth"

import { getCurrentUser, loginAction, registerAction } from "../api/auth.api"
import { queryKeys } from "@/shared/config/query-keys"

export function useCurrentUser() {
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => getCurrentUser()
  })

  return { user: data, isUserLoading: isLoading || isRefetching, refetchCurrentUser: refetch }
}

export function useLogin(redirectUrl: string) {
  const router = useRouter()
  const qc = useQueryClient()

  const { mutate, isPending } = useDefaultMutation({
    mutationFn: ({ data, type }: { data: z.infer<typeof AuthLoginSchema>; type: TLoginType }) => loginAction(data, type),
    onSuccess: (data) => {
      if (data.status === 200) {
        qc.invalidateQueries({ queryKey: queryKeys.currentUser })
        router.push(redirectUrl)
      }
    }
  })

  return { login: mutate, isLoginPending: isPending }
}

export function useRegister(redirectUrl: string) {
  const router = useRouter()
  const { mutate, isPending } = useDefaultMutation({
    mutationFn: ({ data }: { data: z.infer<typeof AuthRegisterSchema> }) => registerAction(data),
    onSuccess: (data) => {
      if (data.status === 201) {
        router.push(redirectUrl)
      }
    }
  })

  return { register: mutate, isRegisterPending: isPending }
}
