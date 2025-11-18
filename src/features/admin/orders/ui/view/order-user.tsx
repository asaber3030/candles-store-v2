"use client"

import { useTranslations } from "next-intl"

import { User } from "@prisma/client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { LinkBtn } from "@/shared/components/common/link-button"

type Props = {
  user: Omit<User, "password">
}

export const PartOrderUser = ({ user }: Props) => {
  const t = useTranslations()

  return (
    <Card className='transition-all hover:border-secondaryMain border'>
      <CardHeader>
        <CardTitle>{t("User Information")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex gap-2 items-center'>
          <Avatar>
            <AvatarFallback className='bg-secondaryMain'>{user.name[0] + user.name[1]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className=''>{user.name}</h3>
            <p className='text-xs text-gray-500'>{user.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <LinkBtn href={`/admin/users/${user.id}`} variant='outline' className='w-full mt-4'>
          {t("View User")}
        </LinkBtn>
      </CardFooter>
    </Card>
  )
}
