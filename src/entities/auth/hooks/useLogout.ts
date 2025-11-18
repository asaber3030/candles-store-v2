import { useDefaultMutation } from "@/shared/hooks/useMutation"
import { useRouter } from "next/navigation"

import { logoutAction } from "../api/auth.api"
import { userRoutes } from "@/shared/config/routes"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/config/query-keys"

export function useLogout(redirectUrl: string = userRoutes.login) {
  const router = useRouter()
  const qc = useQueryClient()

  const { mutate, isPending } = useDefaultMutation({
    mutationFn: () => logoutAction(),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: queryKeys.currentUser })
      if (data.status === 200) router.push(redirectUrl)
    }
  })

  return { logout: mutate, isLoggingOut: isPending }
}
